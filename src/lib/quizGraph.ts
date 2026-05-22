import { z } from "zod";
import { llm } from "@/lib/deepseek";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { outputScheme } from "@/types/mcq-question";

const BATCH_SIZE = 10;

type Question = z.infer<typeof outputScheme>["questions"][number];

interface Input {
  topic: string;
  subtopics: string[];
  numberOfQuestions: number;
  difficulty: string;
  questionStyle: string;
  targetAudience: string;
  avoidTopics?: string[];
  additionalContext?: string;
  batchIndex: number;
  batchTotal: number;
  questionsInBatch: number;
}

/**
 * Extract a valid JSON object from potentially noisy LLM output.
 */
function extractJSON(raw: string): string {
  let s = raw.trim();
  s = s.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/g, "").trim();
  const firstBrace = s.indexOf("{");
  const lastBrace = s.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("No JSON object found in LLM output");
  }
  let json = s.slice(firstBrace, lastBrace + 1);
  json = json.replace(/,\s*([}\]])/g, "$1");
  json = json.replace(/}\s*{/g, "},{");
  json = json.replace(/]\s*{/g, "],{");
  return json;
}

/**
 * Build the prompt for a single batch of questions.
 */
function buildBatchPrompt(input: Input): Record<string, unknown> {
  return {
    task: `Generate ${input.questionsInBatch} multiple choice questions (MCQ) — batch ${input.batchIndex + 1} of ${input.batchTotal}`,
    input: {
      topic: input.topic,
      subtopics: input.subtopics,
      numberOfQuestions: input.questionsInBatch,
      difficulty: input.difficulty,
      questionStyle: input.questionStyle,
      targetAudience: input.targetAudience,
      avoidTopics: input.avoidTopics || [],
      additionalContext: input.additionalContext || "",
    },
    instructions: [
      `Generate exactly ${input.questionsInBatch} MCQ questions.`,
      "Each question must have exactly one correct answer.",
      "All options should be plausible.",
      "Provide clear and concise explanations for correct answers.",
      "Return ONLY valid JSON. No markdown fences, no extra text.",
      `The output must be a JSON object with a "questions" array of ${input.questionsInBatch} question objects.`,
      'Each question object: { "id": string, "type": "mcq", "question": string, "options": [{ "id": string, "text": string, "isCorrect": boolean }], "correctAnswer": string, "points": number, "difficulty": string, "category": string, "explanation": string, "tags": string[], "estimatedTime": number }',
      'Also include a "metadata" object with: { "totalQuestions": number, "topic": string, "batch": number }',
    ],
  };
}

/**
 * Call the LLM for one batch and return parsed questions.
 */
async function generateBatch(input: Input): Promise<Question[]> {
  const prompt = buildBatchPrompt(input);
  const messages = [
    new SystemMessage("you are an expert quiz question generator that outputs valid json only"),
    new HumanMessage(JSON.stringify(prompt)),
  ];

  let accumulated = "";
  const stream = await llm.stream(messages);
  for await (const chunk of stream) {
    const text = typeof chunk.content === "string" ? chunk.content : "";
    accumulated += text;
  }

  const clean = extractJSON(accumulated);
  const parsed = JSON.parse(clean);
  const output = outputScheme.parse(parsed);
  return output.questions;
}

/**
 * Generate all batches concurrently, then merge.
 */
export async function generateAllQuestions(input: {
  topic: string;
  subtopics: string[];
  numberOfQuestions: number;
  difficulty: string;
  questionStyle: string;
  targetAudience: string;
  avoidTopics?: string[];
  additionalContext?: string;
}, onProgress?: (batchIndex: number, totalBatches: number) => void): Promise<{
  questions: Question[];
  metadata: { totalQuestions: number; topic: string; averageDifficulty: string };
}> {
  const total = input.numberOfQuestions;
  const batches: Input[] = [];
  const batchCount = Math.ceil(total / BATCH_SIZE);

  for (let i = 0; i < batchCount; i++) {
    const remaining = total - i * BATCH_SIZE;
    const batchSize = Math.min(remaining, BATCH_SIZE);
    batches.push({
      ...input,
      questionsInBatch: batchSize,
      batchIndex: i,
      batchTotal: batchCount,
    });
  }

  const results = await Promise.all(
    batches.map(async (batch) => {
      const questions = await generateBatch(batch);
      if (onProgress) onProgress(batch.batchIndex + 1, batchCount);
      return questions;
    })
  );

  const allQuestions = results.flat();

  // Compute average difficulty
  const scores: Record<string, number> = { easy: 1, medium: 2, hard: 3 };
  const avgScore = allQuestions.reduce((sum, q) => sum + (scores[q.difficulty] || 2), 0) / allQuestions.length;
  let averageDifficulty = "medium";
  if (avgScore <= 1.5) averageDifficulty = "easy";
  else if (avgScore >= 2.5) averageDifficulty = "hard";

  return {
    questions: allQuestions,
    metadata: {
      totalQuestions: allQuestions.length,
      topic: input.topic,
      averageDifficulty,
    },
  };
}

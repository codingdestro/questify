import { z } from "zod";
import { llm } from "@/lib/deepseek";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { outputScheme } from "@/types/mcq-question";

const BATCH_SIZE = 10;

type Question = z.infer<typeof outputScheme>["questions"][number];

/**
 * Simple token-level overlap dedup: removes exact duplicate questions
 * and near-duplicates based on normalized text overlap.
 */
function dedupQuestions(questions: Question[]): Question[] {
  const seen = new Set<string>();
  const result: Question[] = [];

  for (const q of questions) {
    // Normalize: lowercase, strip punctuation, collapse whitespace
    const normalized = q.question
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    // Skip exact duplicates
    if (seen.has(normalized)) continue;

    // Skip near-duplicates (>80% word overlap with any seen)
    const words = new Set(normalized.split(" "));
    let isNearDuplicate = false;
    for (const existing of seen) {
      const existingWords = new Set(existing.split(" "));
      const intersection = new Set([...words].filter((w) => existingWords.has(w)));
      const union = new Set([...words, ...existingWords]);
      const jaccard = intersection.size / union.size;
      if (jaccard > 0.8) {
        isNearDuplicate = true;
        break;
      }
    }

    if (isNearDuplicate) continue;

    seen.add(normalized);
    result.push(q);
  }

  return result;
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
 * Includes existing questions so the LLM avoids repeats.
 */
function buildBatchPrompt(
  input: {
    topic: string;
    subtopics: string[];
    questionsInBatch: number;
    difficulty: string;
    questionStyle: string;
    targetAudience: string;
    avoidTopics?: string[];
    additionalContext?: string;
    batchIndex: number;
    batchTotal: number;
  },
  previousQuestions: Question[],
): Record<string, unknown> {
  const instructions: string[] = [
      `Generate exactly ${input.questionsInBatch} MCQ questions.`,
      "Each question must have exactly one correct answer.",
      "All options should be plausible.",
      "Provide clear and concise explanations for correct answers.",
      "Return ONLY valid JSON. No markdown fences, no extra text.",
      `The output must be a JSON object with a "questions" array of ${input.questionsInBatch} question objects.`,
      'Each question object: { "id": string, "type": "mcq", "question": string, "options": [{ "id": string, "text": string, "isCorrect": boolean }], "correctAnswer": string, "points": number, "difficulty": string, "category": string, "explanation": string, "tags": string[], "estimatedTime": number }',
      'Also include a "metadata" object with: { "totalQuestions": number, "topic": string, "batch": number }',
    ];

  // Add dedup guidance if there are prior questions
  if (previousQuestions.length > 0) {
    instructions.push("");
    instructions.push("IMPORTANT — These questions have ALREADY been generated. Do NOT repeat them or create similar ones:");
    instructions.push("");
    const alreadyGenerated = previousQuestions.map(
      (q, i) => `${i + 1}. [${q.category}] ${q.question.substring(0, 120)}`,
    );
    instructions.push(...alreadyGenerated);
    instructions.push("");
    instructions.push("Cover different subtopics and angles that haven't been covered yet. Be creative but stay on-topic.");
  }

  const prompt: Record<string, unknown> = {
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
    instructions,
  };

  return prompt;
}

/**
 * Call the LLM for one batch and return parsed questions.
 */
async function generateBatch(
  input: {
    topic: string;
    subtopics: string[];
    questionsInBatch: number;
    difficulty: string;
    questionStyle: string;
    targetAudience: string;
    avoidTopics?: string[];
    additionalContext?: string;
    batchIndex: number;
    batchTotal: number;
  },
  previousQuestions: Question[],
): Promise<Question[]> {
  const prompt = buildBatchPrompt(input, previousQuestions);
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

  // Handle truncated output — the LLM may produce fewer questions than requested
  // if it hit the context limit. That's okay; we dedup and report what we got.
  const clean = extractJSON(accumulated);
  const parsed = JSON.parse(clean);
  const output = outputScheme.parse(parsed);
  return output.questions;
}

/**
 * Generate all batches sequentially (to avoid repeats), dedup on completion.
 */
export async function generateAllQuestions(
  input: {
    topic: string;
    subtopics: string[];
    numberOfQuestions: number;
    difficulty: string;
    questionStyle: string;
    targetAudience: string;
    avoidTopics?: string[];
    additionalContext?: string;
  },
  onProgress?: (batchIndex: number, totalBatches: number) => void,
): Promise<{
  questions: Question[];
  metadata: { totalQuestions: number; topic: string; averageDifficulty: string };
}> {
  const total = input.numberOfQuestions;
  const batchCount = Math.ceil(total / BATCH_SIZE);
  const allQuestions: Question[] = [];

  for (let i = 0; i < batchCount; i++) {
    const remaining = total - allQuestions.length;
    if (remaining <= 0) break;

    const batchSize = Math.min(remaining, BATCH_SIZE);

    // Dedup before each batch so we don't pass stale duplicates
    const uniquePrior = dedupQuestions(allQuestions);

    const questions = await generateBatch(
      {
        ...input,
        questionsInBatch: batchSize,
        batchIndex: i,
        batchTotal: batchCount,
      },
      uniquePrior,
    );

    allQuestions.push(...questions);

    if (onProgress) onProgress(i + 1, batchCount);
  }

  // Final dedup pass
  const finalQuestions = dedupQuestions(allQuestions);

  // If dedup reduced count significantly, do one more batch to fill the gap
  const shortfall = total - finalQuestions.length;
  if (shortfall > 0) {
    const fillBatch = await generateBatch(
      {
        ...input,
        questionsInBatch: shortfall,
        batchIndex: batchCount,
        batchTotal: batchCount + 1,
      },
      dedupQuestions(finalQuestions),
    );
    finalQuestions.push(...fillBatch);
  }

  const uniqueQuestions = dedupQuestions(finalQuestions);

  // Compute average difficulty
  const scores: Record<string, number> = { easy: 1, medium: 2, hard: 3 };
  const avgScore =
    uniqueQuestions.reduce((sum, q) => sum + (scores[q.difficulty] || 2), 0) /
    uniqueQuestions.length;
  let averageDifficulty = "medium";
  if (avgScore <= 1.5) averageDifficulty = "easy";
  else if (avgScore >= 2.5) averageDifficulty = "hard";

  return {
    questions: uniqueQuestions,
    metadata: {
      totalQuestions: uniqueQuestions.length,
      topic: input.topic,
      averageDifficulty,
    },
  };
}

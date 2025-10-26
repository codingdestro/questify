import { llm } from "@/lib/deepseek";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { JSONPrompt } from "@/utils/prompt";
import { z } from "zod";

export const inputScheme = z.object({
  topic: z.string().min(1),
  subtopics: z.array(z.string()).min(1),
  numberOfQuestions: z.number().min(1).max(100),
  difficulty: z.enum(["easy", "medium", "hard"]),
  questionStyle: z.enum(["recall", "application", "analysis", "evaluation"]),
  targetAudience: z.string().min(1),
  avoidTopics: z.array(z.string()).optional(),
  additionalContext: z.string().optional(),
});

export const outputScheme = z.object({
  questions: z.array(
    z.object({
      id: z.string(),
      type: z.literal("mcq"),
      question: z.string(),
      options: z.array(
        z.object({
          id: z.string(),
          text: z.string(),
          isCorrect: z.boolean(),
        })
      ),
      correctAnswer: z.string(),
      points: z.number().default(10),
      difficulty: z.enum(["easy", "medium", "hard"]),
      category: z.string(),
      explanation: z.string(),
      tags: z.array(z.string()),
      estimatedTime: z.number(),
    })
  ),
  metadata: z.object({
    totalQuestions: z.number(),
  }),
});

export async function generateMCQQuestions(
  input: z.infer<typeof inputScheme>
): Promise<string> {
  const prompt = {
    ...JSONPrompt,
    input: {
      ...input,
    },
  };
  const messages = [
    new SystemMessage(
      "you are an expert quize question generator that outputs valid json only"
    ),
    new HumanMessage(JSON.stringify(prompt)),
  ];
  const response = await llm.invoke(messages);

  return response.content as string;
}

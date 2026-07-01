import { z } from "zod";
import { outputScheme } from "@/types/mcq-question";
import { saveDoc, generateId } from "@/lib/storage";
import { computeAverageDifficulty } from "./difficulty";

export async function saveQuestion(
  questionData: z.infer<typeof outputScheme>,
  topic?: string,
  difficulty?: string
): Promise<string> {
  try {
    const id = generateId();
    const data = {
      ...questionData,
      metadata: {
        ...questionData.metadata,
        topic: topic || "unknown",
        averageDifficulty: difficulty || computeAverageDifficulty(questionData.questions),
        generatedAt: new Date().toISOString(),
      },
    };
    await saveDoc(id, data);
    return id;
  } catch (e) {
    console.error("Error saving document: ", e);
    throw e;
  }
}

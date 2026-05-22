import { z } from "zod";
import { outputScheme } from "@/types/mcq-question";
import { getDoc } from "@/lib/storage";

export async function getQuiz(id: string) {
  const doc = getDoc<z.infer<typeof outputScheme> & { metadata: Record<string, unknown> }>(id);
  if (!doc) {
    throw new Error("Quiz not found");
  }
  return doc;
}

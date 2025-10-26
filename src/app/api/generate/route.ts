import { z } from "zod";
import { generateMCQQuestions } from "@/lib/aiHandlers/generateMCQQuestion";
import { inputScheme, outputScheme } from "@/types/mcq-question";
import { saveQuestion } from "@/utils/firestore/saveQuestion";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedInput = inputScheme.parse(body);
    const questions = await generateMCQQuestions(parsedInput);
    const output: z.infer<typeof outputScheme> =
      typeof questions === "string" ? JSON.parse(questions) : questions;
    await saveQuestion(output);
    return new Response(questions, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response("internal server error", { status: 500 });
  }
}

// Example GET route for testing purposes
export async function GET() {
  const exampleInput: z.infer<typeof inputScheme> = {
    topic: "basic python",
    subtopics: ["list", "dictionary", "functions"],
    numberOfQuestions: 5,
    difficulty: "medium",
    questionStyle: "application",
    targetAudience: "CSE students",
  };
  const questions = await generateMCQQuestions(exampleInput);
  console.log(questions);
  return new Response(questions, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

import { z } from "zod";
import { generateMCQQuestions } from "@/lib/aiHandlers/generateMCQQuestion";
import { inputScheme } from "@/types/mcq-question";

export async function POST(req: Request) {
  const body = await req.json();
  const parsedInput = inputScheme.parse(body);
  const questions = await generateMCQQuestions(parsedInput);
  return new Response(questions, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
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

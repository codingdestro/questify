import { z } from "zod";
import { llm } from "@/lib/deepseek";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { inputScheme, outputScheme } from "@/types/mcq-question";
import { saveQuestion } from "@/utils/firestore/saveQuestion";
import { JSONPrompt } from "@/utils/prompt";

/**
 * Extract a valid JSON object from potentially noisy LLM output.
 * Handles markdown fences, trailing commas, truncation, and leading text.
 */
function extractJSON(raw: string): string {
  let s = raw.trim();

  // Strip markdown code fences (```json ... ``` or ``` ... ```)
  s = s.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/g, "").trim();

  // Find the outermost { ... } block
  const firstBrace = s.indexOf("{");
  const lastBrace = s.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("No JSON object found in LLM output");
  }

  let json = s.slice(firstBrace, lastBrace + 1);

  // Remove trailing commas before closing braces/brackets (common LLM mistake)
  json = json.replace(/,(\s*[}\]])/g, "$1");

  return json;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedInput = inputScheme.parse(body);

    const prompt = {
      ...JSONPrompt,
      input: { ...parsedInput },
    };

    const messages = [
      new SystemMessage(
        "you are an expert quiz question generator that outputs valid json only"
      ),
      new HumanMessage(JSON.stringify(prompt)),
    ];

    const stream = await llm.stream(messages);
    const encoder = new TextEncoder();
    let accumulated = "";

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = typeof chunk.content === "string" ? chunk.content : "";
            accumulated += text;
            controller.enqueue(encoder.encode(text));
          }

          const clean = extractJSON(accumulated);
          const parsed = JSON.parse(clean);
          const output: z.infer<typeof outputScheme> = outputScheme.parse(parsed);

          const quizId = await saveQuestion(output, parsedInput.topic, parsedInput.difficulty);
          controller.enqueue(encoder.encode(`\n__QUIZ_ID__:${quizId}`));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.log(err);
    return new Response("internal server error", { status: 500 });
  }
}

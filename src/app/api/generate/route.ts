import { z } from "zod";
import { llm } from "@/lib/deepseek";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { inputScheme, outputScheme } from "@/types/mcq-question";
import { saveQuestion } from "@/utils/firestore/saveQuestion";
import { JSONPrompt } from "@/utils/prompt";

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

          // Clean markdown fences
          let clean = accumulated;
          if (clean.startsWith("```json")) {
            clean = clean.replace("```json", "").replace(/```$/, "").trim();
          }

          // Parse and save
          const output: z.infer<typeof outputScheme> = JSON.parse(clean);
          const quizId = await saveQuestion(output, parsedInput.topic, parsedInput.difficulty);

          // Send the quiz ID as the final message
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

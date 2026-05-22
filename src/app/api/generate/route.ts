import { z } from "zod";
import { inputScheme, outputScheme } from "@/types/mcq-question";
import { generateAllQuestions } from "@/lib/quizGraph";
import { saveQuestion } from "@/utils/firestore/saveQuestion";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedInput = inputScheme.parse(body);

    const encoder = new TextEncoder();
    const total = parsedInput.numberOfQuestions;
    const batchSize = 10;
    const batchCount = Math.ceil(total / batchSize);

    const readable = new ReadableStream({
      async start(controller) {
        try {
          // Send start event
          controller.enqueue(encoder.encode(`__BATCH_COUNT__:${batchCount}\n`));

          const result = await generateAllQuestions(parsedInput, (done, totalBatches) => {
            controller.enqueue(encoder.encode(`__BATCH_PROGRESS__:${done}:${totalBatches}\n`));
          });

          // Build full output matching outputScheme
          const output: z.infer<typeof outputScheme> = {
            questions: result.questions,
            metadata: {
              totalQuestions: result.metadata.totalQuestions,
            },
          };

          const quizId = await saveQuestion(
            { ...output, metadata: { ...output.metadata, ...result.metadata } },
            parsedInput.topic,
            parsedInput.difficulty,
          );

          controller.enqueue(encoder.encode(`__DONE__\n`));
          controller.enqueue(encoder.encode(`__QUIZ_ID__:${quizId}`));
          controller.close();
        } catch (err) {
          console.error("Stream error:", err);
          const msg = err instanceof Error ? err.message : "Unknown error";
          controller.enqueue(encoder.encode(`__ERROR__:${msg}\n`));

          // Try a fallback single-LLM call for small batches
          try {
            const { llm } = await import("@/lib/deepseek");
            const { HumanMessage, SystemMessage } = await import("@langchain/core/messages");
            const { JSONPrompt } = await import("@/utils/prompt");

            const prompt = { ...JSONPrompt, input: { ...parsedInput } };
            const messages = [
              new SystemMessage("you are an expert quiz question generator that outputs valid json only"),
              new HumanMessage(JSON.stringify(prompt)),
            ];

            const stream = await llm.stream(messages);
            let accumulated = "";
            for await (const chunk of stream) {
              const text = typeof chunk.content === "string" ? chunk.content : "";
              accumulated += text;
              controller.enqueue(encoder.encode(text));
            }

            // Extract JSON
            let clean = accumulated.trim();
            clean = clean.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/g, "").trim();
            const firstBrace = clean.indexOf("{");
            const lastBrace = clean.lastIndexOf("}");
            if (firstBrace !== -1 && lastBrace > firstBrace) {
              let json = clean.slice(firstBrace, lastBrace + 1);
              json = json.replace(/,\s*([}\]])/g, "$1");
              json = json.replace(/}\s*{/g, "},{");
              const parsed = JSON.parse(json);
              const validated = outputScheme.parse(parsed);

              const quizId = await saveQuestion(
                Object.assign(
                  validated,
                  { metadata: { ...validated.metadata, topic: parsedInput.topic, averageDifficulty: parsedInput.difficulty, generatedAt: new Date().toISOString() } },
                ),
                parsedInput.topic,
                parsedInput.difficulty,
              );

              controller.enqueue(encoder.encode(`\n__QUIZ_ID__:${quizId}`));
            }
          } catch {
            // fallback failed too — just send generic error
            controller.enqueue(encoder.encode(`\n__ERROR__:Generation failed after multiple attempts`));
          }

          controller.close();
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

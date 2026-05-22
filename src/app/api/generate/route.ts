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

            // Extract JSON — progressive fallback scanning
            let s2 = accumulated.trim();
            s2 = s2.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/g, "").trim();
            const firstBrace2 = s2.indexOf("{");
            if (firstBrace2 !== -1) {
              const start2 = s2.slice(firstBrace2);
              let lastBrace2 = start2.lastIndexOf("}");
              let parsed = null;

              while (lastBrace2 > 0 && !parsed) {
                let candidate = start2.slice(0, lastBrace2 + 1);
                candidate = candidate.replace(/,\s*([}\]])/g, "$1");
                candidate = candidate.replace(/}\s*{/g, "},{");
                candidate = candidate.replace(/:\s*([}\]])/g, ": null$1");
                try {
                  parsed = JSON.parse(candidate);
                } catch {
                  lastBrace2 = start2.lastIndexOf("}", lastBrace2 - 1);
                }
              }

              if (parsed) {
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

import { llm } from "@/lib/deepseek";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { JSONPrompt } from "@/utils/prompt";
import { z } from "zod";
import { inputScheme } from "@/types/mcq-question"

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

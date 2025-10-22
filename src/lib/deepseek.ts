import { ChatDeepSeek } from "@langchain/deepseek";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { IConfig } from "@/utils/AIConfig";

const llm = new ChatDeepSeek({
  model: "deepseek-chat",
  temperature: 0,
  streaming: false,
  // other params...
});

// Helper function to create question sheet

export async function generateQuestionSheet(conf: IConfig) {
  const questionGeneratorPrompt = [
    new SystemMessage(
      "you are an assistant for generating question sheet for interview preparation,with no answers,must not markdown,parsable "
    ),
    new HumanMessage(JSON.stringify({ ...conf })),
  ];
  const response = await llm.invoke(questionGeneratorPrompt);

  return JSON.parse(response.content as string);
}

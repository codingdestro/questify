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

export async function checkAnswer(question: string, answer: string) {
  const outputFormat = {
    total: "number",
    correct: "number",
    incorrect: "number",
    pass: "boolean",
  };
  const answerCheckerPrompt = [
    new SystemMessage(
      `you are an assistant for checking answers for interview preparation questions,respond marks assume 1 marks per question, output format should be parsable ${JSON.stringify(
        outputFormat
      )},`
    ),
    new HumanMessage(JSON.stringify({ question: question, answer: answer })),
  ];
  const response = await llm.invoke(answerCheckerPrompt);

  return response.content;
}

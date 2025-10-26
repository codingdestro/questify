import { ChatDeepSeek } from "@langchain/deepseek";
export const llm = new ChatDeepSeek({
  model: "deepseek-chat",
  streaming: false,
});

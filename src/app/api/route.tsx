import OpenAI from "openai";

const config = {
  task: "create a question",
  topic: "python",
  questions: "5",
  type: "MCQ",
  level: "easy",
  for: "interview preparation",
  structured: "json parsable",
};

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL,
});

export async function GET(req: Request) {
  try {
    const response = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "you are an assistant for generating question sheet for interview preparation,with no answers ",
        },
        { role: "user", content: JSON.stringify(config) },
      ],
    });

    const assistantReply = response.choices[0].message.content;
    return Response.json(JSON.parse(assistantReply!));
  } catch (err) {
    console.error("DeepSeek API error:", err);
    return new Response("something went wrong!");
  }
}

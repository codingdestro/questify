import OpenAI from "openai";

const config = {
  task: "create a question",
  topic: "javascript",
  questions: "10",
  type: "MCQ",
  level: "medium",
  for: "interview preparation",
  structured: "json parsable",
  format: "{question,options}[]",
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
            "you are an assistant for generating question sheet for interview preparation,with no answers,must not markdown,parsable ",
        },
        { role: "user", content: JSON.stringify(config) },
      ],
    });

    const assistantReply = response.choices[0].message.content;
    return Response.json(JSON.parse(assistantReply!));
  } catch {
    return Response.json({ error: "failed to generate!" }, { status: 500 });
  }
}

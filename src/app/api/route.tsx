import OpenAI from "openai";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

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

interface IQuestionSheet {
  topic: string;
  questions: string;
  type: string;
  level: string;
  for: string;
  sheet: {
    question: string;
    options: string[];
  }[];
}

async function addQuesetionSheet(sheet: IQuestionSheet) {
  try {
    const docRef = await addDoc(collection(db, "questionsheets"), {
      ...sheet,
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.log(error);
  }
}

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
    const parsedData = JSON.parse(assistantReply!);
    await addQuesetionSheet({
      topic: config.topic,
      questions: config.questions,
      type: config.type,
      level: config.level,
      for: config.for,
      sheet: parsedData,
    });
    return Response.json(parsedData);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "failed to generate!" }, { status: 500 });
  }
}

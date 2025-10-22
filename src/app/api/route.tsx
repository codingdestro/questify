import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { IConfig, config } from "@/utils/AIConfig";
import { generateQuestionSheet } from "@/lib/deepseek";

interface IQuestionSheet {
  heading: string;
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const questionConfig = { ...config, ...body };
    await createQuestionSheet(questionConfig);
    return new Response("Question sheet created successfully!", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
  return Response.json({ error: "Server Error" }, { status: 500 });
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

async function createQuestionSheet(conf: IConfig) {
  const questions = await generateQuestionSheet(conf);
  await addQuesetionSheet({
    topic: conf.topic,
    questions: conf.questions,
    type: conf.type,
    level: conf.level,
    for: conf.for,
    sheet: questions,
    heading: conf.heading,
  });
}

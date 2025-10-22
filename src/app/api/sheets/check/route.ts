import { checkAnswer } from "@/lib/deepseek";
export async function POST(req: Request) {
  const { question, answer } = await req.json();
  try {
    const result = await checkAnswer(question, answer);
    return new Response(result as string, { status: 200 });
  } catch (error) {
    return new Response("Error checking answers", { status: 500 });
  }
}

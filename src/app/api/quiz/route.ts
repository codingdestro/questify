import { getQuiz } from "@/utils/firestore/getQuiz";

export async function GET(req: Request) {
  const params = new URL(req.url);
  const id = params.searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "ID parameter is required" },
      { status: 400 }
    );
  }

  const quiz = await getQuiz(id);
  return Response.json(quiz, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

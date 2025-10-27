import { calculateResult } from "@/utils/firestore/calculateResult";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body === null || body.id === undefined || body.answers === undefined) {
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }
    const result = await calculateResult(body.id, body.answers);
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error("Error processing quiz result:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

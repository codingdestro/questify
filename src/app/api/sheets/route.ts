import { getAllDocs } from "@/lib/storage";

export async function POST(req: Request) {
  try {
    const jsonReq = await req.json();
    return new Response(JSON.stringify(jsonReq), { status: 200 });
  } catch (error) {
    console.log(error);
  }

  return Response.json({ error: "Server Error" }, { status: 500 });
}

export async function GET(req: Request) {
  try {
    const params = new URL(req.url);
    const id = params.searchParams.get("id");

    if (!id) {
      // fetch all documents
      const allDocs = getAllDocs<{
        metadata?: {
          totalQuestions?: number;
          topic?: string;
          averageDifficulty?: string;
        };
      }>();
      const allData = allDocs.map((doc) => {
        const meta = doc.data?.metadata || {};
        return {
          id: doc.id,
          topic: meta.topic || "unknown",
          difficulty: meta.averageDifficulty || "medium",
          questions: meta.totalQuestions || 0,
        };
      });
      return new Response(JSON.stringify(allData), { status: 200 });
    }

    // single document lookup
    const { getDoc } = await import("@/lib/storage");
    const doc = getDoc<Record<string, unknown>>(id);
    if (doc) {
      return new Response(JSON.stringify({ ...doc, id }), { status: 200 });
    } else {
      return new Response("No such document!", { status: 404 });
    }
  } catch (error) {
    console.log(error);
  }

  return Response.json({ error: "Server Error" }, { status: 500 });
}

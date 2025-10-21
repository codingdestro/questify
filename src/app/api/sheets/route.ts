import { db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
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
    if (!params || !params.searchParams.get("id")) {
      // return new Response("No ID provided", { status: 400 });
      //fetch all documents
      const querySnapshot = await getDocs(collection(db, "questionsheets"));
      const allData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          type: doc.data().type,
          level: doc.data().level,
          topic: doc.data().topic,
        };
      });
      return new Response(JSON.stringify(allData), { status: 200 });
    }

    const docRef = doc(db, "questionsheets", params.searchParams.get("id")!);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return new Response(JSON.stringify({ ...data, id: docSnap.id }), {
        status: 200,
      });
    } else {
      return new Response("No such document!", { status: 404 });
    }
  } catch (error) {
    console.log(error);
  }

  return Response.json({ error: "Server Error" }, { status: 500 });
}

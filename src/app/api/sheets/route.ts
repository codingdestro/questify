import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
export async function POST(req: Request) {
  try {
    const jsonReq = await req.json();
    console.log(jsonReq);
    const docRef = collection(db, "questionsheets");
    const docSnap = await getDocs(docRef);
    if (!docSnap.empty) {
      const data = docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      return new Response("No such document!", { status: 404 });
    }
  } catch (error) {
    console.log(error);
  }

  return new Response("Hello, Next.js!");
}

export async function GET() {
  try {
    const docRef = collection(db, "questionsheets");
    const docSnap = await getDocs(docRef);
    if (!docSnap.empty) {
      const data = docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      return new Response("No such document!", { status: 404 });
    }
  } catch (error) {
    console.log(error);
  }

  return Response.json({ error: "Server Error" }, { status: 500 });
}

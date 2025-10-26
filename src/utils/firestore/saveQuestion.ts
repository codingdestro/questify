import { z } from "zod";
import { outputScheme } from "@/types/mcq-question";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function saveQuestion(
  questionData: z.infer<typeof outputScheme>
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "mcq-questions"), questionData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}

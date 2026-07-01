import { db } from "./firebase";
import { collection, doc, setDoc, getDoc as firestoreGetDoc, getDocs } from "firebase/firestore";
import { quizDocumentScheme } from "@/types/mcq-question";

export async function saveDoc(id: string, data: unknown): Promise<void> {
  // Validate data with Zod schema before saving
  const validated = quizDocumentScheme.parse(data);
  const docRef = doc(db, "quizzes", id);
  await setDoc(docRef, validated);
}

export async function getDoc<T>(id: string): Promise<T | null> {
  const docRef = doc(db, "quizzes", id);
  const docSnap = await firestoreGetDoc(docRef);
  if (!docSnap.exists()) return null;
  
  const data = docSnap.data();
  // Validate data with Zod schema after retrieving
  const validated = quizDocumentScheme.parse(data);
  return validated as unknown as T;
}

export async function getAllDocs<T>(): Promise<Array<{ id: string; data: T }>> {
  const querySnapshot = await getDocs(collection(db, "quizzes"));
  const docs: Array<{ id: string; data: T }> = [];
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const parsed = quizDocumentScheme.safeParse(data);
    if (parsed.success) {
      docs.push({
        id: docSnap.id,
        data: parsed.data as unknown as T,
      });
    } else {
      console.warn(`Quiz document ${docSnap.id} failed Zod validation:`, parsed.error);
    }
  });
  return docs;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

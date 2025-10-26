import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
export async function getQuiz(id: string) {
  const quizRef = doc(db, "mcq-questions", id);
  const quizSnap = await getDoc(quizRef);

  if (quizSnap.exists()) {
    return quizSnap.data();
  } else {
    throw new Error("Quiz not found");
  }
}

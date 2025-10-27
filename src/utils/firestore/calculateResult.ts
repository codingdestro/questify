import { getQuiz } from "./getQuiz";
import { z } from "zod";
import { outputScheme } from "@/types/mcq-question";

// {question-0: 'a', question-1: 'd', question-2: 'd', question-3: 'a', question-4: 'b', …}

type answerScheme = Record<string, string>;
type TQuiz = z.infer<typeof outputScheme>;

export async function calculateResult(docId: string, answers: answerScheme) {
  try {
    const document = await getQuiz(docId);
    const quiz: TQuiz = outputScheme.parse(document);

    let correctCount = 0;
    let totalMarks = 0;
    let obtainedMarks = 0;
    let result: "Fail" | "Pass" = "Fail";
    quiz.questions.forEach((question, index) => {
      const userAnswer = answers[`question-${index}`];
      totalMarks += question.points;
      if (userAnswer === question.correctAnswer) {
        correctCount += 1;
        obtainedMarks += question.points;
      }
    });

    const passMark = (70 / 100) * totalMarks;
    if (obtainedMarks >= passMark) {
      result = "Pass";
    }

    return {
      totalQuestions: quiz.questions.length,
      correctAnswers: correctCount,
      totalMarks,
      obtainedMarks,
      result,
    };
  } catch (error) {
    console.log("Error calculating result:", error);
  }
}

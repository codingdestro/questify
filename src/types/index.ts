export type LoaderState = "loading" | "success" | "error" | "idle";
export type TSheetItem = {
  id: string;
  topic: string;
  difficulty: string;
  questions: number;
};
export type TCalculateResult = {
  totalQuestions: number;
  correctAnswers: number;
  totalMarks: number;
  obtainedMarks: number;
  result: "Pass" | "Fail";
};
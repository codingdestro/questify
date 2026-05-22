// Compute average difficulty from a list of questions
export function computeAverageDifficulty(questions: { difficulty: string }[]): string {
  const scores: Record<string, number> = { easy: 1, medium: 2, hard: 3 };
  const total = questions.reduce((sum, q) => sum + (scores[q.difficulty] || 2), 0);
  const avg = total / questions.length;
  if (avg <= 1.5) return "easy";
  if (avg <= 2.5) return "medium";
  return "hard";
}

import { Check, CircleX, X } from "lucide-react";
export default function ResultCard({
  totalQuestions,
  correctAnswers,
  totalMarks,
  obtainedMarks,
  result,
  onClose,
  onRetry,
}: {
  totalQuestions: number;
  correctAnswers: number;
  totalMarks: number;
  obtainedMarks: number;
  result: "pass" | "fail";
  onClose: () => void;
  onRetry: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-80 rounded-xl bg-surface p-6 shadow-xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-foreground-muted hover:text-foreground transition-colors"
        >
          <CircleX className="h-6 w-6" />
        </button>

        <div className="text-center">
          <div
            className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${
              result === "pass" ? "bg-success-light" : "bg-error-light"
            }`}
          >
            {result === "pass" ? (
              <Check className="h-10 w-10 text-success" />
            ) : (
              <X className="h-10 w-10 text-error" />
            )}
          </div>

          <h2 className="mb-2 text-2xl font-bold text-foreground">
            {result === "pass" ? "Congratulations!" : "Keep Trying!"}
          </h2>
          <p className="mb-6 text-foreground-muted">
            {result === "pass"
              ? "You passed the quiz!"
              : "Better luck next time!"}
          </p>

          <div className="space-y-3 rounded-lg bg-sky-50 p-4">
            <div className="flex justify-between">
              <span className="text-foreground-muted">Total Questions:</span>
              <span className="font-semibold text-foreground">
                {totalQuestions}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-muted">Correct Answers:</span>
              <span className="font-semibold text-success">
                {correctAnswers}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-muted">Score:</span>
              <span className="font-semibold text-foreground">
                {obtainedMarks} / {totalMarks}
              </span>
            </div>
            <div className="flex justify-between border-t border-border pt-3">
              <span className="text-foreground-muted">Percentage:</span>
              <span className="text-lg font-bold text-foreground">
                {Math.round((obtainedMarks / totalMarks) * 100)}%
              </span>
            </div>
          </div>

          <button
            onClick={onRetry}
            className="mt-6 w-full btn-primary cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

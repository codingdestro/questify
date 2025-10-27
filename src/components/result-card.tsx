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
      <div className="relative  w-80 rounded-lg bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <CircleX className="h-6 w-6" />
        </button>

        <div className="text-center">
          <div
            className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${
              result === "pass" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {result === "pass" ? (
              <Check className="h-10 w-10 text-green-500" />
            ) : (
              <X className="h-10 w-10 text-red-500" />
            )}
          </div>

          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            {result === "pass" ? "Congratulations!" : "Keep Trying!"}
          </h2>
          <p className="mb-6 text-gray-600">
            {result === "pass"
              ? "You passed the quiz!"
              : "Better luck next time!"}
          </p>

          <div className="space-y-3 rounded-lg bg-gray-50 p-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Questions:</span>
              <span className="font-semibold text-gray-900">
                {totalQuestions}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Correct Answers:</span>
              <span className="font-semibold text-green-600">
                {correctAnswers}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Score:</span>
              <span className="font-semibold text-gray-900">
                {obtainedMarks} / {totalMarks}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3">
              <span className="text-gray-600">Percentage:</span>
              <span className="text-lg font-bold text-gray-900">
                {Math.round((obtainedMarks / totalMarks) * 100)}%
              </span>
            </div>
          </div>

          <button
            onClick={onRetry}
            className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

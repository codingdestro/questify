interface Props {
  score: number;
  totalQuestions: number;
  passingScore?: number;
}

export default function ResultCard({
  score,
  totalQuestions,
  passingScore = 40,
}: Props) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassed = percentage >= passingScore;

  const getScoreColor = () => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getBgColor = () => {
    if (percentage >= 90) return "bg-green-50 border-green-200";
    if (percentage >= 70) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <div className={`p-6 rounded-lg border-2 ${getBgColor()} w-96 mx-auto`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Result</h2>

        <div className={`text-6xl font-bold mb-2 ${getScoreColor()}`}>
          {percentage}%
        </div>

        <div className="text-lg text-gray-600 mb-4">
          {score} out of {totalQuestions} correct
        </div>

        <div
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
            isPassed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isPassed ? "✅ PASSED" : "❌ FAILED"}
        </div>
      </div>
    </div>
  );
}

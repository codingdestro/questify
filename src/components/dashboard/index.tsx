interface DashboardProps {
  username: string;
  currentMarks: number;
  totalMarks: number;
  streak: number;
  levels: {
    name: string;
    currentMarks: number;
    totalMarks: number;
    isCompleted: boolean;
  }[];
  revisionHistory: {
    id: string;
    question: string;
    isCorrect: boolean;
    timestamp: Date;
  }[];
}

export default function Dashboard({
  username,
  currentMarks,
  totalMarks,
  streak,
  levels,
  revisionHistory,
}: DashboardProps) {
  const progressPercentage = (currentMarks / totalMarks) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-white to-mint-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {username}!
          </h1>
          <p className="text-foreground-muted mt-1">
            Track your progress and continue learning
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-mint">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground-muted">Total Score</p>
                <p className="text-2xl font-bold text-primary-600">
                  {currentMarks}/{totalMarks}
                </p>
              </div>
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-primary-100 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="card-mint">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground-muted">Current Streak</p>
                <p className="text-2xl font-bold text-warning">{streak} days</p>
              </div>
              <div className="w-16 h-16 bg-warning-light rounded-full flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
            </div>
          </div>

          <div className="card-mint">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground-muted">Levels Completed</p>
                <p className="text-2xl font-bold text-success">
                  {levels.filter((l) => l.isCompleted).length}/{levels.length}
                </p>
              </div>
              <div className="w-16 h-16 bg-success-light rounded-full flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Level Progress */}
          <div className="card-mint">
            <h2 className="text-xl font-bold text-foreground mb-6">Level Progress</h2>
            <div className="space-y-4">
              {levels.map((level, index) => {
                const levelProgress = (level.currentMarks / level.totalMarks) * 100;
                return (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{level.name}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          level.isCompleted
                            ? "bg-success-light text-success"
                            : "bg-warning-light text-warning"
                        }`}
                      >
                        {level.isCompleted ? "Completed" : "In Progress"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-foreground-muted mb-2">
                      <span>
                        {level.currentMarks}/{level.totalMarks} points
                      </span>
                      <span>{Math.round(levelProgress)}%</span>
                    </div>
                    <div className="w-full bg-primary-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          level.isCompleted ? "bg-success" : "bg-primary-500"
                        }`}
                        style={{ width: `${levelProgress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Revision History */}
          <div className="card-mint">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Recent Revision Questions
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {revisionHistory.length > 0 ? (
                revisionHistory.map((item) => (
                  <div key={item.id} className="border-l-4 border-primary-300 pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-foreground mb-1">{item.question}</p>
                        <p className="text-xs text-foreground-muted">
                          {item.timestamp.toLocaleDateString()} at{" "}
                          {item.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          item.isCorrect
                            ? "bg-success-light text-success"
                            : "bg-error-light text-error"
                        }`}
                      >
                        {item.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-foreground-muted">
                  <p>No revision history yet</p>
                  <p className="text-sm">Start solving questions to see your history here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

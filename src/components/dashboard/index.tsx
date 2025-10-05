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
  revisionHistory
}: DashboardProps) {
  const progressPercentage = (currentMarks / totalMarks) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {username}!</h1>
          <p className="text-gray-600 mt-2">Track your progress and continue learning</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Marks Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Score</p>
                <p className="text-2xl font-bold text-blue-600">{currentMarks}/{totalMarks}</p>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">{Math.round(progressPercentage)}%</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Streak Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-orange-600">{streak} days</p>
              </div>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
            </div>
          </div>

          {/* Achievement Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Levels Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {levels.filter(level => level.isCompleted).length}/{levels.length}
                </p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Level Progress */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Level Progress</h2>
            <div className="space-y-4">
              {levels.map((level, index) => {
                const levelProgress = (level.currentMarks / level.totalMarks) * 100;
                return (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{level.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        level.isCompleted 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {level.isCompleted ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>{level.currentMarks}/{level.totalMarks} points</span>
                      <span>{Math.round(levelProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          level.isCompleted ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${levelProgress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Revision History */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Revision Questions</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {revisionHistory.length > 0 ? (
                revisionHistory.map((item) => (
                  <div key={item.id} className="border-l-4 border-gray-200 pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 mb-1">{item.question}</p>
                        <p className="text-xs text-gray-500">
                          {item.timestamp.toLocaleDateString()} at {item.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        item.isCorrect 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
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

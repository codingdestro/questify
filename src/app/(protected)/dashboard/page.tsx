import Dashboard from "@/components/dashboard";

const dummyDashboard = {
  username: "Arman Khan",
  currentMarks: 50,
  totalMarks: 100,
  streak: 2,
  levels: [
    {
        name: "Beginner",
        currentMarks: 20,
        totalMarks: 30,
        isCompleted: true,
    }
  ],
  revisionHistory: [
    {
        id: "1",
        question: "What is React?",
        isCorrect: true,
        timestamp: new Date(),
   }
  ],
};

export default function page() {
  return (
    <Dashboard
      currentMarks={dummyDashboard.currentMarks}
      totalMarks={dummyDashboard.totalMarks}
      username={dummyDashboard.username}
      streak={dummyDashboard.streak}
      levels={dummyDashboard.levels}
      revisionHistory={dummyDashboard.revisionHistory}
    />
  );
}

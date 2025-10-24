import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Users,
  Trophy,
  TrendingUp,
  Brain,
  Zap,
  Share2,
} from "lucide-react";

export default function page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full mb-6 text-sm font-semibold">
          <Sparkles className="w-4 h-4" />
          AI-Powered Quiz Generation
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
          Master Any Topic with AI-Generated Quizzes
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Generate personalized quizzes instantly, compete with friends, and
          track your progress with powerful analytics.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/home"
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-lg font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition flex items-center justify-center gap-2"
          >
            Generate Your First Quiz <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/demo"
            className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition"
          >
            See How It Works
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Everything You Need to Learn Smarter
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-6">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              AI Quiz Generation
            </h3>
            <p className="text-gray-600">
              Create custom quizzes on any topic instantly using advanced AI
              technology.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Practice Questions
            </h3>
            <p className="text-gray-600">
              Access unlimited practice questions tailored to your learning pace
              and style.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-6">
              <Share2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Share with Friends
            </h3>
            <p className="text-gray-600">
              Challenge your friends and collaborate on quiz challenges
              together.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Leaderboard
            </h3>
            <p className="text-gray-600">
              Compete globally and see how you rank against other learners.
            </p>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16 text-white">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Track Your Progress with Powerful Analytics
              </h2>
              <p className="text-indigo-100 text-lg mb-8">
                Monitor your learning journey with detailed analytics, streaks,
                and personalized insights to help you stay motivated and improve
                faster.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Performance Metrics</h4>
                    <p className="text-indigo-100">
                      Track accuracy, speed, and improvement over time
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Streak Tracking</h4>
                    <p className="text-indigo-100">
                      Build consistency with daily streak rewards
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Social Learning</h4>
                    <p className="text-indigo-100">
                      Compare progress with friends and study groups
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-sm text-indigo-200 mb-2">
                    Weekly Progress
                  </div>
                  <div className="text-3xl font-bold">+47%</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-sm text-indigo-200 mb-2">
                    Current Streak
                  </div>
                  <div className="text-3xl font-bold">🔥 12 Days</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-sm text-indigo-200 mb-2">
                    Global Rank
                  </div>
                  <div className="text-3xl font-bold">#2,847</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Get Started in 3 Simple Steps
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              Choose Your Topic
            </h3>
            <p className="text-gray-600">
              Select any subject or paste your study material
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              Generate Quiz
            </h3>
            <p className="text-gray-600">
              AI creates personalized questions instantly
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              Learn & Compete
            </h3>
            <p className="text-gray-600">
              Practice, share, and climb the leaderboard
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          Ready to Level Up Your Learning?
        </h2>
        <p className="text-xl text-gray-600 mb-12 mx-auto">
          Join thousands of students mastering their subjects with AI-powered
          quizzes
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition"
        >
          Start Learning Free <ArrowRight className="w-6 h-6" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 text-center text-gray-600">
        <p>&copy; 2024 Questify. All rights reserved.</p>
      </footer>
    </div>
  );
}

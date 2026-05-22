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
import Navbar from "@/components/navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6 text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            AI-Powered Quiz Generation
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 bg-clip-text text-transparent animate-gradient">
            Master Any Topic with AI-Generated Quizzes
          </h1>
          <p className="text-xl md:text-2xl text-foreground-muted mb-12 max-w-3xl mx-auto">
            Generate personalized quizzes instantly, compete with friends, and
            track your progress with powerful analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/home"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl text-lg font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Generate Your First Quiz <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary-400 text-primary-600 rounded-xl text-lg font-semibold hover:bg-sky-50 transition-all"
            >
              See How It Works
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            Everything You Need to Learn Smarter
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Brain, title: "AI Quiz Generation", desc: "Create custom quizzes on any topic instantly using advanced AI technology.", color: "primary" },
              { icon: Zap, title: "Practice Questions", desc: "Access unlimited practice questions tailored to your learning pace and style.", color: "primary" },
              { icon: Share2, title: "Share with Friends", desc: "Challenge your friends and collaborate on quiz challenges together.", color: "primary" },
              { icon: Trophy, title: "Leaderboard", desc: "Compete globally and see how you rank against other learners.", color: "primary" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-mint hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
                <p className="text-foreground-muted">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Analytics */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 md:p-16 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Track Your Progress with Powerful Analytics
                </h2>
                <p className="text-primary-200 text-lg mb-8">
                  Monitor your learning journey with detailed analytics, streaks, and
                  personalized insights to help you stay motivated and improve faster.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: TrendingUp, title: "Performance Metrics", desc: "Track accuracy, speed, and improvement over time" },
                    { icon: Sparkles, title: "Streak Tracking", desc: "Build consistency with daily streak rewards" },
                    { icon: Users, title: "Social Learning", desc: "Compare progress with friends and study groups" },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-3">
                      <Icon className="w-6 h-6 mt-1 shrink-0 text-primary-300" />
                      <div>
                        <h4 className="font-semibold mb-1">{title}</h4>
                        <p className="text-primary-200">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-sm text-primary-200 mb-2">Weekly Progress</div>
                    <div className="text-3xl font-bold">+47%</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-sm text-primary-200 mb-2">Current Streak</div>
                    <div className="text-3xl font-bold">🔥 12 Days</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-sm text-primary-200 mb-2">Global Rank</div>
                    <div className="text-3xl font-bold">#2,847</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            Get Started in 3 Simple Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { num: "1", title: "Choose Your Topic", desc: "Select any subject or paste your study material" },
              { num: "2", title: "Generate Quiz", desc: "AI creates personalized questions instantly" },
              { num: "3", title: "Learn & Compete", desc: "Practice, share, and climb the leaderboard" },
            ].map(({ num, title, desc }) => (
              <div key={num} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  {num}
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
                <p className="text-foreground-muted">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Ready to Level Up Your Learning?
          </h2>
          <p className="text-xl text-foreground-muted mb-12 mx-auto max-w-2xl">
            Join thousands of students mastering their subjects with AI-powered quizzes
          </p>
          <Link
            href="/home"
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl text-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Start Learning Free <ArrowRight className="w-6 h-6" />
          </Link>
        </section>

        {/* Footer */}
        <footer className="border-t border-border text-center text-foreground-muted py-8 text-sm">
          <p>&copy; 2024 Questify. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

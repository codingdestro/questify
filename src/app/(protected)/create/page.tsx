"use client";
import { z } from "zod";
import { inputScheme } from "@/types/mcq-question";
import { useActionState } from "react";
import axios from "axios";
import StepLoading from "@/components/loader/step-loading";
import { useRouter } from "next/navigation";
import { Sparkles, BookOpen, Layers, Brain, Users, X } from "lucide-react";
type TInput = z.infer<typeof inputScheme>;

export default function Page() {
  const redirect = useRouter();
  const formHandler = async (state: TInput, formdata: FormData) => {
    const formValues: Record<string, unknown> = {};
    formdata.forEach((value, key) => {
      if (key === "subtopics" || key === "avoidTopics") {
        formValues[key] = (value as string).split(",").map((s) => s.trim());
      } else if (key === "numberOfQuestions") {
        formValues[key] = Number(value);
      } else {
        formValues[key] = value;
      }
    });

    try {
      const parsedInput: TInput = inputScheme.parse(formValues);
      const res = await axios.post("api/generate", parsedInput, {
        headers: { "Content-Type": "application/json" },
      });
      const quizId = res.data;
      redirect.push(`/sheet/${quizId}`);
    } catch (error) {
      console.log("Error generating questions:", error);
    }
    return state;
  };

  const [state, formAction, ispending] = useActionState<TInput, FormData>(
    formHandler,
    {
      topic: "",
      subtopics: [],
      numberOfQuestions: 5,
      difficulty: "easy",
      questionStyle: "recall",
      targetAudience: "",
      avoidTopics: [],
      additionalContext: "",
    }
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-mint-50 via-white to-mint-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Generator
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 bg-clip-text text-transparent">
            Create a Quiz
          </h1>
          <p className="text-foreground-muted mt-2">
            Fill in the details below and let AI generate your custom quiz
          </p>
        </div>

        <div className="card-mint">
          {ispending ? (
            <StepLoading autoAnimate={true} animationDuration={4000} />
          ) : (
            <form className="flex flex-col gap-5" action={formAction}>
              {/* Topic */}
              <div>
                <label className="block text-sm font-semibold text-foreground-secondary mb-1.5">
                  <BookOpen className="w-4 h-4 inline mr-1.5 text-primary-500" />
                  Topic
                </label>
                <input
                  type="text"
                  placeholder="e.g., React, Python, World History"
                  name="topic"
                  required
                  className="w-full border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white text-foreground placeholder-foreground-muted/60"
                />
              </div>

              {/* Subtopics */}
              <div>
                <label className="block text-sm font-semibold text-foreground-secondary mb-1.5">
                  <Layers className="w-4 h-4 inline mr-1.5 text-primary-500" />
                  Subtopics
                </label>
                <input
                  type="text"
                  placeholder="Comma separated (e.g., hooks, state, props)"
                  name="subtopics"
                  required
                  className="w-full border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white text-foreground placeholder-foreground-muted/60"
                />
              </div>

              {/* Number & Difficulty row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground-secondary mb-1.5">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    placeholder="5"
                    required
                    name="numberOfQuestions"
                    defaultValue={state.numberOfQuestions}
                    min={1}
                    max={100}
                    className="w-full border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground-secondary mb-1.5">
                    Difficulty
                  </label>
                  <select
                    name="difficulty"
                    required
                    defaultValue={state.difficulty}
                    className="w-full border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white text-foreground"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Question Style & Audience row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground-secondary mb-1.5">
                    <Brain className="w-4 h-4 inline mr-1.5 text-primary-500" />
                    Question Style
                  </label>
                  <select
                    name="questionStyle"
                    defaultValue={state.questionStyle}
                    className="w-full border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white text-foreground"
                  >
                    <option value="recall">Recall</option>
                    <option value="application">Application</option>
                    <option value="analysis">Analysis</option>
                    <option value="evaluation">Evaluation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground-secondary mb-1.5">
                    <Users className="w-4 h-4 inline mr-1.5 text-primary-500" />
                    Target Audience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., high school students"
                    required
                    name="targetAudience"
                    className="w-full border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white text-foreground placeholder-foreground-muted/60"
                  />
                </div>
              </div>

              {/* Avoid Topics */}
              <div>
                <label className="block text-sm font-semibold text-foreground-secondary mb-1.5">
                  <X className="w-4 h-4 inline mr-1.5 text-primary-500" />
                  Avoid Topics
                </label>
                <input
                  type="text"
                  placeholder="Comma separated topics to exclude"
                  name="avoidTopics"
                  className="w-full border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white text-foreground placeholder-foreground-muted/60"
                />
              </div>

              {/* Additional Context */}
              <div>
                <label className="block text-sm font-semibold text-foreground-secondary mb-1.5">
                  Additional Context
                </label>
                <textarea
                  placeholder="Any specific requirements or context for the quiz"
                  name="additionalContext"
                  className="w-full border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white text-foreground placeholder-foreground-muted/60 resize-y min-h-[100px]"
                />
              </div>

              {/* Submit */}
              <button
                className="btn-primary w-full text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={ispending}
                type="submit"
              >
                {ispending ? "Generating..." : "✨ Generate Questions"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

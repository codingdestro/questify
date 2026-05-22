"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { outputScheme } from "@/types/mcq-question";
import { TCalculateResult } from "@/types";
import { z } from "zod";
import ResultCard from "@/components/result-card";
import { useApiCallback } from "@/hooks/useApiCallback";
import SimpleLoading from "@/components/loader/SimpleLoading";
import { Brain, ArrowRight, CheckCircle2 } from "lucide-react";

type TQuestion = z.infer<typeof outputScheme>;

export default function Page() {
  const { id } = useParams();

  const [questions, setQuestions] = useState<TQuestion | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<TCalculateResult | null>(null);

  const { loading: status, dispatch: fetchQuiz } = useApiCallback<TQuestion>(
    `/api/quiz?id=${id}`
  );

  const { loading, dispatch: submitQuiz } =
    useApiCallback<TCalculateResult>(`/api/quiz/result`);

  const formHandler = async (data: FormData) => {
    const entries: Record<string, string> = {};
    data.forEach((value, key) => {
      if (typeof value === "string") {
        entries[key] = value;
      }
    });
    submitQuiz(
      (state) => {
        setResult(state);
        setShowResult(true);
        setTimeout(() => {
          setShowResult(false);
        }, 5000);
      },
      {
        method: "POST",
        data: { id, answers: entries },
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  useEffect(() => {
    fetchQuiz((state: TQuestion) => {
      const parsedData = outputScheme.parse(state);
      setQuestions(parsedData);
    });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-mint-50 via-white to-mint-100 py-8 px-4">
      {showResult && result && (
        <ResultCard
          totalQuestions={result.totalQuestions}
          correctAnswers={result.correctAnswers}
          totalMarks={result.totalMarks}
          obtainedMarks={result.obtainedMarks}
          result={result.result.toLowerCase() as "pass" | "fail"}
          onClose={() => setShowResult(false)}
          onRetry={() => {
            setShowResult(false);
            setResult(null);
          }}
        />
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-3">
            <Brain className="w-4 h-4" />
            Practice Quiz
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
            Answer the Questions
          </h1>
        </div>

        {status === "loading" ? (
          <div className="card-mint py-16">
            <SimpleLoading />
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formHandler(new FormData(e.currentTarget));
            }}
          >
            <div className="space-y-6">
              {questions?.questions.map((state, questionIndex) => (
                <div
                  key={questionIndex}
                  className="card-mint hover:bg-surface-hover transition-colors"
                >
                  {/* Question Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <span className="shrink-0 w-9 h-9 bg-primary-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {questionIndex + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-foreground font-semibold text-base md:text-lg">
                        {state.question}
                      </p>
                      {state.category && (
                        <span className="inline-block mt-1 text-xs text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                          {state.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="ml-3 space-y-2.5">
                    {state.options.map((option, optionIndex) => (
                      <label
                        key={option.id}
                        htmlFor={`q${questionIndex}-${option.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary-300 hover:bg-mint-50 transition-all cursor-pointer group"
                      >
                        <span className="shrink-0 w-7 h-7 rounded-full border-2 border-border group-hover:border-primary-400 flex items-center justify-center text-xs font-semibold text-foreground-muted group-hover:text-primary-600 transition-colors">
                          {["a", "b", "c", "d"][optionIndex]}
                        </span>
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          id={`q${questionIndex}-${option.id}`}
                          value={option.id}
                          className="sr-only peer"
                        />
                        <p className="flex-1 text-foreground-secondary group-hover:text-foreground transition-colors">
                          {option.text}
                        </p>
                        <CheckCircle2 className="w-5 h-5 text-primary-500 opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="btn-primary inline-flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading !== "idle"}
              >
                {loading === "loading" ? (
                  <SimpleLoading />
                ) : (
                  <>
                    Submit Answers <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

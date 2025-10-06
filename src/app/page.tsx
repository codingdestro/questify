"use client";
import React from "react";
import QuestionCard from "@/components/QuestionCard";
import MCQCard from "@/components/QuestionCard/MCQCard";
import axios from "axios";
import { useApi } from "@/hooks/useApi";

const demoquestions = [
  {
    id: "q1",
    question: "What is your favorite programming language?",
    options: ["JavaScript", "Python", "Java", "C++"],
  },
  {
    id: "q2",
    question: "Which framework do you prefer for web development?",
    options: ["React", "Angular", "Vue", "Svelte"],
  },
  {
    id: "q3",
    question: "What is your preferred code editor?",
    options: ["VSCode", "Sublime Text", "Atom", "Vim"],
  },
  {
    id: "q4",
    question: "Which version control system do you use?",
    options: ["Git", "SVN", "Mercurial", "None"],
  },
  {
    id: "q5",
    question: "What is your favorite database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
  },
];
export default function Page() {
  const [answers, setAnswers] = React.useState<{ [key: string]: string }>({});
  const { data, loading, refetch } = useApi<{
    questions: { question: string; options: string[] }[];
  }>("/api");

  const handler = (id: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [id]: answer }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <QuestionCard heading="Demo Questions">
          {data && Array.isArray(data) ? (
            data.map((q, idx: number) => (
              <MCQCard
                onClick={(id, answer: string) => handler(id, answer)}
                key={idx}
                id={idx.toString()}
                question={q.question}
                options={q.options}
              />
            ))
          ) : loading ? (
            <span className="flex self-center bg-yellow-100 text-yellow-500 font-semibold border w-full rounded-lg p-2">
              Loading...
            </span>
          ) : (
            <>Failed</>
          )}
          <div className="flex items-center justify-between g-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => console.log(answers)}
            >
              Complete Quiz
            </button>

            <button
              className="rounded-lg shadow-lg bg-green-300 capitalize  p-4"
              disabled={loading}
              onClick={refetch}
            >
              create one
            </button>
          </div>
        </QuestionCard>
      </div>
    </main>
  );
}

"use client";
import React from "react";
import QuestionCard from "@/components/QuestionCard";
import MCQCard from "@/components/QuestionCard/MCQCard";

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
  const handler = (id: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [id]: answer }));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <QuestionCard heading="Demo questions">
        {demoquestions.map((q) => (
          <MCQCard
            onClick={(id, answer: string) => handler(id, answer)}
            key={q.id}
            id={q.id}
            question={q.question}
            options={q.options}
          />
        ))}
        <button
          className="border rounded-lg bg-blue-400 px-3 py-2 text-white"
          onClick={() => console.log(answers)}
        >
          complete
        </button>
      </QuestionCard>
    </main>
  );
}

"use client";
import MCQCard from "./MCQCard";
import React from "react";
import axios from "axios";

interface Props {
  heading: string;
  data: any; //eslint-disable-line @typescript-eslint/no-explicit-any
}
export default function Home({ heading, data }: Props) {
  const [selectedAnswers, setSelectedAnswers] = React.useState<{
    [key: string]: string;
  }>({});
  const logData = React.useCallback((id: string, answer: string) => {
    setSelectedAnswers((prev) => {
      return { ...prev, [id]: answer };
    });
  }, []);

  const handleCheckAnswer = async (question: string, answer: string) => {
    const res = await axios.post("/api/sheets/check", {
      question,
      answer,
    });
    console.log(res.data);
  };

  return (
    <main className="w-full max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {heading}
      </h1>

      <section className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-8">
        {data.sheet.map(
          (item: { question: string; options: string[] }, index: number) => (
            <MCQCard
              idx={index + 1}
              key={index}
              id={`question-${index}`}
              question={item.question}
              options={item.options}
              onClick={(id, answer) => logData(id, answer)}
            />
          )
        )}
        <button
          className="border rounded-lg bg-blue-400 text-white px-3 py-1"
          onClick={() =>
            handleCheckAnswer(
              JSON.stringify(data.sheet),
              JSON.stringify(selectedAnswers)
            )
          }
        >
          submit
        </button>
      </section>
    </main>
  );
}

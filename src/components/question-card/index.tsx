"use client";
import MCQCard from "./mcq-card";
import React from "react";
import ResultCard from "@/components/result-card";
import { Loader } from "lucide-react";
import { useApi } from "@/hooks/useApi";

interface Props {
  heading: string;
  data: any; //eslint-disable-line @typescript-eslint/no-explicit-any
}
export default function Home({ heading, data }: Props) {
  const [selectedAnswers, setSelectedAnswers] = React.useState<{
    [key: string]: string;
  }>({});
  const [show, setShow] = React.useState(false);

  const {
    data: result,
    loading: status,
    refetch: call,
  } = useApi("/api/sheets/check", {
    method: "POST",
    data: {
      question: JSON.stringify(data.sheet),
      answer: JSON.stringify(selectedAnswers),
    },
  });
  const logData = React.useCallback((id: string, answer: string) => {
    setSelectedAnswers((prev) => {
      return { ...prev, [id]: answer };
    });
  }, []);

  React.useEffect(() => {
    if (status === "success") {
      setShow(true);
    }
  }, [status]);

  return (
    <main className="w-full max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {heading}
      </h1>
      <ResultCard data={result} state={show} onClose={() => setShow(false)} />

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
          className="border rounded-lg bg-blue-400 text-white px-3 py-2 w-full flex items-center justify-center"
          onClick={() => (status === "loading" ? null : call())}
        >
          <Loader
            className="animate-spin text-white data-[show='loading']:block hidden"
            data-show={status}
          />
          <p className="data-[show='loading']:hidden" data-show={status}>
            Submit
          </p>
        </button>
      </section>
    </main>
  );
}

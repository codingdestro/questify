"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { outputScheme } from "@/types/mcq-question";
import { z } from "zod";

type TQuestion = z.infer<typeof outputScheme>;

export default function Page() {
  const { id } = useParams();

  const [questions, setQuestions] = useState<TQuestion | null>(null);
  const formHandler = async (data: FormData) => {
    const entries: Record<string, string> = {};
    data.forEach((value, key) => {
      if (typeof value === "string") {
        entries[key] = value;
      }
    });
    console.log(entries);
  };

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await axios.get(`/api/quiz?id=${id}`);
        const parsedData = outputScheme.parse(response.data);
        setQuestions(parsedData);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    }

    fetchQuiz();
  }, []); //eslint-disable-line

  return (
    <main className="py-5">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formHandler(new FormData(e.currentTarget));
          }}
        >
          <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-blue-50  rounded-lg shadow-md">
            {/* Quiz Title */}
            <div className="">
              <h2 className="w-full text-2xl font-bold   pb-2">Quiz</h2>
            </div>

            {/* Questions */}
            <div className="space-y-4">
              {questions?.questions.map((state, questionIndex) => (
                <div
                  key={questionIndex}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4"
                >
                  {/* Question Header */}
                  <div className="flex items-center gap-3">
                    <span className="shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                      {questionIndex + 1}
                    </span>
                    <p className="text-sm md:text-lg ">{state.question}</p>
                  </div>

                  {/* Options */}
                  <div className="ml-11 space-y-3">
                    {state.options.map((option, optionIndex) => (
                      <div key={option.id} className="flex items-center gap-3">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {["a", "b", "c", "d"][optionIndex]}.
                        </span>
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          id={`q${questionIndex}-${option.id}`}
                          value={option.id}
                          className="w-4 h-4 text-blue-600 cursor-pointer"
                        />
                        <label
                          htmlFor={`q${questionIndex}-${option.id}`}
                          className="flex-1 flex items-center gap-2 cursor-pointer"
                        >
                          <p className="flex-1 px-3 py-2"> {option.text}</p>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

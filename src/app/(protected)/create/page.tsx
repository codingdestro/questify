"use client";
import { z } from "zod";
import { inputScheme } from "@/types/mcq-question";
import { useActionState } from "react";
import axios from "axios";
type TInput = z.infer<typeof inputScheme>;
const formHandler = async (state: TInput, formdata: FormData) => {
  const formValues: any = {}; //eslint-disable-line
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
    console.log("Parsed Input:", parsedInput);
    const res = await axios.post("api/generate", parsedInput, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log("Error generating questions:", error);
  }
  return state;
};
export default function Page() {
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
    <main className="flex flex-col  py-5 items-center justify-center ">
      {/* add a gradient heading */}
      <h1 className="text-3xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Create a Quiz
      </h1>
      <div className="border rounded-lg shadow-lg border-gray-200 mt-5 w-3xl">
        {ispending ? <p className="p-4">Generating questions...</p> : null}
        {/* prevent from double load */}
        <form className="flex flex-col gap-4 p-4 " action={formAction}>
          <input
            type="text"
            placeholder="Topic"
            name="topic"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Subtopics (comma separated)"
            name="subtopics"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Number of Questions"
            required
            name="numberOfQuestions"
            defaultValue={state.numberOfQuestions}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            name="difficulty"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select
            name="questionStyle"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="recall">Recall</option>
            <option value="application">Application</option>
            <option value="analysis">Analysis</option>
            <option value="evaluation">Evaluation</option>
          </select>
          <input
            type="text"
            placeholder="Target Audience (e.g., high school students)"
            required
            name="targetAudience"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Avoid Topics (comma separated)"
            name="avoidTopics"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <textarea
            placeholder="Additional Context"
            name="additionalContext"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[100px]"
          ></textarea>
          {/* create a classic button */}
          <button
            className="bg-blue-500 text-white rounded-lg py-2 px-4 cursor-pointer"
            disabled={ispending}
            type="submit"
          >
            {ispending ? "Generating..." : "Generate Questions"}
          </button>
        </form>
      </div>
    </main>
  );
}

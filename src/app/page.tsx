"use client";
import React, { useEffect } from "react";
import { useApi } from "@/hooks/useApi";

interface IQuestionSheet {
  id: string;
  topic: string;
  questions: string;
  type: string;
  level: string;
  for: string;
  sheet: {
    question: string;
    options: string[];
  }[];
}
export default function Page() {
  const { data, loading, refetch } = useApi<{
    questions: { question: string; options: string[] }[];
  }>("/api", {
    method: "post",
    data: {
      topic: "javascript",
      questions: 5,
      type: "multiple choice",
      level: "easy",
      for: "interview preparation",
      structured: "json parsable",
      format: "{question,options}[]",
    },
  });

  const {
    data: sheetdata,
    refetch: refetchsheet,
    loading: sheetLoading,
  } = useApi<IQuestionSheet[]>("/api/sheets");

  useEffect(() => {
    refetchsheet();
  }, [data]); //eslint-disable-line

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center flex-col w-full">
      {/* Sheet Questions */}
      <div className=" shadow-lg rounded-lg p-5 flex gap-4 flex-col items-center justify-between  max-w-3xl w-full">
        {sheetLoading ? (
          <span className="flex self-center bg-yellow-100 text-yellow-500 font-semibold border w-full rounded-lg p-2">
            Loading...
          </span>
        ) : sheetdata && sheetdata.length ? (
          sheetdata.map((sheet, idx) => (
            <div
              key={idx}
              className="hover:underline bg-white p-4 rounded-lg w-full"
            >
              <h2 className="">{sheet.id}</h2>
            </div>
          ))
        ) : (
          <span className="bg-red-200 text-red-500 rounded-lg w-full p-4">
            No Sheet
          </span>
        )}
      </div>
      <div className="flex items-center justify-between g-4 my-5">
        <button
          className="rounded-lg shadow-lg bg-green-300 capitalize  mx-auto p-4 px-8 cursor-pointer disabled:cursor-not-allowed"
          disabled={loading}
          onClick={refetch}
        >
          {loading ? "Generating Questions..." : "Generate New Question Set"}
        </button>
      </div>
    </main>
  );
}

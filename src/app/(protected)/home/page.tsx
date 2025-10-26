"use client";
import React, { useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import Loader from "@/components/loader";
import { TSheetItem } from "@/types";
import CardGrid from "@/components/card-grid";
import Link from "next/link";

export default function Page() {
  const {
    data: sheetdata,
    refetch,
    loading,
  } = useApi<TSheetItem[]>("/api/sheets");

  useEffect(() => {
    refetch();
  }, []); //eslint-disable-line

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col w-full">
      <div className="flex justify-center items-center py-5">
        <h1 className="text-3xl font-semibold capitalize">
          create new question sheets
        </h1>
        <Link
          href="/create"
          className="ml-4 p-2 px-4 border rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition"
        >
          Create Sheet
        </Link>
      </div>
      {/* Sheet Questions */}
      <div className="box-border rounded-lg p-5 flex gap-4 flex-col items-center justify-center w-full">
        <p className="font-semibold underline mt-5 text-lg">Recent Sheets</p>
        {loading != "idle" ? (
          <Loader
            state={loading}
            size="sm"
            message="Fetching Sheets..."
            className="bg-white rounded-lg"
          />
        ) : sheetdata && sheetdata.length ? (
          <CardGrid columns={3}>
            {sheetdata.map((sheet: TSheetItem, idx) => (
              <div key={idx}>
                <Link
                  href={`/quiz/${sheet.id}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 hover:border-indigo-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {sheet.heading}
                  </h3>
                  <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
                    <p>
                      <span className="font-medium">Type:</span> {sheet.type}
                    </p>
                    <p>
                      <span className="font-medium">Level:</span> {sheet.level}
                    </p>
                    <p>
                      <span className="font-medium">Topic:</span> {sheet.topic}
                    </p>
                  </div>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                    Start Quiz
                  </button>
                </Link>
              </div>
            ))}
          </CardGrid>
        ) : (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-6 text-center">
            <p className="text-lg font-medium">No sheets available</p>
            <p className="text-sm text-red-500 mt-1">
              Create your first question sheet to get started
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

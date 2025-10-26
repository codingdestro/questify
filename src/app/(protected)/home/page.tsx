"use client";
import React, { useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import Loader from "@/components/loader";
import { TSheetItem } from "@/types";
import CardGrid from "@/components/card-grid";
import Link from "next/link";
import { MoveRight } from "lucide-react";

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
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col items-center w-full">
      {/* Sheet Questions */}
      <div className="box-border rounded-lg px-5 flex gap-4 flex-col items-center justify-center w-5xl">
        <div className="flex items-center justify-between w-full mt-2">
          <p className="font-semibold underline text-lg">Quizzes</p>
          <Link
            href="/create"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Create New Quiz
          </Link>
        </div>

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
              <div key={idx} className="w-80">
                <Link
                  href={`/sheet/${sheet.id}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 hover:border-indigo-300"
                >
                  <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
                    <p>
                      <span className="font-medium">Topic:</span> {sheet.topic}
                    </p>
                    <p>
                      <span className="font-medium">Questions:</span>{" "}
                      {sheet.questions}
                    </p>
                    <p>
                      <span className="font-medium">Difficulty:</span>{" "}
                      {sheet.difficulty}
                    </p>
                  </div>
                  <span className=" w-full flex items-center justify-end">
                    <MoveRight className="text-4xl text-blue-500" />
                  </span>
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

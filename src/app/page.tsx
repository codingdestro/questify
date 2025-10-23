"use client";
import React, { useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { redirect } from "next/navigation";
import SelectSheet from "@/components/SelectCard/SelectSheet";
import Loader from "@/components/Loader";
import { TSheetItem } from "@/types";
import CardGridExample from "@/components/CardGrid/CardGridExample";
import CardGrid from "@/components/CardGrid";
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col w-full">
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
                <SelectSheet
                  id={sheet.id}
                  heading={sheet.heading}
                  type={sheet.type}
                  level={sheet.level}
                  topic={sheet.topic}
                />
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

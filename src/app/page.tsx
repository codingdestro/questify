"use client";
import React, { useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const {
    data: sheetdata,
    refetch,
    loading,
  } = useApi<string[]>("/api/sheets");

  useEffect(() => {
    refetch();
  }, []); //eslint-disable-line

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center flex-col w-full">
      {/* Sheet Questions */}
      <div className=" shadow-lg rounded-lg p-5 flex gap-4 flex-col items-center justify-between  max-w-3xl w-full">
        {loading ? (
          <span className="flex self-center bg-yellow-100 text-yellow-500 font-semibold border w-full rounded-lg p-2">
            Loading...
          </span>
        ) : sheetdata && sheetdata.length ? (
          sheetdata.map((sheet, idx) => (
            <div
              key={idx}
              className="hover:underline bg-white p-4 rounded-lg w-full"
            >
              <Link href={`/sheet/${sheet}`}>
                <h2 className="">{sheet}</h2>
              </Link>
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
          onClick={() => redirect("/create")}
        >
          Generate New Question Set
        </button>
      </div>
    </main>
  );
}

"use client";
import React, { useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import Loader from "@/components/loader";
import { TSheetItem } from "@/types";
import CardGrid from "@/components/card-grid";
import Link from "next/link";
import {
  MoveRight,
  BookOpen,
  Layers,
  BarChart3,
  Sparkles,
  Plus,
} from "lucide-react";

const difficultyColors: Record<string, string> = {
  easy: "bg-success-light text-success",
  medium: "bg-warning-light text-warning",
  hard: "bg-error-light text-error",
};

export default function Page() {
  const { data: sheetdata, refetch, loading } = useApi<TSheetItem[]>(
    "/api/sheets"
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-3">
              <BookOpen className="w-4 h-4" />
              Quiz Library
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Your Quizzes
            </h1>
            <p className="text-foreground-muted mt-1">
              Browse and practice your generated question sheets
            </p>
          </div>
          <Link
            href="/create"
            className="btn-primary inline-flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Create New Quiz
          </Link>
        </div>

        {/* Content */}
        {loading !== "idle" ? (
          <div className="card-mint py-16">
            <Loader
              state={loading}
              size="sm"
              message="Fetching quizzes..."
            />
          </div>
        ) : sheetdata && sheetdata.length > 0 ? (
          <CardGrid columns={3} gap="lg">
            {sheetdata.map((sheet: TSheetItem) => (
              <Link
                key={sheet.id}
                href={`/sheet/${sheet.id}`}
                className="card-mint hover:shadow-lg hover:border-primary-300 transition-all duration-200 group block"
              >
                <div className="flex flex-col h-full">
                  {/* Topic */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary-600 transition-colors">
                      {sheet.topic}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                        difficultyColors[sheet.difficulty] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {sheet.difficulty}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-foreground-muted mb-4">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-primary-400" />
                      {sheet.questions} questions
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-primary-400" />
                      {sheet.difficulty}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="mt-auto flex items-center justify-end text-primary-500">
                    <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity mr-2">
                      Start Quiz
                    </span>
                    <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </CardGrid>
        ) : (
          <div className="card-mint text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              No quizzes yet
            </h3>
            <p className="text-foreground-muted mb-6 max-w-md mx-auto">
              Create your first AI-generated quiz and start practicing!
            </p>
            <Link
              href="/create"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Your First Quiz
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

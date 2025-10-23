"use client";
import QuestionCard from "@/components/QuestionCard";
import { LoaderPopUp } from "@/components/Loader/LoaderPopUp";
import { use, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { loading, data, refetch } = useApi(`/api/sheets?id=${id}`);
  useEffect(() => {
    refetch();
  }, []); //eslint-disable-line
  if (loading == "idle")
    return (
      <div className="max-w-3xl mx-auto p-4">
        <QuestionCard heading="Sample Question Card" data={data}></QuestionCard>
      </div>
    );
  return <LoaderPopUp state={loading} />;
}

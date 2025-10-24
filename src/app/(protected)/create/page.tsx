"use client";
import SelectBox from "@/components/select-card/select-box";
import SelectOption from "@/components/select-card/select-option";
import SelectCard from "@/components/select-card";
import React from "react";
import { useApi } from "@/hooks/useApi";
import { redirect } from "next/navigation";
import Loader from "@/components/loader";
export default function Page() {
  const [config, setConfig] = React.useState({
    level: "easy",
    topic: "javascript",
    exam: "mix",
    quantity: "10",
  });

  const [heading, setHeading] = React.useState("");
  const onChangeHandler = (key: string, value: string) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const { data, loading, refetch } = useApi("/api", {
    method: "post",
    data: {
      ...config,
      heading,
    },
  });
  return (
    <main className="gap-4 max-w-4xl w-full min-h-screen mx-auto px-3 py-8">
      <h1 className="text-center capitalize text-3xl font-semibold">
        Create Exam sheets
      </h1>
      <SelectCard>
        <SelectBox
          onChangeHandler={(value) => onChangeHandler("level", value)}
          id="level"
          name="level"
          title="difficulty level"
        >
          <SelectOption value="easy">Easy</SelectOption>
          <SelectOption value="medium">Medium</SelectOption>
          <SelectOption value="hard">Hard</SelectOption>
        </SelectBox>

        <SelectBox
          onChangeHandler={(value) => onChangeHandler("topic", value)}
          id="topic"
          name="topic"
          title="topics"
        >
          <SelectOption value="javascript">Javascript</SelectOption>
          <SelectOption value="python">Python</SelectOption>
          <SelectOption value="c">C</SelectOption>
        </SelectBox>

        <SelectBox
          onChangeHandler={(value) => onChangeHandler("exam", value)}
          id="exam"
          name="exam"
          title="exam type"
        >
          <SelectOption value="mix">Mix</SelectOption>
          <SelectOption value="mcq">MCQ</SelectOption>
          <SelectOption value="declarative">Declarative</SelectOption>
        </SelectBox>

        <SelectBox
          onChangeHandler={(value) => onChangeHandler("quantity", value)}
          id="quantity"
          name="quantity"
          title="no. of questions"
        >
          <SelectOption value="10">10</SelectOption>
          <SelectOption value="20">20</SelectOption>
          <SelectOption value="30">30</SelectOption>
        </SelectBox>
        <input
          className="border rounded-lg shadow-md p-3"
          placeholder="Enter Sheet Heading"
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
      </SelectCard>
      <pre>{data ? redirect("/") : ""}</pre>
      {loading !== "idle" ? (
        <Loader state={loading} />
      ) : (
        <button
          onClick={refetch}
          className="border rounded-lg shadow-md bg-blue-400 text-white p-4 capitalize font-semibold w-full cursor-pointer"
        >
          create exam sheet
        </button>
      )}
    </main>
  );
}

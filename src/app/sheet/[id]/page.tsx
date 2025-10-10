import axios from "axios";
import QuestionCard from "@/components/QuestionCard";
import MCQCard from "@/components/QuestionCard/MCQCard";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const res = await axios.get(`http://localhost:3000/api/sheets?id=${id}`);
    const data = res.data;
    return (
      <div className="max-w-3xl mx-auto p-4">
        <QuestionCard heading="Sample Question Card">
          {data.sheet.map(
            (item: { question: string; options: string[] }, index: number) => (
              <MCQCard
                idx={index + 1}
                key={index}
                id={`question-${index}`}
                question={item.question}
                options={item.options}
                // onClick={(id, answer) => {
                //   console.log(`Question ID: ${id}, Selected Answer: ${answer}`);
                // }}
              />
            )
          )}
        </QuestionCard>
      </div>
    );
  } catch {
    return <div>Error fetching data</div>;
  }
}

import axios from "axios";
import QuestionCard from "@/components/QuestionCard";
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
        <QuestionCard heading="Sample Question Card" data={data}></QuestionCard>
      </div>
    );
  } catch {
    return <div>Error fetching data</div>;
  }
}

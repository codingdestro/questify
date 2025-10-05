import SelectBox from "@/components/SelectCard/SelectBox";
import SelectOption from "@/components/SelectCard/SelectOption";
import SelectCard from "@/components/SelectCard";
export default function page() {
  return (
    <main className="gap-4 max-w-4xl w-full min-h-screen mx-auto bg-slate-100 px-3 py-8">
      <h1 className="text-center capitalize text-3xl font-semibold">
        Create Exam sheets
      </h1>
      <SelectCard>
        <SelectBox id="level" name="level" title="difficulty level">
          <SelectOption value="easy">Easy</SelectOption>
          <SelectOption value="medium">Medium</SelectOption>
          <SelectOption value="hard">Hard</SelectOption>
        </SelectBox>

        <SelectBox id="topic" name="topic" title="topics">
          <SelectOption value="javascript">Javascript</SelectOption>
          <SelectOption value="python">Python</SelectOption>
          <SelectOption value="c">C</SelectOption>
        </SelectBox>

        <SelectBox id="exam" name="exam" title="exam type">
          <SelectOption value="mix">Mix</SelectOption>
          <SelectOption value="mcq">MCQ</SelectOption>
          <SelectOption value="declarative">Declarative</SelectOption>
        </SelectBox>

        <SelectBox id="quantity" name="quantity" title="no. of questions">
          <SelectOption value="10">10</SelectOption>
          <SelectOption value="20">20</SelectOption>
          <SelectOption value="30">30</SelectOption>
        </SelectBox>
      </SelectCard>
      <button className="border rounded-lg shadow-md bg-blue-400 text-white p-4 capitalize font-semibold w-full cursor-pointer">
        create exam sheet
      </button>
    </main>
  );
}

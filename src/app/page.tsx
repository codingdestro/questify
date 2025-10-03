import SelectBox from "@/components/SelectCard/SelectBox";
import SelectCard from "@/components/SelectCard";
import SelectOption from "@/components/SelectCard/SelectOption";
export default function Home() {
  return (
    <SelectCard>
      <SelectBox id="topic-select" name="topics" title="select topic">
        <SelectOption value="1">javascript</SelectOption>
        <SelectOption value="2">python</SelectOption>
      </SelectBox>
      <SelectBox id="topic-level" name="levels" title="select difficulty level">
        <SelectOption value="1">easy</SelectOption>
        <SelectOption value="2">moderate</SelectOption>
        <SelectOption value="3">hard</SelectOption>
      </SelectBox>
      <SelectBox id="exam-type" name="exam-type" title="select exam type">
        <SelectOption value="1">MCQs</SelectOption>
        <SelectOption value="2">Descriptive</SelectOption>
      </SelectBox>
    </SelectCard>
  );
}

"use client";
interface Props {
  id: string;
  question: string;
  options: string[];
}
export default function MCQCard({ id, question, options }: Props) {
  return (
    <main>
      <h2>Q. {question}</h2>

      <div className="px-5">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2 my-2 select-none">
            <input
              onChange={(e) => console.log(e.target.value)}
              type="radio"
              id={`${index}`}
              name={id}
              value={option}
            />
            <label htmlFor={`${index}`}>{option}</label>
          </div>
        ))}
      </div>
    </main>
  );
}

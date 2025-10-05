"use client";
interface Props {
  id: string;
  question: string;
  options: string[];
  onClick: (id: string, answer: string) => void;
}
export default function MCQCard({ id, question, options, onClick }: Props) {
  return (
    <main>
      <h2>Q. {question}</h2>

      <div className="px-5">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-2 my-2 select-none text-gray-500"
          >
            <input
              onChange={() => onClick(id, option)}
              type="radio"
              id={`${id}-${index}`}
              name={id}
              value={option}
            />
            <label htmlFor={`${id}-${index}`}>{option}</label>
          </div>
        ))}
      </div>
    </main>
  );
}

"use client";
interface Props {
  id: string;
  question: string;
  options: string[];
  onClick: (id: string, answer: string) => void;
}
export default function MCQCard({ id, question, options, onClick }: Props) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
        Q. {question}
      </h2>

      <div className="space-y-3">
        {options.map((option, index) => (
          <label
            key={index}
            htmlFor={`${id}-${index}`}
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-all duration-200 group"
          >
            <input
              onChange={() => onClick(id, option)}
              type="radio"
              id={`${id}-${index}`}
              name={id}
              value={option}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <span className="text-gray-700 font-medium group-hover:text-blue-700 transition-colors duration-200">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

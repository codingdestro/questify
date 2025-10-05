"use client";
import React from "react";
import QuestionCard from "@/components/QuestionCard";
import MCQCard from "@/components/QuestionCard/MCQCard";

const demoquestions = [
	{
		id: "q1",
		question: "What is your favorite programming language?",
		options: ["JavaScript", "Python", "Java", "C++"],
	},
	{
		id: "q2",
		question: "Which framework do you prefer for web development?",
		options: ["React", "Angular", "Vue", "Svelte"],
	},
	{
		id: "q3",
		question: "What is your preferred code editor?",
		options: ["VSCode", "Sublime Text", "Atom", "Vim"],
	},
	{
		id: "q4",
		question: "Which version control system do you use?",
		options: ["Git", "SVN", "Mercurial", "None"],
	},
	{
		id: "q5",
		question: "What is your favorite database?",
		options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
	},
];
export default function Page() {
	const [answers, setAnswers] = React.useState<{ [key: string]: string }>({});
	const handler = (id: string, answer: string) => {
		setAnswers((prev) => ({ ...prev, [id]: answer }));
	};

	return (
		<main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
			<div className="container mx-auto px-4">
				<QuestionCard heading="Demo Questions">
					{demoquestions.map((q) => (
						<MCQCard
							onClick={(id, answer: string) => handler(id, answer)}
							key={q.id}
							id={q.id}
							question={q.question}
							options={q.options}
						/>
					))}
					<div className="flex justify-center pt-6">
						<button
							className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
							onClick={() => console.log(answers)}
						>
							Complete Quiz
						</button>
					</div>
				</QuestionCard>
			</div>
		</main>
	);
}

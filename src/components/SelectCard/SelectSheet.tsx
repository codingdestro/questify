"use client";
import Link from "next/link";

interface Props {
  id: string;
  heading: string;
  type: string;
  level: string;
  topic: string;
}
export default function SelectSheet({
  id,
  heading,
  type,
  level,
  topic,
}: Props) {
  return (
    <main>
      <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col w-80 aspect-square items-center justify-between">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">{heading}</h1>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <div className="flex justify-between items-center py-2 px-3 bg-slate-100 rounded-lg">
            <span className="font-medium text-slate-600">Type:</span>
            <span className="font-semibold text-slate-800">{type}</span>
          </div>
          <div className="flex justify-between items-center py-2 px-3 bg-slate-100 rounded-lg">
            <span className="font-medium text-slate-600">Level:</span>
            <span className="font-semibold text-slate-800">{level}</span>
          </div>
          <div className="flex justify-between items-center py-2 px-3 bg-slate-100 rounded-lg">
            <span className="font-medium text-slate-600">Topic:</span>
            <span className="font-semibold text-slate-800">{topic}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full mt-4">
          <Link
            href={"sheet/"+id}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Start Test
          </Link>
          <button className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
            Share
          </button>
        </div>
      </div>
    </main>
  );
}

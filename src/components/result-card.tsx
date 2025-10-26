"use client";
import { X } from "lucide-react";
interface Props {
  data: string;
  state: boolean;
  onClose: () => void;
}

export default function ResultCard({ data, state, onClose }: Props) {
  if (!state) return null;
  return (
    <div className="w-3xl p-5 rounded-lg border fixed top-1/3 left-1/2 -translate-x-1/2 bg-white shadow-lg z-50">
      <button
        className="rounded-full cursor-pointer p-1 text-red-500 border border-red-500"
        onClick={onClose}
      >
        <X />
      </button>
      <iframe
        srcDoc={data.toString()}
        className="w-full"
         
      ></iframe>
    </div>
  );
}

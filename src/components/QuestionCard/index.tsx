"use client";
interface Props {
  heading: string;
  children: React.ReactNode;
}
export default function Home({ heading, children }: Props) {
  return (
    <main className="w-full max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {heading}
      </h1>

      <section className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-8">
        {children}
      </section>
    </main>
  );
}

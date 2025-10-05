"use client";
interface Props {
  heading: string;
  children: React.ReactNode;
}
export default function Home({ heading, children }: Props) {
  return (
    <main className="px-3">
      <h1 className="text-2xl font-bold">{heading}</h1>

      <section className="my-10 space-y-10 p-5 border rounded-lg w-4xl">
        {children}
      </section>
    </main>
  );
}

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <section className="flex flex-col gap-4 p-4 border border-gray-200 rounded-md shadow-lg w-80">
        {/* Topic Selection Dropdown */}
        {children}
      </section>
    </main>
  );
}
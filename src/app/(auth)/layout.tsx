import Navbar from "@/components/navbar";

//a layout file can be empty or contain layout code if needed
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

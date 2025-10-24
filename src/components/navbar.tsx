import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-linear-to-r from-indigo-50 via-white to-purple-50 shadow-lg border-b border-gray-200">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            <Link href="/">
            Questify
            </Link>
          </div>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>
    </nav>
  );
};

export default Navbar;

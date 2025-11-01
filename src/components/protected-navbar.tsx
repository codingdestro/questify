"use client";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

const LINKS = [
  { href: "/home", label: "Home" },
  { href: "/create", label: "Create Quiz" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Settings" },
];

const Navbar = () => {
  return (
    <nav className="bg-linear-to-r from-indigo-50 via-white to-purple-50 shadow-lg border-b border-gray-200">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            <Link href="/">Questify</Link>
          </div>
          <div className="flex items-center gap-2">
            {LINKS.map(({ href, label }) => (
              <div key={href}>
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition text-sm"
                >
                  {label}
                </Link>
              </div>
            ))}
            <SignOutButton>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm">
                Log Out
              </button>
            </SignOutButton>
          </div>
        </nav>
      </header>
    </nav>
  );
};

export default Navbar;

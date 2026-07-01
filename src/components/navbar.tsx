"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-surface border-b border-border shadow-sm">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-linear-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent"
          >
            Questify
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/home"
              className="px-4 py-2 text-foreground-muted hover:text-primary-600 transition text-sm font-medium"
            >
              Get Started
            </Link>
            <Link href="/create" className="btn-primary text-sm">
              Create Quiz
            </Link>
          </div>
        </nav>
      </header>
    </nav>
  );
};

export default Navbar;

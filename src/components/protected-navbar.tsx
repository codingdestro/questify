"use client";
import Link from "next/link";

const LINKS = [
  { href: "/home", label: "Home" },
  { href: "/create", label: "Create Quiz" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Settings" },
];

const Navbar = () => {
  return (
    <nav className="bg-surface border-b border-border shadow-sm">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent"
          >
            Questify
          </Link>
          <div className="flex items-center gap-1">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-2 text-foreground-muted hover:text-primary-600 hover:bg-sky-50 rounded-lg transition-all text-sm font-medium"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </nav>
  );
};

export default Navbar;

import Link from "next/link";
import React from "react";

const PAGE_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  return (
    <nav className="w-full p-4 bg-primary text-white flex justify-between items-center">
      <Link href="//">
        <h2 className="text-2xl font-bold">Questify</h2>
      </Link>
      <ul className="flex space-x-4 items-center">
        {PAGE_LINKS.map((link) => (
          <li key={link.name} className="hover:underline">
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

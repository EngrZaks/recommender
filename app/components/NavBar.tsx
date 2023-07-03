"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            {/* Logo */}
            <Link href="/" className="text-white text-xl font-bold">
              Movie Recommender
            </Link>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            {/* Hamburger Icon */}
            <button
              className="text-gray-500 hover:text-white focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  className={isMenuOpen ? "hidden" : "block"}
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6H20V7H4V6ZM4 11H20V12H4V11ZM4 16H20V17H4V16Z"
                />
                <path
                  className={!isMenuOpen ? "hidden" : "block"}
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6H20V7H4V6ZM4 11H20V12H4V11ZM4 16H20V17H4V16Z"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white">
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white">
              Contact
            </Link>
          </div>

          {/* Mobile Menu */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute top-16 left-0 right-0 bg-gray-800 py-2 md:hidden`}
          >
            {/* Menu Items */}
            <ul className="flex flex-col space-y-2 px-4">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

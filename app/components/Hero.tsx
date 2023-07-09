"use client";
import { useRouter } from "next/navigation";
import React from "react";

const HeroSection = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };
  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push(`/search/${encodeURIComponent(searchTerm)}`);
  };
  return (
    <section className="bg-gray-900 text-white p-6 md:p-20 py-16 md:py-20 w-full">
      <div className="container mx-auto px-1 md:px-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Discover Your Next Favorite Movie
        </h1>
        <p className="text-lg md:text-xl mb-12">
          Get personalized movie recommendations based on your preferences.
        </p>
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search for a movie"
            value={searchTerm}
            onChange={handleChange}
            className="px-4 py-2 mr-4 w-full md:w-1/2 lg:w-1/3 text-black"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;

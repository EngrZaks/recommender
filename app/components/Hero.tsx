import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Discover Your Next Favorite Movie
        </h1>
        <p className="text-lg md:text-xl mb-12">
          Get personalized movie recommendations based on your preferences.
        </p>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search for a movie"
            className="px-4 py-2 mr-4 w-full md:w-1/2 lg:w-1/3 text-black"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

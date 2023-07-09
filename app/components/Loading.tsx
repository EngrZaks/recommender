import React from "react";

const LoadingMoviesSection = () => {
  return (
    <section className="p-6 md:p-12 py-12 bg-gray-100 w-full">
      <div className="container mx-auto px-1 md:px-20 py-10">
        <h2 className="text-2xl font-bold mb-6">Loading Movies...</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-md animate-pulse bg-gray-300 overflow-hidden shadow-md"
            >
              <div className="w-full h-48"></div>
              <div className="p-4">
                <div className="w-1/2 h-4 bg-gray-300 mb-2"></div>
                <div className="w-1/3 h-4 bg-gray-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoadingMoviesSection;

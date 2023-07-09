import React, { useEffect, useState } from "react";
import SearchResult from "@/app/components/SearchResult";
import LoadingMoviesSection from "@/app/components/Loading";
import BackButton from "@/app/components/BackButton";
import { MovieType } from "@/types/movies";

async function getData(query: string) {
  const response = await fetch(`http://localhost:5000/search?query=${query}`);
  if (!response.ok) {
    throw new Error("failed to fetch search results");
  }
  return response.json();
}

const SearchPage = async ({ params }: { params: { query: string } }) => {
  const searchResults: MovieType[] = await getData(params.query);
  //   const router = useRouter();
  if (!searchResults) {
    return <LoadingMoviesSection />;
  }
  return (
    <div className="p-6 md:p-12 py-12 bg-gray-100 w-full">
      <div className="container mx-auto px-1 md:px-20 py-10">
        <h1 className="text-2xl font-bold mb-6">
          <BackButton /> Search Results for &quot;
          {params.query}&quot;
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {searchResults.map((movie) => (
            <SearchResult key={movie.movieId} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

// return (
//   <div>
//     <h1>Search Results for &quot;{params.query}&quot;</h1>
//     {searchResults.map((movie) => (
//       <SearchResult key={movie.movieId} movie={movie} />
//     ))}
//   </div>
// );

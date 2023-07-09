"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoadingMoviesSection from "./Loading";
import MovieModal from "./MovieModal";
import { MovieType } from "@/types/movies";

const RandomMoviesSection = () => {
  const [randomMovies, setRandomMovies] = useState<MovieType[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);
  const [Loading, setLoading] = useState(false);

  const colors = [
    "bg-blue-100",
    "bg-red-100",
    "bg-yellow-100",
    "bg-green-100",
    "bg-pink-100",
    "bg-purple-100",
    "bg-orange-100",
    "bg-stone-100",
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const fetchRandomMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/random_movies");
      const data = await response.json();
      setRandomMovies(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch random movies:", error);
      setLoading(false);
    }
  };

  const fetchRecommendations = async (movieId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/recommendations/${movieId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      return [];
    }
  };

  const handleMovieClick = async (movie: MovieType) => {
    setLoading(true);
    const recommendations = await fetchRecommendations(movie.movieId);
    setLoading(false);
    setSelectedMovie({ ...movie, recommendations });
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    fetchRandomMovies();
  }, []);

  const handleShuffleClick = () => {
    fetchRandomMovies();
  };

  if (Loading) {
    return <LoadingMoviesSection />;
  }

  return (
    <>
      <section className="p-6 md:p-12 py-12 bg-gray-100 w-full">
        <div className="container mx-auto px-1 md:px-20 py-10">
          <h2 className="text-2xl font-bold mb-6">
            Which of these movies do you like?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {randomMovies.map((movie, i) => {
              const randomColor = getRandomColor();

              return (
                <div
                  key={i}
                  className={`rounded-md overflow-hidden shadow-md ${randomColor} hover:opacity-75 transition-all cursor-pointer duration-200`}
                  onClick={() => handleMovieClick(movie)}
                >
                  <Image
                    src={movie.image || "/placeholder.jpg"}
                    alt={movie.title}
                    height={1000}
                    width={750}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
                    <p className="text-sm">{movie.year}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="mt-6 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleShuffleClick}
          >
            Shuffle Movies
          </button>
        </div>
      </section>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default RandomMoviesSection;

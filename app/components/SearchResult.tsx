"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import MovieModal from "./MovieModal";
import { MovieType } from "@/types/movies";

interface SearchResultProps {
  movie: MovieType;
}

const SearchResult = ({ movie }: SearchResultProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState<MovieType | null>(
    null
  );
  const [movieDetails, setmovieDetails] = useState<MovieType>();
  const [movieLoading, setMovieLoading] = useState(false);
  const fetchMovieDetails = async (movieId: number) => {
    setMovieLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/movies/${movieId}`);
      const data = await response.json();
      setMovieLoading(false);
      return data;
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
      setMovieLoading(false);
      return null;
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

  useEffect(() => {
    const fetcMovies = async () => {
      const moviedetails = await fetchMovieDetails(movie.movieId);
      setmovieDetails(moviedetails);
    };
    fetcMovies();
  }, [movie.movieId]);

  const handleMovieClick = async () => {
    setLoading(true);
    const recommendations = await fetchRecommendations(movie.movieId);
    setRecommendedMovies({ ...movie, recommendations });
    console.log(recommendedMovies);

    setLoading(false);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      {Loading && (
        <div className="p-5 bg-orange-100 text-center content-center items-center w-full h-full opacity-20">
          <h5>Loading...</h5>
        </div>
      )}
      <div
        className="rounded-md overflow-hidden shadow-md cursor-pointer"
        onClick={handleMovieClick}
      >
        <Image
          src={movieDetails?.image || "/placeholder.jpg"}
          alt={movie.title}
          height={1000}
          width={750}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
          <p className="text-sm">{movie.genres}</p>
        </div>
      </div>
      {modalOpen && (
        <MovieModal movie={recommendedMovies} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default SearchResult;

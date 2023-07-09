import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MovieType } from "@/types/movies";
import axios from "@/configs/requests";
interface MovieModalProps {
  movie: MovieType | null;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const [recommendedMovies, setRecommendedMovies] = useState<
    {
      movieId: number;
      title: string;
      genres: string;
      image: string;
    }[]
  >([]);
  const [loading, setloading] = useState(false);

  const fetchMovieDetails = async (movieId: number) => {
    try {
      const response = await axios.get(`/movies/${movieId}`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      const recommendations = movie?.recommendations || [];
      if (!Array.isArray(recommendations)) {
        setRecommendedMovies([]);
        return;
      }
      setloading(true);
      const recommendedMovies = await Promise.all(
        recommendations.map(async (recommendation) => {
          const details = await fetchMovieDetails(recommendation.movieId);
          return {
            ...details,
            score: recommendation.score,
          };
        })
      );
      setRecommendedMovies(recommendedMovies);
      setloading(false);
      //   console.log(recommendations);
    };

    fetchRecommendedMovies();
  }, [movie?.recommendations]);
  if (loading)
    return (
      <>
        <div
          className="fixed z-40 bg-black opacity-50"
          style={{ width: "100vw", height: "100vh" }}
        ></div>
        <div className="fixed inset-0  z-50 px-5">
          <div className="bg-white w-full max-w-4xl h-5/6 rounded-md shadow-lg overflow-auto flex items-center justify-center">
            <h3 className="text-lg">Fetching Recommendations...</h3>
          </div>{" "}
        </div>{" "}
      </>
    );
  return (
    <>
      <div
        className="fixed z-40 bg-black opacity-50"
        style={{ width: "100vw", height: "100vh" }}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 px-5">
        <div className="bg-white w-full max-w-4xl h-5/6 rounded-md shadow-lg overflow-auto relative">
          <div className="p-4">
            <div className="sticky top-0 z-50 bg-white py-2 px-4 mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">{movie?.title}</h2>
              <button
                className="text-black text-lg hover:text-gray-800"
                onClick={onClose}
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <div className="sticky top-14 z-50 hidden md:block">
                  <div className=" w-full h-80 relative object-cover">
                    <Image
                      src={movie?.image || "/placeholder.jpg"}
                      alt={movie?.title as string}
                      fill
                      className="rounded-md"
                    />
                  </div>
                </div>
                <p className="text-sm mt-2">{movie?.genres}</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-lg font-bold mb-2">Recommended Movies</h3>
                {recommendedMovies.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {recommendedMovies.map((recommendedMovie) => (
                      <div
                        key={recommendedMovie.movieId}
                        className="flex flex-col items-center p-2 bg-gray-100 rounded-md"
                      >
                        <div className="w-full h-40 relative object-cover mb-2">
                          <Image
                            src={recommendedMovie.image || "/placeholder.jpg"}
                            alt={recommendedMovie.title}
                            fill
                            className="rounded-md"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold">
                            {recommendedMovie.title}
                          </p>
                          <p className="text-xs text-gray-700">
                            {recommendedMovie.genres}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p>No recommended movies for {movie?.title} right now</p>
                    <p>
                      Continue exploring other movies to find more
                      recommendations
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieModal;

import React from "react";

const RandomMoviesSection = () => {
  const movies = [
    {
      movieId: 1,
      title: "Toy Story (1995)",
      genres: "Adventure|Animation|Children|Comedy|Fantasy",
      image: "",
    },
    {
      movieId: 2,
      title: "Jumanji (1995)",
      genres: "Adventure|Children|Fantasy",
      image: "",
    },
    {
      movieId: 3,
      title: "Grumpier Old Men (1995)",
      genres: "Comedy|Romance",
      image: "",
    },
    {
      movieId: 4,
      title: "Waiting to Exhale (1995)",
      genres: "Comedy|Drama|Romance",
      image: "",
    },
    {
      movieId: 5,
      title: "Father of the Bride Part II (1995)",
      image: "",
      genres: "Comedy",
    },
    {
      movieId: 6,
      title: "Heat (1995)",
      genres: "Action|Crime|Thriller",
      image: "",
    },
  ];

  const colors = [
    "bg-blue-200",
    "bg-red-200",
    "bg-yellow-200",
    "bg-green-200",
    "bg-pink-200",
    "bg-purple-200",
    "bg-orange-200",
    "bg-stone-200",
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">
          Which of these movies do you like?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.movieId}
              className={`rounded overflow-hidden shadow-md hover:bg-gray-700 ${getRandomColor()}`}
            >
              <img
                src={movie.image || "placeholder.jpg"}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
                <p className="text-sm">{movie.genres}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RandomMoviesSection;

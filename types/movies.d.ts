export type MovieType = {
  movieId: number;
  title: string;
  genres?: string;
  image: string; year?:string
  recommendations?: {
    movieId: number;
    title: string;
    genres: string;
    score: number;
  }[];
};

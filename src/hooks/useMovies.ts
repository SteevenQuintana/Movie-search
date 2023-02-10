import { useState } from "react";
import { Movie } from "../components/MoviesList";
import { searchMovies } from "../services/movies";

interface Query {
  query: string;
}

export const useMovies = ({ query }: Query) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMovies = async () => {
    try {
      setIsLoading(true);
      const newMovies = await searchMovies({ query });
      setMovies(newMovies);
    } finally {
      setIsLoading(false);
    }
  };

  return { movies, getMovies, isLoading };
};

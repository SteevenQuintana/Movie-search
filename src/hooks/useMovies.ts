import { useRef, useState, useMemo } from "react";
import { Movie } from "../components/MoviesList";
import { searchMovies } from "../services/movies";

interface Query {
  query: string;
  sort: boolean;
}

export const useMovies = ({ query, sort }: Query) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const previusQuery = useRef(query);

  const getMovies = useMemo(() => {
    return async (query: string) => {
      if (query === previusQuery.current) return;
      try {
        setIsLoading(true);
        previusQuery.current = query;
        const newMovies = await searchMovies({ query });
        setMovies(newMovies);
      } finally {
        setIsLoading(false);
      }
    };
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, isLoading };
};

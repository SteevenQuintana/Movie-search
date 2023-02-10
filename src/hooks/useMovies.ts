import withResults from "../mocks/with-results.json";
import withoutResults from "../mocks/no-results.json";
import { useState } from "react";

interface Search {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface Response {
  Search: Search[];
  totalResults: string;
  Response: string;
}

interface Reject {
  Response: string;
  Error: string;
}
interface Query {
  query: string;
}

export const useMovies = ({ query }: Query) => {
  const [responseMovies, setResponseMovies] = useState<Response | Reject>({
    Response: "False",
    Error: "No results found",
  });

  const moviesResponse = (responseMovies as Response).Search;

  const mappedMovies = moviesResponse?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    image: movie.Poster,
  }));

  const getMovies = () => {
    if (query) {
      setResponseMovies(withResults);
      fetch(`https://www.omdbapi.com/?apikey=e73cfdb4&s=${query}`)
        .then((response) => response.json())
        .then((json) => setResponseMovies(json));
    } else {
      setResponseMovies(withoutResults);
    }
  };

  return { movies: mappedMovies, getMovies };
};

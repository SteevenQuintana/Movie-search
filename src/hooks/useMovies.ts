import responseMovie from "../mocks/with-results.json";
import withoutResults from "../mocks/no-results.json";

export const useMovies = () => {
  const moviesResponse = responseMovie.Search;

  const mappedMovies = moviesResponse?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    image: movie.Poster,
  }));

  return { movies: mappedMovies };
};

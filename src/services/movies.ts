interface Query {
  query: string;
}
const API_KEY = "e73cfdb4";

export const searchMovies = async ({ query }: Query) => {
  if (query === "") return null;
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const json = await response.json();

    const moviesResponse = json.Search;

    return moviesResponse?.map((movie: any) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster,
    }));
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

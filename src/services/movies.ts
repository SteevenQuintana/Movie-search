interface Query {
  query: string;
}
const { VITE_API_KEY, VITE_BASE_URL } = import.meta.env;

export const searchMovies = async ({ query }: Query) => {
  if (query === "") return null;
  try {
    const response = await fetch(
      `${VITE_BASE_URL}?apikey=${VITE_API_KEY}&s=${query}`
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

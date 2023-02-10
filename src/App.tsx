import { useEffect, useRef, useState } from "react";
import "./App.css";

import { Movies } from "./components/MoviesList";
import { useMovies } from "./hooks/useMovies";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const isFisrtInput = useRef(true);

  useEffect(() => {
    if (isFisrtInput.current) {
      isFisrtInput.current = query === "";
      return;
    }

    if (query.trim() === "") {
      setError("Can't search empty movie");
      return;
    }

    if (query.length < 3) {
      setError("search must have at least 3 characters");
      return;
    }

    setError(null);
  }, [query]);

  return { query, setQuery, error };
};

function App() {
  const { query, setQuery, error } = useSearch();
  const { movies, getMovies, isLoading } = useMovies({ query });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getMovies();
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    if (newQuery.startsWith(" ")) return;
    setQuery(newQuery);
  };

  return (
    <div className="page">
      <header>
        <h1>Find a movie</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            name="query"
            value={query}
            onChange={inputChangeHandler}
            type="text"
            placeholder="Avengers, Star Wars, The Matrix..."
          />
          <button type="submit">Search</button>
        </form>
        {error && <p style={{ color: "red" }}> {error}</p>}
      </header>

      <main>{isLoading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;

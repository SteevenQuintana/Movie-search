import { useEffect, useRef, useState } from "react";
import "./App.css";

import { Movies } from "./components/MoviesList";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";

function App() {
  const [sort, setSort] = useState(false);
  const { query, setQuery, error } = useSearch();
  const { movies, getMovies, isLoading } = useMovies({ query, sort });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getMovies(query);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    if (newQuery.startsWith(" ")) return;
    setQuery(newQuery);
  };

  useEffect(() => {
    if (query.trim() === "") return;
    const timer = setTimeout(() => {
      getMovies(query);
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setQuery("Movies...");
  }, []);

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

          <button type="submit">🔍 Search</button>
          <button
            disabled={movies?.length === 0}
            onClick={handleSort}
            type="button"
          >
            {!sort ? "Sort by title" : "Sort by default"}
          </button>
        </form>
        {error && <p style={{ color: "red" }}> {error}</p>}
      </header>

      <main>{isLoading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;

import "./App.css";

import { Movies } from "./components/MoviesList";
import { useMovies } from "./hooks/useMovies";

function App() {
  const { movies } = useMovies();

  return (
    <div className="page">
      <header>
        <h1>Find a movie</h1>
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input type="text" placeholder="Avengers, Star Wars, The Matrix..." />
          <button type="submit">Search</button>
        </form>
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;

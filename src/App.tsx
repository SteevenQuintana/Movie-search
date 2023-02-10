import "./App.css";
import responseMovie from "./mocks/with-results.json";
import withoutResults from "./mocks/no-results.json";

function App() {
  const movies = responseMovie.Search;
  const hasMovies = movies?.length > 0;
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
        {hasMovies ? (
          <ul>
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <img src={movie.Poster} alt={movie.Title} />
              </li>
            ))}
          </ul>
        ) : (
          <p>no se encontraron resultados para esta búsqueda</p>
        )}
      </main>
    </div>
  );
}

export default App;

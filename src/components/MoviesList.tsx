import React from "react";

interface Movie {
  id: string;
  title: string;
  year: string;
  image: string;
}

interface Movies {
  movies: Movie[];
}

const MoviesList = ({ movies }: Movies) => (
  <ul>
    {movies.map((movie) => (
      <li key={movie.id}>
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
        <img src={movie.image} alt={movie.title} />
      </li>
    ))}
  </ul>
);

const NoResults = () => <p>no se encontraron resultados para esta búsqueda</p>;

export const Movies = ({ movies }: Movies) => {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <MoviesList movies={movies} /> : <NoResults />;
};

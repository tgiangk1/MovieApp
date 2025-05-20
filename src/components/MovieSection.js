import React from 'react';
import MovieCard from './MovieCard';

function MovieSection({ title, movies }) {
  return (
    <section style={{ margin: '32px 0' }}>
      <h2 style={{ color: '#ff512f', marginBottom: 16 }}>{title}</h2>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieSection;
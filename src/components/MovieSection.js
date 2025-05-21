import React from 'react';
import MovieCard from './MovieCard';

function MovieSection({ title, movies }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ marginBottom: 20 }}>{title}</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 20
      }}>
        {movies && movies.map((movie, index) => (
          <MovieCard 
            key={`${movie.slug}-${index}`}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieSection;
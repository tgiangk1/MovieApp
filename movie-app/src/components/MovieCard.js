import React from 'react';
import { Link } from 'react-router-dom';

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const DEFAULT_POSTER = "https://via.placeholder.com/180x270?text=No+Image";

function MovieCard({ movie }) {
  const poster = movie.poster_path ? IMAGE_BASE + movie.poster_path : DEFAULT_POSTER;

  return (
    <div className="movie-card">
      <Link to={`/phim/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img
          src={poster}
          alt={movie.title}
          onError={e => { e.target.onerror = null; e.target.src = DEFAULT_POSTER; }}
        />
        <h3>{movie.title}</h3>
      </Link>
    </div>
  );
}

export default MovieCard;
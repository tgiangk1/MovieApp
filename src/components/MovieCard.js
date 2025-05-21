import React from 'react';
import { Link } from 'react-router-dom';

const DEFAULT_POSTER = "https://via.placeholder.com/180x270?text=No+Image";

function MovieCard({ movie }) {
  return (
    <div className="movie-card" style={{
      width: '180px',
      margin: '10px',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
      backgroundColor: '#fff'
    }}>
      <Link to={`/phim/${movie.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img
          src={movie.thumb_url || DEFAULT_POSTER}
          alt={movie.name}
          style={{
            width: '100%',
            height: '270px',
            objectFit: 'cover'
          }}
          onError={e => { e.target.onerror = null; e.target.src = DEFAULT_POSTER; }}
        />
        <div style={{ padding: '10px' }}>
          <h3 style={{
            margin: 0,
            fontSize: '1rem',
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {movie.name}
          </h3>
          {movie.episode_current && (
            <p style={{
              margin: '5px 0 0',
              fontSize: '0.9rem',
              color: '#666'
            }}>
              Tập {movie.episode_current}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
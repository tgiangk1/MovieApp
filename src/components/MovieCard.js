import React from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_POSTER = "https://via.placeholder.com/240x360?text=No+Image";
const IMAGE_BASE_URL = "https://img.ophim.live/uploads/movies/";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/phim/${movie.slug}`);
  };

  const getImageUrl = (url) => {
    if (!url) return DEFAULT_POSTER;
    if (url.startsWith('http')) return url;
    return `${IMAGE_BASE_URL}${url}`;
  };

  return (
    <div 
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        backgroundColor: '#fff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
    >
      <div style={{ position: 'relative', paddingTop: '150%' }}>
        <img
          src={getImageUrl(movie.poster_url)}
          alt={movie.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = DEFAULT_POSTER;
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8))',
          opacity: 0,
          transition: 'opacity 0.3s ease'
        }} />
      </div>
      <div style={{ 
        padding: '12px',
        position: 'relative',
        zIndex: 1
      }}>
        <h3 style={{ 
          margin: 0,
          fontSize: '16px',
          fontWeight: '600',
          color: '#333',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineHeight: '1.4',
          height: '44px'
        }}>
          {movie.name}
        </h3>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '8px'
        }}>
          <p style={{ 
            margin: 0,
            fontSize: '14px',
            color: '#666'
          }}>
            {movie.year}
          </p>
          {movie.episode_current && (
            <span style={{
              padding: '2px 8px',
              backgroundColor: '#ff512f',
              color: 'white',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              Tập {movie.episode_current}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
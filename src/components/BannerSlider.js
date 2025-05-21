import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IMAGE_BASE_URL = "https://img.ophim.live/uploads/movies/";

function BannerSlider({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [movies.length]);

  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/1920x1080?text=No+Image";
    if (url.startsWith('http')) return url;
    return `${IMAGE_BASE_URL}${url}`;
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
      {movies.map((movie, index) => (
        <div
          key={movie.slug}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            cursor: 'pointer'
          }}
          onClick={() => navigate(`/phim/${movie.slug}`)}
        >
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))'
          }}>
            <img
              src={getImageUrl(movie.thumb_url)}
              alt={movie.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/1920x1080?text=No+Image";
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '40px',
              color: 'white',
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '2.5rem',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
                {movie.name}
              </h2>
              <p style={{
                margin: '10px 0 0',
                fontSize: '1.2rem',
                opacity: 0.9
              }}>
                {movie.origin_name}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px'
      }}>
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: index === currentIndex ? '#ff512f' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default BannerSlider;
import React, { useEffect, useState } from 'react';
import { getMovieDetail } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";
const DEFAULT_POSTER = "https://via.placeholder.com/240x360?text=No+Image";
const YOUTUBE_BASE = "https://www.youtube.com/embed/";

function MovieDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetail(slug);
        setMovie(data);
      } catch (err) {
        setError('Không thể tải thông tin phim. Vui lòng thử lại sau.');
        console.error('Error fetching movie:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [slug]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <div>Đang tải chi tiết phim...</div>
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>
      <button 
        onClick={() => navigate('/')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#ff512f',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Quay lại trang chủ
      </button>
    </div>
  );

  if (!movie) return null;

  const trailer = movie.videos?.find(video => video.type === 'Trailer');

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      {movie.backdrop_path && (
        <img
          src={BACKDROP_BASE + movie.backdrop_path}
          alt={movie.title}
          style={{ width: '100%', borderRadius: 12, marginBottom: 24, maxHeight: 400, objectFit: 'cover' }}
        />
      )}
      
      {trailer && (
        <div style={{ marginBottom: 24 }}>
          <h3>Trailer</h3>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
            <iframe
              src={`${YOUTUBE_BASE}${trailer.key}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: 12
              }}
              allowFullScreen
              title="Movie Trailer"
            />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <img
          src={movie.poster_path ? IMAGE_BASE + movie.poster_path : DEFAULT_POSTER}
          alt={movie.title}
          style={{ width: 240, borderRadius: 12 }}
        />
        <div style={{ flex: 1, minWidth: 300 }}>
          <h2 style={{ marginTop: 0 }}>{movie.title}</h2>
          <p><b>Ngày phát hành:</b> {movie.release_date}</p>
          <p><b>Điểm TMDB:</b> {movie.vote_average} ({movie.vote_count} đánh giá)</p>
          <p><b>Thể loại:</b> {movie.genres.map(g => g.name).join(', ')}</p>
          <p><b>Thời lượng:</b> {movie.runtime} phút</p>
          <p><b>Mô tả:</b> {movie.overview}</p>
          
          {movie.homepage && (
            <a 
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#ff512f',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px'
              }}
            >
              Xem phim
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail; 
import React, { useEffect, useState } from 'react';
import { getMovieDetail } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

const DEFAULT_POSTER = "https://via.placeholder.com/240x360?text=No+Image";

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

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      {movie.thumb_url && (
        <img
          src={movie.thumb_url}
          alt={movie.name}
          style={{ width: '100%', borderRadius: 12, marginBottom: 24, maxHeight: 400, objectFit: 'cover' }}
        />
      )}

      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <img
          src={movie.poster_url || DEFAULT_POSTER}
          alt={movie.name}
          style={{ width: 240, borderRadius: 12 }}
        />
        <div style={{ flex: 1, minWidth: 300 }}>
          <h2 style={{ marginTop: 0 }}>{movie.name}</h2>
          <p><b>Tên gốc:</b> {movie.origin_name}</p>
          <p><b>Năm sản xuất:</b> {movie.year}</p>
          <p><b>Thể loại:</b> {movie.category?.map(c => c.name).join(', ')}</p>
          <p><b>Quốc gia:</b> {movie.country?.map(c => c.name).join(', ')}</p>
          <p><b>Diễn viên:</b> {movie.actor?.join(', ')}</p>
          <p><b>Đạo diễn:</b> {movie.director?.join(', ')}</p>
          <p><b>Mô tả:</b> {movie.content}</p>
          
          {movie.videos && movie.videos.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <h3>Tập phim</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {movie.videos.map((episode) => (
                  <a
                    key={episode.slug}
                    href={episode.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#ff512f',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '5px',
                      display: 'inline-block'
                    }}
                  >
                    Tập {episode.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail; 
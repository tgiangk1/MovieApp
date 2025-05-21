import React, { useEffect, useState } from 'react';
import { getMovieDetail } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

const DEFAULT_POSTER = "https://via.placeholder.com/240x360?text=No+Image";
const DEFAULT_THUMBNAIL = "https://via.placeholder.com/1280x720?text=No+Thumbnail";

function MovieDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getMovieDetail(slug);
        console.log('Movie data:', response);
        
        if (response) {
          setMovie(response);
          
          // Set first episode as default if available
          if (response.videos && response.videos.length > 0) {
            const firstServer = response.videos[0];
            if (firstServer.server_data && firstServer.server_data.length > 0) {
              setSelectedEpisode(firstServer.server_data[0]);
            }
          }
        } else {
          throw new Error('Invalid movie data');
        }
      } catch (err) {
        setError('Không thể tải thông tin phim. Vui lòng thử lại sau.');
        console.error('Error fetching movie:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [slug]);

  const handlePlayVideo = () => {
    if (selectedEpisode && selectedEpisode.link_embed) {
      console.log('Playing video:', selectedEpisode.link_embed);
      setIsPlaying(true);
    } else {
      console.error('No video link available');
    }
  };

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
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      {selectedEpisode && (
        <div style={{ marginBottom: 24 }}>
          <div style={{
            width: '100%',
            height: '600px',
            backgroundColor: '#000',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {!isPlaying ? (
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onClick={handlePlayVideo}
              >
                <img
                  src={movie.thumb_url || DEFAULT_THUMBNAIL}
                  alt={`${movie.name} - Tập ${selectedEpisode.name}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_THUMBNAIL;
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: 0,
                    height: 0,
                    borderTop: '20px solid transparent',
                    borderBottom: '20px solid transparent',
                    borderLeft: '30px solid white',
                    marginLeft: '5px'
                  }} />
                </div>
              </div>
            ) : (
              <div style={{ width: '100%', height: '100%' }}>
                <iframe
                  src={selectedEpisode.link_embed}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title={`${movie.name} - Tập ${selectedEpisode.name}`}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <div style={{ width: 240, flexShrink: 0 }}>
          <img
            src={movie.poster_url || DEFAULT_POSTER}
            alt={movie.name}
            style={{
              width: '100%',
              height: '360px',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_POSTER;
            }}
          />
        </div>
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
                {movie.videos[0].server_data.map((episode, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedEpisode(episode);
                      setIsPlaying(false);
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: selectedEpisode === episode ? '#ff512f' : '#f0f0f0',
                      color: selectedEpisode === episode ? 'white' : '#333',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Tập {episode.name}
                  </button>
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
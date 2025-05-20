import React, { useEffect, useState } from 'react';
import { getMovieDetail } from '../api';
import { useParams } from 'react-router-dom';

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";
const DEFAULT_POSTER = "https://via.placeholder.com/240x360?text=No+Image";

function MovieDetail() {
  const { slug } = useParams(); // slug ở đây là id phim
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetail(slug).then(setMovie);
  }, [slug]);

  if (!movie) return <div>Đang tải chi tiết phim...</div>;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      {movie.backdrop_path && (
        <img
          src={BACKDROP_BASE + movie.backdrop_path}
          alt={movie.title}
          style={{ width: '100%', borderRadius: 12, marginBottom: 24, maxHeight: 400, objectFit: 'cover' }}
        />
      )}
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <img
          src={movie.poster_path ? IMAGE_BASE + movie.poster_path : DEFAULT_POSTER}
          alt={movie.title}
          style={{ width: 240, borderRadius: 12 }}
        />
        <div>
          <h2>{movie.title}</h2>
          <p><b>Ngày phát hành:</b> {movie.release_date}</p>
          <p><b>Điểm TMDB:</b> {movie.vote_average} ({movie.vote_count} đánh giá)</p>
          <p><b>Thể loại:</b> {movie.genres.map(g => g.name).join(', ')}</p>
          <p><b>Mô tả:</b> {movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail; 
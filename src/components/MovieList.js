import React, { useEffect, useState } from 'react';
import { getMovies } from '../api';
import MovieCard from './MovieCard';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    getMovies(page)
      .then(data => {
        setMovies(data.items);
        setTotalPages(data.totalPages);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <div style={{textAlign:'center',margin:'40px'}}>Đang tải phim...</div>;
  if (error) return <div style={{textAlign:'center',margin:'40px'}}>Lỗi tải phim!</div>;

  return (
    <>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Trước</button>
        {[...Array(Math.min(totalPages, 10))].map((_, idx) => (
          <button
            key={idx + 1}
            className={page === idx + 1 ? 'active' : ''}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Sau</button>
      </div>
    </>
  );
}

export default MovieList; 
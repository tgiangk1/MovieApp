import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BannerSlider from './components/BannerSlider';
import MovieSection from './components/MovieSection';
import MovieDetail from './components/MovieDetail';
import Footer from './components/Footer';
import { getTrending, getMovies, getTVShows } from './api';
import './App.css';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Đã xảy ra lỗi</h2>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff512f',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Tải lại trang
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function Home() {
  const [trending, setTrending] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingData, moviesData, tvShowsData] = await Promise.all([
          getTrending(),
          getMovies(),
          getTVShows()
        ]);
        setTrending(trendingData.items || []);
        setMovies(moviesData.items || []);
        setTVShows(tvShowsData.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: 'red' }}>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff512f',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Tải lại trang
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="container" style={{maxWidth:1200,margin:'0 auto',padding:'0 16px'}}>
        <BannerSlider movies={trending} />
        <MovieSection title="Phim mới cập nhật" movies={movies} />
        <MovieSection title="Phim bộ nổi bật" movies={tvShows} />
      </div>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phim/:slug" element={<MovieDetail />} />
        </Routes>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
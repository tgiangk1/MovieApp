import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BannerSlider from './components/BannerSlider';
import MovieSection from './components/MovieSection';
import MovieDetail from './components/MovieDetail';
import Footer from './components/Footer';
import { getTrending, getMovies, getTVShows } from './api';
import './App.css';

function Home() {
  const [trending, setTrending] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);

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
      }
    };
    fetchData();
  }, []);

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
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phim/:slug" element={<MovieDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
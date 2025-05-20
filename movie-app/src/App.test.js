import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';

function App() {
  return (
    <Router>
      <div style={{ padding: 24 }}>
        <h1 style={{ textAlign: 'center' }}>Website Xem Phim ReactJS (Ophim API)</h1>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/phim/:slug" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

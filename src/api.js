import axios from 'axios';

const API_KEY = '30c58524d39e6449614788409480e6da';
const API_BASE = 'https://api.themoviedb.org/3';

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

const handleError = (error) => {
  console.error('API Error:', error);
  throw error;
};

export const getTrending = async () => {
  try {
    const res = await axios.get(`${API_BASE}/trending/movie/week`, {
      params: { language: 'vi-VN' },
      headers
    });
    return res.data.results;
  } catch (error) {
    handleError(error);
  }
};

export const getMovies = async (page = 1) => {
  try {
    const res = await axios.get(`${API_BASE}/movie/now_playing`, {
      params: { language: 'vi-VN', page },
      headers
    });
    return { items: res.data.results, totalPages: res.data.total_pages };
  } catch (error) {
    handleError(error);
  }
};

export const getTVShows = async (page = 1) => {
  try {
    const res = await axios.get(`${API_BASE}/tv/on_the_air`, {
      params: { language: 'vi-VN', page },
      headers
    });
    return { items: res.data.results, totalPages: res.data.total_pages };
  } catch (error) {
    handleError(error);
  }
};

export const getMovieDetail = async (id) => {
  try {
    const [movieRes, videosRes] = await Promise.all([
      axios.get(`${API_BASE}/movie/${id}`, {
        params: { language: 'vi-VN' },
        headers
      }),
      axios.get(`${API_BASE}/movie/${id}/videos`, {
        params: { language: 'vi-VN' },
        headers
      })
    ]);
    
    return {
      ...movieRes.data,
      videos: videosRes.data.results
    };
  } catch (error) {
    handleError(error);
  }
};
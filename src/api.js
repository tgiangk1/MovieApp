import axios from 'axios';

const API_KEY = '30c58524d39e6449614788409480e6da'; // Thay bằng API key của bạn
const API_BASE = 'https://api.themoviedb.org/3';

const handleError = (error) => {
  console.error('API Error:', error);
  throw error;
};

export const getTrending = async () => {
  try {
    const res = await axios.get(`${API_BASE}/trending/movie/week`, {
      params: { api_key: API_KEY, language: 'vi-VN' }
    });
    return res.data.results;
  } catch (error) {
    handleError(error);
  }
};

export const getMovies = async (page = 1) => {
  try {
    const res = await axios.get(`${API_BASE}/movie/now_playing`, {
      params: { api_key: API_KEY, language: 'vi-VN', page }
    });
    return { items: res.data.results, totalPages: res.data.total_pages };
  } catch (error) {
    handleError(error);
  }
};

export const getTVShows = async (page = 1) => {
  try {
    const res = await axios.get(`${API_BASE}/tv/on_the_air`, {
      params: { api_key: API_KEY, language: 'vi-VN', page }
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
        params: { api_key: API_KEY, language: 'vi-VN' }
      }),
      axios.get(`${API_BASE}/movie/${id}/videos`, {
        params: { api_key: API_KEY, language: 'vi-VN' }
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
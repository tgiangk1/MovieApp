import axios from 'axios';

const API_KEY = '30c58524d39e6449614788409480e6da'; // Thay bằng API key của bạn
const API_BASE = 'https://api.themoviedb.org/3';

export const getTrending = async () => {
  const res = await axios.get(`${API_BASE}/trending/movie/week`, {
    params: { api_key: API_KEY, language: 'vi-VN' }
  });
  return res.data.results;
};

export const getMovies = async (page = 1) => {
  const res = await axios.get(`${API_BASE}/movie/now_playing`, {
    params: { api_key: API_KEY, language: 'vi-VN', page }
  });
  return { items: res.data.results, totalPages: res.data.total_pages };
};

export const getTVShows = async (page = 1) => {
  const res = await axios.get(`${API_BASE}/tv/on_the_air`, {
    params: { api_key: API_KEY, language: 'vi-VN', page }
  });
  return { items: res.data.results, totalPages: res.data.total_pages };
};

export const getMovieDetail = async (id) => {
  const res = await axios.get(`${API_BASE}/movie/${id}`, {
    params: { api_key: API_KEY, language: 'vi-VN' }
  });
  return res.data;
};
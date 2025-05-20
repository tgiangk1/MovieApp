import axios from 'axios';

const API_BASE = 'https://ophim1.com';

const handleError = (error) => {
  console.error('API Error:', error);
  throw error;
};

export const getTrending = async () => {
  try {
    const res = await axios.get(`${API_BASE}/danh-sach/phim-moi-cap-nhat`);
    return res.data.items;
  } catch (error) {
    handleError(error);
  }
};

export const getMovies = async (page = 1) => {
  try {
    const res = await axios.get(`${API_BASE}/danh-sach/phim-le`, {
      params: { page }
    });
    return { 
      items: res.data.items,
      totalPages: Math.ceil(res.data.total / res.data.per_page)
    };
  } catch (error) {
    handleError(error);
  }
};

export const getTVShows = async (page = 1) => {
  try {
    const res = await axios.get(`${API_BASE}/danh-sach/phim-bo`, {
      params: { page }
    });
    return { 
      items: res.data.items,
      totalPages: Math.ceil(res.data.total / res.data.per_page)
    };
  } catch (error) {
    handleError(error);
  }
};

export const getMovieDetail = async (slug) => {
  try {
    const res = await axios.get(`${API_BASE}/phim/${slug}`);
    return {
      ...res.data.movie,
      videos: res.data.episodes
    };
  } catch (error) {
    handleError(error);
  }
};
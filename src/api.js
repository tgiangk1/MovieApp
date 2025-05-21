import axios from 'axios';

const API_BASE = 'https://ophim1.com';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const handleError = (error) => {
  if (error.response) {
    console.error('API Error:', error.response.data);
    throw new Error(error.response.data.message || 'API request failed');
  } else if (error.request) {
    console.error('Network Error:', error.request);
    throw new Error('Network error - please check your connection');
  } else {
    console.error('Error:', error.message);
    throw error;
  }
};

export const getTrending = async (page = 1) => {
  try {
    const res = await api.get('/danh-sach/phim-moi-cap-nhat', {
      params: { page }
    });
    return { 
      items: res.data.items || [],
      totalPages: Math.ceil((res.data.pagination?.totalItems || 0) / (res.data.pagination?.totalItemsPerPage || 1))
    };
  } catch (error) {
    handleError(error);
  }
};

export const getMovies = async (page = 1) => {
  try {
    const res = await api.get('/danh-sach/phim-le', {
      params: { page }
    });
    return { 
      items: res.data.items || [],
      totalPages: Math.ceil((res.data.pagination?.totalItems || 0) / (res.data.pagination?.totalItemsPerPage || 1))
    };
  } catch (error) {
    handleError(error);
  }
};

export const getTVShows = async (page = 1) => {
  try {
    const res = await api.get('/danh-sach/phim-bo', {
      params: { page }
    });
    return { 
      items: res.data.items || [],
      totalPages: Math.ceil((res.data.pagination?.totalItems || 0) / (res.data.pagination?.totalItemsPerPage || 1))
    };
  } catch (error) {
    handleError(error);
  }
};

export const getMovieDetail = async (slug) => {
  try {
    const res = await api.get(`/phim/${slug}`);
    if (!res.data.movie) {
      throw new Error('Movie not found');
    }
    return {
      ...res.data.movie,
      videos: res.data.episodes || []
    };
  } catch (error) {
    handleError(error);
  }
};
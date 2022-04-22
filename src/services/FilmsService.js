import api from './api';
import { API_ROUTES } from './config';

const getOne = (id) => api(`${API_ROUTES.films}/${id}`);

const getAll = async (queryParams) => {
  const { data, page, limit, size } = await api(API_ROUTES.films, { queryParams });

  return {
    films: data,
    page: +page,
    pages: Math.ceil(size / limit),
  };
};

const addFilm = (film) =>
  api(API_ROUTES.films, {
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify(film),
    },
  });

const removeFilm = (id) =>
  api(`${API_ROUTES.films}/${id}`, {
    fetchOptions: {
      method: 'DELETE',
    },
  });

const updateFilm = (film) =>
  api(`${API_ROUTES.films}/${film.id}`, {
    fetchOptions: {
      method: 'PUT',
      body: JSON.stringify(film),
    },
  });

export const FilmsService = {
  getOne,
  getAll,
  addFilm,
  removeFilm,
  updateFilm,
};

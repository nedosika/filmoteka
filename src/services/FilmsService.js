import ValidationError from '../helpers/ValidationError';
import { makeCaching } from '../helpers/makeCaching';
import api from './api';
import { API_ROUTES } from './config';

const getOne = async (id) => {
  const response = await api(`${API_ROUTES.films}/${id}`);

  if (response.status === 200) {
    const result = await response.json();
    return result.data;
  }

  if (response.status === 404) {
    const result = await response.json();
    throw new Error(result.message);
  }
};

const getAll = async (params) => {
  const response = await api(API_ROUTES.films, { queryParams: params });

  if (response.status === 200) {
    const { data, page, limit, size } = await response.json();

    return {
      films: data,
      page: +page,
      pages: Math.ceil(size / limit),
    };
  }

  if (response.status === 404) {
    throw new Error('Resource not found');
  }
};

const addFilm = async (film) => {
  const response = await api(API_ROUTES.films, {
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify(film),
    },
  });

  if (response.status === 201) {
    const result = await response.json();
    return result.data;
  }

  if (response.status === 400) {
    const result = await response.json();
    throw new ValidationError(result.message, result.data);
  }

  if (response.status === 404) {
    const data = await response.json();
    throw new Error(data.message);
  }
};

const removeFilm = async (id) => {
  const response = await api(`${API_ROUTES.films}/${id}`, {
    fetchOptions: {
      method: 'DELETE',
    },
  });

  if (response.status === 200) {
    return id;
  }

  if (response.status === 404) {
    const data = await response.json();
    throw new Error(data.message);
  }
};

const updateFilm = async (film) => {
  const response = await api(`${API_ROUTES.films}/${film.id}`, {
    fetchOptions: {
      method: 'PUT',
      body: JSON.stringify(film),
    },
  });

  if (response.status === 200) {
    const result = await response.json();
    return result.data;
  }

  if (response.status === 400) {
    const result = await response.json();
    throw new ValidationError(result.message, result.data);
  }

  if (response.status === 404) {
    const data = await response.json();
    throw new Error(data.message);
  }
};

export const FilmsService = {
  getOne,
  getAll,
  addFilm,
  removeFilm,
  updateFilm,
};

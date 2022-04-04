import api from './api';
import { API_URL } from './config.js';

const getOne = async (id) => {
  const response = await api(`films/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

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
  const url = new URL(`${API_URL}/films`);

  params && Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  if (response.status === 200) {
    const { data, page, limit, size } = await response.json();

    return {
      films: data,
      page: +page,
      pages: Math.ceil(size / limit),
    };
  }

  if (response.status === 404) {
    const data = await response.json();
    throw new Error(data.message);
  }
};

const addFilm = async (film) => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const response = await api(`films`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + auth.token,
    },
    body: JSON.stringify(film),
  });

  if (response.status === 201) {
    const result = await response.json();
    return result.data;
  }

  if (response.status === 404) {
    const data = await response.json();
    throw new Error(data.message);
  }
};

const removeFilm = async (id) => {
  const auth = JSON.parse(localStorage.getItem('auth'));

  const response = await api(`films/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + auth.token,
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
  const auth = JSON.parse(localStorage.getItem('auth'));
  const response = await api(`films/${film.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + auth.token,
    },
    body: JSON.stringify(film),
  });

  if (response.status === 200) {
    const result = await response.json();
    return result.data;
  }

  if (response.status === 404) {
    const data = await response.json();
    throw new Error(data.message);
  }
};

export const FilmService = {
  getOne,
  getAll,
  addFilm,
  removeFilm,
  updateFilm,
};

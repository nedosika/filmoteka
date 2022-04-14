import api from './api';

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
  const response = await api(
    'films',
    {
      method: 'GET',
    },
    params,
  );

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
  const auth = JSON.parse(localStorage.getItem('auth'));
  const response = await api(`films`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + auth.accessToken,
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
      Authorization: 'Bearer ' + auth.accessToken,
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
      Authorization: 'Bearer ' + auth.accessToken,
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

export const FilmsService = {
  getOne,
  getAll,
  addFilm,
  removeFilm,
  updateFilm,
};

import { API_URL } from './config';

const addToFavorites = async (film) => {
  const auth = JSON.parse(localStorage.getItem('auth'));

  const response = await fetch(`${API_URL}/api/favorites/${auth.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + auth.token,
    },
    body: JSON.stringify(film),
  });

  if (response.status === 201) {
    return await response.json();
  }

  if (response.status === 401) {
    const data = await response.json();
    throw new Error(data.message);
  }

  if (response.status === 404) {
    const data = await response.json();
    throw new Error(data.message);
  }

  if (response.status === 400) {
    const data = await response.json();
    throw new Error(data.message);
  }
};

const getFavorites = async () => {
  const auth = JSON.parse(localStorage.getItem('auth'));

  if(!auth)
    return {
      status: 'not auth'
    }

  const response = await fetch(`${API_URL}/api/favorites/${auth?.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + auth.token,
    },
  });

  if (response.status === 200) {
    return await response.json();
  }

  if (response.status === 401) {
    const data = await response.json();
    throw new Error(data.message);
  }

  if (response.status === 403) {
    const data = await response.json();
    throw new Error(data.message);
  }

  if (response.status === 404) {
    return await response.json();
  }
};

const removeFromFavorites = async (filmId) => {
  const auth = JSON.parse(localStorage.getItem('auth'));

  const response = await fetch(`${API_URL}/api/favorites/${auth.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + auth.token,
    },
    body: JSON.stringify({ filmId }),
  });

  if (response.status === 200) {
    return await response.json();
  }

  if (response.status === 403) {
    const data = await response.json();
    throw new Error(data.message);
  }

  if (response.status === 404) {
    const data = await response.json();
    throw new Error(data.message);
  }
};

export default {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
};

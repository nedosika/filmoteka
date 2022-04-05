import api from './api.js';

const addToFavorites = async (film) => {
  const auth = JSON.parse(localStorage.getItem('auth'));

  const response = await api(`favorites/${auth.user?.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + auth.accessToken,
    },
    body: JSON.stringify(film),
  });

  if (response.status === 201) {
    return await response.json();
  }

  if (response.status === 404) {
    return await response.json();
  }
};

const getFavorites = async () => {
  const auth = JSON.parse(localStorage.getItem('auth'));

  if (!auth)
    return {
      status: 'not auth',
    };

  const response = await api(`favorites/${auth.user?.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + auth.accessToken,
    },
  });

  if (response.status === 200) {
    return await response.json();
  }

  if (response.status === 404) {
    return await response.json();
  }
};

const removeFromFavorites = async (filmId) => {
  const auth = JSON.parse(localStorage.getItem('auth'));

  const response = await api(`favorites/${auth.user?.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + auth.accessToken,
    },
    body: JSON.stringify({ filmId }),
  });

  if (response.status === 200) {
    return await response.json();
  }

  if (response.status === 404) {
    const data = await response.json();
    throw new Error(data.message);
  }
};

const favoriteActions = {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
};

export default favoriteActions;

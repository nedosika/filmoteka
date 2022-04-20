import api from './api.js';
import { API_ROUTES } from './config';

const addToFavorites = async (film) => {
  const auth = JSON.parse(localStorage.getItem('auth'));

  const response = await api(`${API_ROUTES.favorites}/${auth.user?.id}`, {
    fetchOptions: {
      method: 'PUT',
      body: JSON.stringify(film),
    },
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
  const response = await api(`${API_ROUTES.favorites}/${auth.user?.id}`);

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
    fetchOptions: {
      method: 'DELETE',
      body: JSON.stringify({ filmId }),
    },
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

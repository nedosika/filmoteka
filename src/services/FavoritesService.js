import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import api from './api.js';
import { API_URL } from './config';

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

export const favoritesAPI = createApi({
  reducerPath: 'favoritesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Favorites'],
  endpoints: (build) => ({
    fetchAllFavorites: build.query({
      query: (id) => {
        return { url: `/favorites/${id}` };
      },
      providesTags: ['Favorites'],
    }),
    addToFavorites: build.mutation({
      query: ({ userId, film }) => ({ url: `/favorites/${userId}`, method: 'PUT', body: film }),
      invalidatesTags: ['Favorites'],
    }),
    removeFromFavorites: build.mutation({
      query: ({ userId, filmId }) => ({
        url: `/favorites/${userId}`,
        method: 'DELETE',
        body: { filmId },
      }),
      invalidatesTags: ['Favorites'],
    }),
  }),
});

const favoriteActions = {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
};

export default favoriteActions;

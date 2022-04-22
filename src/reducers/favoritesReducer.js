import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import authActions from '../actions/authActions';
import { API_URL } from '../services/config';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const auth = JSON.parse(localStorage.getItem('auth'));

    if (auth?.accessToken) {
      headers.set('Authorization', `Bearer ${auth?.accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const auth = JSON.parse(localStorage.getItem('auth'));

    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        headers: {
          'x-auth-refresh-token': auth.refreshToken,
        },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // store the new token
      api.dispatch(authActions.refreshAuth(refreshResult.data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(authActions.signOut());
    }
  }
  return result;
};

export const favoritesAPI = createApi({
  reducerPath: 'favorites',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Favorites'],
  endpoints: (build) => ({
    fetchAllFavorites: build.query({
      query: (id) => {
        return { url: `/favorites`, method: 'GET' };
      },
      providesTags: ['Favorites'],
    }),
    addToFavorites: build.mutation({
      query: ({ film }) => ({ url: `/favorites`, method: 'PUT', body: film }),
      invalidatesTags: ['Favorites'],
    }),
    removeFromFavorites: build.mutation({
      query: ({ filmId }) => ({
        url: `/favorites`,
        method: 'DELETE',
        body: { filmId },
      }),
      invalidatesTags: ['Favorites'],
    }),
  }),
});

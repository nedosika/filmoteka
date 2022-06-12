import { filmAdded, filmReceived, filmRemoved, filmUpdated, filmsReceived } from '@Reducers/filmsReducer';
import api from '@Services/api';
import { API_ROUTES } from '@Services/config';
import CacheMap from '../helpers/CacheMap';
import { makeCaching } from '../helpers/makeCaching';

export const FILMS_PER_PAGE = 5;

//const cachedAPI = makeCaching(api);
//const cachedAPI = new CacheMap(api);

export const getFilms = (queryParams) => (dispatch) =>
  api(API_ROUTES.films, { queryParams }).then(({ data, page, limit, size }) => {
    dispatch(
      filmsReceived({
        films: data,
        page: +page,
        pages: Math.ceil(size / limit),
      }),
    );
  });

export const getFilm = (id) => (dispatch) =>
  api(`${API_ROUTES.films}/${id}`).then(({ data }) => dispatch(filmReceived(data)));

export const addFilm = (film) => (dispatch) =>
  api(API_ROUTES.films, {
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify(film),
    },
  }).then(({ data }) => {
    dispatch(filmAdded(data));
    return data;
  });

export const updateFilm = (film) => (dispatch) =>
  api(`${API_ROUTES.films}/${film.id}`, {
    fetchOptions: {
      method: 'PUT',
      body: JSON.stringify(film),
    },
  })
    .then(({ data }) => dispatch(filmUpdated(data)))
    .finally(() => dispatch(getFilms({ limit: FILMS_PER_PAGE })));

export const removeFilm = (id) => (dispatch) =>
  api(`${API_ROUTES.films}/${id}`, {
    fetchOptions: {
      method: 'DELETE',
    },
  })
    .then((result) => dispatch(filmRemoved(result)))
    .finally(() => dispatch(getFilms({ limit: FILMS_PER_PAGE })));

export const voteFilm =
  ({ id, value }) =>
  (dispatch) =>
    api(`${API_ROUTES.vote}/${id}`, {
      fetchOptions: {
        method: 'POST',
        body: JSON.stringify({ value }),
      },
    }).then(({ data }) => dispatch(filmUpdated(data)));

export default {
  voteFilm,
  removeFilm,
  addFilm,
  updateFilm,
  getFilm,
  getFilms,
};

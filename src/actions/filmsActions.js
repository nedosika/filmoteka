import { filmAdded, filmReceived, filmRemoved, filmUpdated, filmsReceived } from '../reducers/filmsReducer';
import api from '../services/api';
import { API_ROUTES } from '../services/config';

export const FILMS_PER_PAGE = 5;

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
  })
    .then(({ data }) => dispatch(filmAdded(data)))
    .finally(() => dispatch(getFilms({ limit: FILMS_PER_PAGE })));

export const updateFilm = (film) => (dispatch) =>
  api(`${API_ROUTES.films}/${film.id}`, {
    fetchOptions: {
      method: 'PUT',
      body: JSON.stringify(film),
    },
  })
    .then((result) => dispatch(filmUpdated(result)))
    .finally(() => dispatch(getFilms({ limit: FILMS_PER_PAGE })));

export const removeFilm = (id) => (dispatch) =>
  api(`${API_ROUTES.films}/${id}`, {
    fetchOptions: {
      method: 'DELETE',
    },
  })
    .then((result) => dispatch(filmRemoved(result)))
    .finally(() => dispatch(getFilms({ limit: FILMS_PER_PAGE })));

export default {
  removeFilm,
  addFilm,
  updateFilm,
  getFilm,
  getFilms,
};

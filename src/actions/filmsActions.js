import { SnackBarSeverities } from '../components/SnackStack';
import { FilmService } from '../services';
import FavoritesService from '../services/FavoritesService';
import { showNotice } from './noticesActions';

export const FILMS_PER_PAGE = 5;
export const FILMS_LOADED = 'FILMS_LOADED';
export const FILM_LOADED = 'FILM_LOADED';

const getFilmsSuccess = (payload) => ({
  type: FILMS_LOADED,
  payload,
});

const getFilmSuccess = (film) => ({
  type: FILM_LOADED,
  payload: film,
});

export const getFilm = (id) => (dispatch) => FilmService.getOne(id).then(({ data }) => dispatch(getFilmSuccess(data)));

export const getFilms = (query) => async (dispatch) => {
  const result = await FavoritesService.getFavorites();

  const favorites = result.status === 'ok' ? result.data.map((film) => film.id) : [];

  return FilmService.getAll({ ...query, favorites, limit: FILMS_PER_PAGE }).then((result) =>
    dispatch(getFilmsSuccess(result)),
  );
};

export const addFilm = (film) => (dispatch, getState) => {
  const {
    films: { page },
  } = getState();
  return FilmService.addFilm(film)
    .then(() => dispatch(showNotice('Film added', SnackBarSeverities.success)))
    .then(() => dispatch(getFilms({ page })));
};

export const updateFilm = (film) => (dispatch, getState) => {
  const {
    films: { page },
  } = getState();
  return FilmService.updateFilm(film)
    .then(() => dispatch(showNotice('Film updated', SnackBarSeverities.success)))
    .then(() => dispatch(getFilms({ page })));
};

export const removeFilm = (id) => (dispatch, getState) => {
  const {
    films: { page },
  } = getState();
  return FilmService.removeFilm(id)
    .then(() => dispatch(showNotice('Film removed', SnackBarSeverities.success)))
    .then(() => dispatch(getFilms({ page })));
};

import { SnackBarSeverities } from '../components/SnackStack';
import { slice } from '../reducers/filmsSlice';
import { FilmService } from '../services';
import { startLoading, successLoading } from './loadingActions';
import { showNotice } from './noticesActions';

export const FILMS_PER_PAGE = 5;

export const getFilm = (id) => (dispatch) =>
  FilmService.getOne(id).then((result) => dispatch(slice.actions.filmFetchingSuccess(result)));

export const getFilms = (params) => (dispatch) => {
  dispatch(slice.actions.filmsFetching());
  return FilmService.getAll({ ...params, limit: FILMS_PER_PAGE })
    .then((result) => dispatch(slice.actions.filmsFetchingSuccess(result)))
    .catch((error) => {
      dispatch(slice.actions.filmsFetchingError(error.message));
      dispatch(showNotice(error.message, SnackBarSeverities.error));
    });
};

export const addFilm = (film) => (dispatch, getState) => {
  const {
    films: { page },
  } = getState();
  dispatch(startLoading());
  FilmService.addFilm(film)
    .then(() => dispatch(showNotice('Film added', SnackBarSeverities.success)))
    .then(() => dispatch(getFilms({ page })))
    .catch((error) => dispatch(showNotice(error.message, SnackBarSeverities.error)))
    .finally(() => dispatch(successLoading()));
};

export const updateFilm = (film) => (dispatch, getState) => {
  const {
    films: { page },
  } = getState();
  return FilmService.updateFilm(film)
    .then(() => dispatch(showNotice('Film updated', SnackBarSeverities.success)))
    .then(() => dispatch(getFilms({ page })))
    .catch((error) => dispatch(showNotice(error.message, SnackBarSeverities.error)));
};

export const removeFilm = (id) => (dispatch, getState) => {
  const {
    films: { page },
  } = getState();
  return FilmService.removeFilm(id)
    .then(() => dispatch(showNotice('Film removed', SnackBarSeverities.success)))
    .then(() => dispatch(getFilms({ page })))
    .catch((error) => dispatch(showNotice(error.message, SnackBarSeverities.error)));
};

export default {
  removeFilm,
  addFilm,
  updateFilm,
  getFilm,
  getFilms,
};

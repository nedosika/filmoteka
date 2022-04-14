import { filmAdded, filmReceived, filmRemoved, filmUpdated, filmsReceived } from '../reducers/filmsReducer';
import { FilmsService } from '../services';

export const FILMS_PER_PAGE = 5;

export const getFilms = (params) => (dispatch) =>
  FilmsService.getAll(params).then((result) => dispatch(filmsReceived(result)));

export const getFilm = (id) => (dispatch) => FilmsService.getOne(id).then((result) => dispatch(filmReceived(result)));

export const addFilm = (film) => (dispatch) =>
  FilmsService.addFilm(film)
    .then((result) => dispatch(filmAdded(result)))
    .finally(() => dispatch(getFilms({ limit: FILMS_PER_PAGE })));

export const updateFilm = (film) => (dispatch) =>
  FilmsService.updateFilm(film)
    .then((result) => dispatch(filmUpdated(result)))
    .finally(() => dispatch(getFilms({ limit: FILMS_PER_PAGE })));

export const removeFilm = (film) => (dispatch) =>
  FilmsService.removeFilm(film)
    .then((result) => dispatch(filmRemoved(result)))
    .finally(() => dispatch(getFilms({ limit: FILMS_PER_PAGE })));

export default {
  removeFilm,
  addFilm,
  updateFilm,
  getFilm,
  getFilms,
};

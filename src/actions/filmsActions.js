import { filmAdded, filmReceived, filmRemoved, filmUpdated, filmsReceived } from '../reducers/filmsReducer';
import { FilmsService } from '../services';
import api from '../services/api';

export const FILMS_PER_PAGE = 5;

export const getFilms = (params) => async (dispatch) => {
  const response = api('films', {
    success: (result) => {
      const { data, page, limit, size } = result;

      dispatch(
        filmsReceived({
          films: data,
          page: +page,
          pages: Math.ceil(size / limit),
        }),
      );
    },
  });

  // FilmsService.getAll(params).then((result) => dispatch(filmsReceived(result)));
};

export const getFilm = (id) => (dispatch) => FilmsService.getOne(id).then((result) => dispatch(filmReceived(result)));

export const addFilm = (film) => async (dispatch) => {
  const response = await api(`films`, {
    method: 'POST',
    body: film,
  });

  dispatch(filmAdded(response));

  dispatch(getFilms({ limit: FILMS_PER_PAGE }));
};

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

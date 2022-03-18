import { SnackBarSeverities } from '../components/SnackStack';
import FavoritesService from '../services/FavoritesService';
import { getFilm, getFilms } from './filmsActions';
import { showNotice } from './noticesActions';

export const FAVORITES_LOADED = 'FAVORITES_LOADED';

const loadFavoritesSuccess = (films) => ({
  type: FAVORITES_LOADED,
  payload: films,
});

export const getFavorites = () => (dispatch) => {
  return FavoritesService.getFavorites()
    .then((films) => dispatch(loadFavoritesSuccess(films.data)))
    .catch(({ message }) => dispatch(showNotice(message, SnackBarSeverities.error)));
};

export const addToFavorites = (film) => (dispatch) => {
  return FavoritesService.addToFavorites(film).catch(({ message }) =>
    dispatch(showNotice(message, SnackBarSeverities.error)),
  );
};

export const removeFromFavorites = (id) => (dispatch) => {
  return FavoritesService.removeFromFavorites(id).catch(({ message }) =>
    dispatch(showNotice(message, SnackBarSeverities.error)),
  );
};

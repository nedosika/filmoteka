import {SnackBarSeverities} from "../components/SnackStack";
import FavoritesService from "../services/FavoritesService";
import {showNotice} from "./noticesActions";

export const FAVORITES_LOADED = 'FAVORITES_LOADED';

const loadFavoritesSuccess = (films) => ({
    type: FAVORITES_LOADED,
    payload: films
});

export const getFavorites = () => (dispatch) => {
    return FavoritesService
        .getFavorites()
        .then((films) => dispatch(loadFavoritesSuccess(films.data)))
}

export const addToFavorites = (film) => (dispatch) => {
    return FavoritesService
        .addToFavorites(film)
        .then(() => dispatch(showNotice('Film added to favorites', SnackBarSeverities.success)))
        .then(() => dispatch(getFavorites()))
}

export const removeFromFavorites = (id) => (dispatch) => {
    return FavoritesService
        .removeFromFavorites(id)
        .then(() => dispatch(showNotice('Film removed from favorites', SnackBarSeverities.success)))
        .then(() => dispatch(getFavorites()))
}
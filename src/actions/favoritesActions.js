import {ACTION_TYPES} from "./index";

import {showNotice} from "./noticeActions";
import {SnackBarSeverities} from "../components/SnackStack";
import {request, success, failure} from "./loadingActions";
import FavoritesService from "../services/FavoritesService";

const loadFavoritesSuccess = (data) => ({
    type: ACTION_TYPES.Favorites.FAVORITES_LOADED,
    payload: data
});

const addToFavoritesSuccess = (film) => ({
    type: ACTION_TYPES.Favorites.FAVORITES_ADDED,
    payload: film
});
const removeFromFavoritesSuccess = (film) => ({
    type: ACTION_TYPES.Favorites.FAVORITES_REMOVED,
    payload: film
});

const getFavorites = () => (dispatch) => {
    dispatch(request());
    return FavoritesService
        .getFavorites()
        .then((films) => dispatch(loadFavoritesSuccess(films.data)))
        .catch((error) => dispatch(showNotice(`Error: ${error.message}`, SnackBarSeverities.error)))
        .finally(() => dispatch(success()))
}

const addToFavorites = (film) => (dispatch) => {
    dispatch(request());
    return FavoritesService
        .addToFavorites(film)
        .then((film) => dispatch(addToFavoritesSuccess(film)))
        .then(() => dispatch(showNotice('Film added to favorites', SnackBarSeverities.success)))
        .catch((error) => dispatch(showNotice(`Error added film: ${error.message}`, SnackBarSeverities.error)))
        .finally(() => dispatch(success()))
}

const removeFromFavorites = (id) => (dispatch) => {
    dispatch(request());
    return FavoritesService
        .removeFromFavorites(id)
        .then((film) => dispatch(removeFromFavoritesSuccess(film.data)))
        .then(() => dispatch(showNotice('FilmCard removed from favorites', SnackBarSeverities.success)))
        .catch((error) => dispatch(showNotice(`Error removing film: ${error.message}`, SnackBarSeverities.error)))
        .finally(() => dispatch(success()))
}

export default {
    getFavorites,
    addToFavorites,
    removeFromFavorites
}
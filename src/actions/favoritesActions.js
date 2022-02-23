import {ACTION_TYPES} from "./index";

import {SnackBarSeverities} from "../components/SnackStack";
import FavoritesService from "../services/FavoritesService";
import {showNotice} from "./noticesActions";
import {checkAuth} from "./authActions";

const loadFavoritesSuccess = (films) => ({
    type: ACTION_TYPES.Favorites.FAVORITES_LOADED,
    payload: films
});

const addToFavoritesSuccess = (film) => ({
    type: ACTION_TYPES.Favorites.FAVORITES_ADDED,
    payload: film
});
const removeFromFavoritesSuccess = (film) => ({
    type: ACTION_TYPES.Favorites.FAVORITES_REMOVED,
    payload: film
});

const getFavorites = () => (dispatch) =>{
    dispatch(checkAuth());

    return FavoritesService
        .getFavorites()
        .then((films) => dispatch(loadFavoritesSuccess(films.data)))
}

const addToFavorites = (film) => (dispatch) => {
    dispatch(checkAuth());

    return FavoritesService
        .addToFavorites(film)
        .then((film) => dispatch(addToFavoritesSuccess(film)))
        .then(() => dispatch(showNotice('Film added to favorites', SnackBarSeverities.success)))
}

const removeFromFavorites = (id) => (dispatch) => {
    dispatch(checkAuth());

    return FavoritesService
        .removeFromFavorites(id)
        .then((film) => dispatch(removeFromFavoritesSuccess(film.data)))
        .then(() => dispatch(showNotice('Film removed from favorites', SnackBarSeverities.success)))
}

export default {
    getFavorites,
    addToFavorites,
    removeFromFavorites
}
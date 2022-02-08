import {ACTION_TYPES} from "./index";

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
        .then(() => dispatch(success()))
        .catch((error) => dispatch(failure(error)))
}

const addToFavorites = (film) => (dispatch) => {
    dispatch(request());
    return FavoritesService
        .addToFavorites(film)
        .then((film) => dispatch(addToFavoritesSuccess(film.data)))
        .then(() => dispatch(success()))
        .catch((error) => dispatch(failure(error)))
}

const removeFromFavorites = (id) => (dispatch) => {
    dispatch(request());
    return FavoritesService
        .removeFromFavorites(id)
        .then((film) => dispatch(removeFromFavoritesSuccess(film.data)))
        .then(() => dispatch(success()))
        .catch((error) => dispatch(failure(error)))
}

export default {
    getFavorites,
    addToFavorites,
    removeFromFavorites
}
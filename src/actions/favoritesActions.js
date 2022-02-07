import {ACTION_TYPES} from "./index";
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

const getFavorites = ({request, success, failure}) => () => (dispatch) => {
    request();
    FavoritesService
        .getFavorites()
        .then((films) => dispatch(loadFavoritesSuccess(films.data)))
        .then(success)
        .catch(failure)
}

const addToFavorites = ({request, success, failure}) => (film) => (dispatch) => {
    request();
    FavoritesService
        .addToFavorites(film)
        .then((data) => dispatch(addToFavoritesSuccess(data)))
        .then(success)
        .catch(failure)
}

const removeFromFavorites = ({request, success, failure}) => (id) => (dispatch) => {
    request();
    FavoritesService
        .removeFromFavorites(id)
        .then(({data}) => dispatch(removeFromFavoritesSuccess(data)))
        .then(success)
        .catch(failure)
}

export default {
    getFavorites,
    addToFavorites,
    removeFromFavorites
}
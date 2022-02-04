import {ACTION_TYPES} from "./index";
import FavoritesService from "../services/FavoritesService";

const request = () => ({
    type: ACTION_TYPES.Favorites.FAVORITES_REQUEST
});
const success = (data) => ({
    type: ACTION_TYPES.Favorites.FAVORITES_SUCCESS,
    payload: data
});
const failure = (errorMessage) => ({
    type: ACTION_TYPES.Favorites.FAVORITES_FAILURE,
    payload: errorMessage
});
const addSuccess = (film) => ({
    type: ACTION_TYPES.Favorites.FAVORITES_FAILURE,
    payload: film
});
const removeSuccess = (film) => ({
    type: ACTION_TYPES.Favorites.FAVORITES_FAILURE,
    payload: film
});

const getFavorites = () => (dispatch) => {
    dispatch(request());
    FavoritesService
        .getFavorites()
        .then(({data}) => {
            dispatch(success(data))
        })
        .catch((error) => {
            dispatch(failure(error.message))
        })
}

const addToFavorites = (film) => (dispatch) => {
    dispatch(request());
    FavoritesService
        .addToFavorites(film)
        .then((data) => {
            dispatch(addSuccess(data))
        })
        .catch((error) => {
            dispatch(failure(error.message))
        })
}

const removeFromFavorites = (id) => (dispatch) => {
    dispatch(request());
    FavoritesService
        .removeFromFavorites(id)
        .then((data) => {
            dispatch(removeSuccess(data))
        })
        .catch((error) => {
            dispatch(failure(error.message))
        })
}

export default {
    getFavorites,
    addToFavorites,
    removeFromFavorites
}
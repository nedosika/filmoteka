import {ACTION_TYPES} from "./index";
import UserService from "../services/UserService";

const request = () => ({
    type: ACTION_TYPES.Favorites.FAVORITES_REQUEST
});
const success = (payload) => ({
    type: ACTION_TYPES.Favorites.FAVORITES_SUCCESS,
    payload
});
const failure = (errorMessage) => ({
    type: ACTION_TYPES.Favorites.FAVORITES_FAILURE,
    payload: errorMessage
});

const getFavorites = (id) => (dispatch) => {
    dispatch(request());
    UserService
        .get(id)
        .then((user) => {
            console.log(user);
            //dispatch(success(data))
        })
        .catch((error) => dispatch(failure(error.message)))
}

const addToFavorites = () => (dispatch) => {
    // dispatch(request());
    // UserService
    //     .update(user)
    //     .then((user) => {
    //         console.log(user);
    //         //dispatch(success(data))
    //     })
    //     .catch((error) => dispatch(failure(error.message)))
}

const deleteFromFavorites = (id, user) => (dispatch) => {

}

export default {
    getFavorites,
    addToFavorites,
    deleteFromFavorites
}
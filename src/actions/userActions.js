import {ACTION_TYPES} from "./index";
import UserService from "../services/UserService";

const request = () => ({
  type: ACTION_TYPES.User.USER_REQUEST
});

const success = (payload) => ({
    type: ACTION_TYPES.User.USER_SUCCESS,
    payload
});

const failure = (payload) => ({
    type: ACTION_TYPES.User.USER_FAILURE,
    payload
});

// const updateUser = (user) => (dispatch) => {
//     dispatch(request());
//     UserService
//         .update(user)
//         .then(({data}) => {
//             dispatch(success(data))
//         })
//         .catch((error) => {
//             dispatch(failure(error.message))
//         })
// }

const addToFavorite = (film) => (dispatch) => {
    dispatch(request());
    UserService
        .addFilmToFavorites(film)
        .then((data) => {
            console.log(data)
            dispatch(success(data))
        })
        .catch((error) => dispatch(failure(error.message)))
}

export default {
    addToFavorite
}


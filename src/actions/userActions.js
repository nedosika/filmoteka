import {ACTION_TYPES} from "./index";
import UserService from "../services/UserService";

const request = () => ({
  type: ACTION_TYPES.Users.USERS_REQUEST
});

const success = (payload) => ({
    type: ACTION_TYPES.Users.USERS_SUCCESS,
    payload
});

const failure = (payload) => ({
    type: ACTION_TYPES.Users.USERS_FAILURE,
    payload
});

const updateUser = (user) => (dispatch) => {
    dispatch(request());
    UserService
        .update(user)
        .then(({data}) => {
            dispatch(success(data))
        })
        .catch((error) => {
            dispatch(failure(error.message))
        })
}

export default {
    updateUser
}


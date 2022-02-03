import {AuthService} from "../services";
import {ACTION_TYPES} from "./index";
import UserService from "../services/UserService";

const request = () => ({
    type: ACTION_TYPES.Auth.AUTH_REQUEST
});
const success = (payload) => ({
    type: ACTION_TYPES.Auth.AUTH_SUCCESS,
    payload
});
const failure = (errorMessage) => ({
    type: ACTION_TYPES.Auth.AUTH_FAILURE,
    payload: errorMessage
});

const signIn = (email, password) => (dispatch) => {
    dispatch(request());

    AuthService.signIn(email, password)
        .then(({data}) => {
            localStorage.setItem('auth', JSON.stringify({
                token: data.token,
                user: data.user,
                id: data.user.id
            }));
            dispatch(success(data));
        })
        .catch((error) => {
            dispatch(failure(error.message))
        })
}

const signUp = (email, password) => (dispatch) => {
    dispatch(request());

    AuthService.signUp(email, password)
        .then(({data}) => {
            localStorage.setItem('auth', JSON.stringify({
                token: data.token,
                user: data.user,
                id: data.user.id
            }));
            dispatch(success(data.token))
        })
        .catch((error) => {
            dispatch(failure(error.message))
        })
}

const signOut = () => {
    localStorage.removeItem('auth')
    return {type: ACTION_TYPES.Auth.SIGNOUT}
}

export default {
    signIn,
    signOut,
    signUp
}

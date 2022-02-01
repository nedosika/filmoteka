import {authService} from "../services";
import {ACTION_TYPES} from "./index";

const request = () => ({
    type: ACTION_TYPES.Auth.AUTH_REQUEST
});
const success = (token) => ({
    type: ACTION_TYPES.Auth.AUTH_SUCCESS,
    payload: token
});
const failure = (errorMessage) => ({
    type: ACTION_TYPES.Auth.AUTH_FAILURE,
    payload: errorMessage
});

const signIn = (email, password) => (dispatch) => {
    dispatch(request());

    authService.signIn(email, password)
        .then(({data}) => {
            localStorage.setItem('auth', JSON.stringify({token: data.token}));
            dispatch(success(data.token));
        })
        .catch((error) => {
            dispatch(failure(error.message))
        })
}

const signUp = (email, password) => (dispatch) => {
    dispatch(request());

    authService.signUp(email, password)
        .then(({data}) => {
            localStorage.setItem('auth', JSON.stringify({token: data.token}));
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

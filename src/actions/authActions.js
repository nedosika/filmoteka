import {ACTION_TYPES} from "./index";
import {AuthService} from "../services";
import {startLoading, successLoading, failureLoading} from "./loadingActions";

const authSuccess = (payload) => ({
    type: ACTION_TYPES.Auth.AUTH_SUCCESS,
    payload
});

const signIn = (email, password) => (dispatch) => {
    dispatch(startLoading());

    return AuthService.signIn(email, password)
        .then(({data}) => {
            localStorage.setItem('auth', JSON.stringify({
                token: data.token,
                user: data.user,
                id: data.user.id
            }));
            dispatch(authSuccess(data));
        })
        .then(() => dispatch(successLoading()))
        .catch((error) => dispatch(failureLoading(error.message)))
}

const signUp = (email, password) => (dispatch) => {
    dispatch(startLoading());

    AuthService.signUp(email, password)
        .then(({data}) => {
            localStorage.setItem('auth', JSON.stringify({
                token: data.token,
                user: data.user,
                id: data.user.id
            }));
            dispatch(authSuccess(data.token))
        })
        .then(() => dispatch(successLoading()))
        .catch((error) => dispatch(failureLoading(error.message)))
}

const signOut = () => {
    localStorage.removeItem('auth');
    return {type: ACTION_TYPES.Auth.AUTH_SIGNOUT}
}

export default {
    signIn,
    signOut,
    signUp
}

import {AuthService} from "../services";
import {startLoading, successLoading, failureLoading} from "./loadingActions";

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_SIGNOUT = 'AUTH_SIGNOUT';

const authSuccess = (payload) => ({
    type: AUTH_SUCCESS,
    payload
});

const authFailure = () => ({
    type: AUTH_SIGNOUT
})

export const signIn = (email, password) => (dispatch) => {
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

export const signUp = (email, password) => (dispatch) => {
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

export const signOut = () => (dispatch) => {
    localStorage.removeItem('auth');
    dispatch(authFailure());
}

export const checkAuth = () => (dispatch) => {
    const auth = localStorage.getItem('auth');

    if (auth) {
        return AuthService
            .checkAuth()
            .then(({data}) => {
                localStorage.setItem('auth', JSON.stringify({
                    token: data.token,
                    user: data.user,
                    id: data.user.id
                }));
                dispatch(authSuccess(data))
            })
            .catch((err) => {
                localStorage.removeItem('auth');
                dispatch(authFailure());
            })
    }
}

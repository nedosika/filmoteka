import {ACTION_TYPES} from "./index";
import {AuthService} from "../services";
import {request, success, failure} from "./loadingActions";

const authSuccess = (payload) => ({
    type: ACTION_TYPES.Auth.AUTH_SUCCESS,
    payload
});

const signIn = (email, password) => (dispatch) => {
    dispatch(request());

    return AuthService.signIn(email, password)
        .then(({data}) => {
            localStorage.setItem('auth', JSON.stringify({
                token: data.token,
                user: data.user,
                id: data.user.id
            }));
            dispatch(authSuccess(data));
        })
        .then(() => dispatch(success()))
        .catch((error) => dispatch(failure(error.message)))
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
            dispatch(authSuccess(data.token))
        })
        .then(() => dispatch(success()))
        .catch((error) => dispatch(failure(error.message)))
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

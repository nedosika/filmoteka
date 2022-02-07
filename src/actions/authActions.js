import {AuthService} from "../services";
import {ACTION_TYPES} from "./index";

const authSuccess = (payload) => ({
    type: ACTION_TYPES.Auth.AUTH_SUCCESS,
    payload
});

const signIn = ({request, success, failure}) => (email, password) => (dispatch) => {
    request()

    console.log('---')

    AuthService.signIn(email, password)
        .then(({data}) => {
            localStorage.setItem('auth', JSON.stringify({
                token: data.token,
                user: data.user,
                id: data.user.id
            }));
            dispatch(authSuccess(data));
        })
        .then(success)
        .catch(failure)
}

const signUp = ({request, success, failure}) => (email, password) => (dispatch) => {
    request();

    AuthService.signUp(email, password)
        .then(({data}) => {
            localStorage.setItem('auth', JSON.stringify({
                token: data.token,
                user: data.user,
                id: data.user.id
            }));
            dispatch(authSuccess(data.token))
        })
        .then(success)
        .catch(failure)
}

const signOut = () => () => {
    localStorage.removeItem('auth');
    return {type: ACTION_TYPES.Auth.AUTH_SIGNOUT}
}

export default {
    signIn,
    signOut,
    signUp
}

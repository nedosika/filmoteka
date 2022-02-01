import {authService} from "../services";

export const ACTIONS = {
    AUTH_REQUEST: 'AUTH_REQUEST',
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    AUTH_FAILURE: 'AUTH_FAILURE',
    SIGNOUT: 'SIGNOUT'
};

const request = () => ({
    type: ACTIONS.AUTH_REQUEST
});
const success = () => ({
    type: ACTIONS.AUTH_SUCCESS
});
const failure = (error) => ({
    type: ACTIONS.AUTH_FAILURE, error
})

const signIn = (email, password) => (dispatch) => {
    dispatch(request({email}));

    authService.signIn(email, password)
        .then(() => {
            dispatch(success());
        })
        .catch((error) => {
            dispatch(failure(error))
        })
}

const signUp = (email, password) => (dispatch) => {
    dispatch(request({email}));

    authService.signUp(email, password)
        .then((data) => {
            dispatch(success({data}))
        })
        .catch((error) => {
            dispatch(failure(error))
        })
}

const signOut = () => {
    authService.signOut();
    return {type: ACTIONS.SIGNOUT}
}

export default {
    signIn,
    signOut,
    signUp
}

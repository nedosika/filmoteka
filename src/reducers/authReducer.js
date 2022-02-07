import {ACTION_TYPES} from "../actions";

const auth = JSON.parse(localStorage.getItem('auth'));

const initialState = auth
    ? {
        isAuth: true,
        token: auth.token,
        user: auth.user
    }
    : {
        isAuth: false
    }

const authReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.Auth.AUTH_SUCCESS:
            return {
                token: payload.token,
                user: payload.user,
                isAuth: true,
            }
        case ACTION_TYPES.Auth.AUTH_SIGNOUT:
            return {
                isAuth: false
            }
        default:
            return state;
    }
}

export default authReducer;
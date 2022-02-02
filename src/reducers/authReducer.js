import {ACTION_TYPES} from "../actions";

const auth = JSON.parse(localStorage.getItem('auth'));

const initialState = auth
    ? {isAuth: true, isSigning: false, token: auth.token}
    : {isAuth: false, isSigning: false}

const authReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.Auth.AUTH_REQUEST:
            return {
                isSigning: true,
                isAuth: false,
            }
        case ACTION_TYPES.Auth.AUTH_SUCCESS:
            return {
                token: payload,
                isSigning: false,
                isAuth: true,
            }
        case ACTION_TYPES.Auth.AUTH_FAILURE:
            return {
                error: payload,
                isSigning: false,
                isAuth: false
            }
        case ACTION_TYPES.Auth.SIGNOUT:
            return {
                isSigning: false,
                isAuth: false
            }
        default:
            return state;
    }
}

export default authReducer;
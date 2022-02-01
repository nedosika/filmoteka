import {ACTIONS} from "../actions";

const {token} = localStorage.getItem('auth');

const initialState = token
    ? {isAuth: true, token}
    : {isAuth: false}

const authReducer = (state= initialState, action) => {
    switch (action.type){
        case ACTIONS.AUTH_REQUEST:
            return {
                ...state,
                signingIn: true,
                isAuth: false,
            }
        case ACTIONS.AUTH_SUCCESS:
            return {
                ...state,
                signingIn: false,
                isAuth: true,
            }
        case ACTIONS.AUTH_FAILURE:
            return {
                ...state,
                signingIn: false,
                error: action.payload,
                isAuth: false
            }
        case ACTIONS.SIGNOUT:
            return {
                ...state,
                signingIn: false,
                isAuth: false
            }
        default:
            return state;
    }
}

export default authReducer;
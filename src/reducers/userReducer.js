import {ACTION_TYPES} from "../actions";

const initialState = {
    isLoading: false,
    user: {},
    error: null
};

export default function userReducer(state = initialState, {type, payload}){
    switch (type){
        case ACTION_TYPES.User.USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case ACTION_TYPES.User.USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: payload,
                error: null
            }
        case ACTION_TYPES.User.USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state
    }
}
import {USER_REQUEST, USER_SUCCESS, USER_FAILURE} from "../actions/userActions";

const initialState = {
    isLoading: false,
    user: {},
    error: null
};

export default function userReducer(state = initialState, {type, payload}){
    switch (type){
        case USER_REQUEST:
            return {
                isLoading: true,
                error: null
            }
        case USER_SUCCESS:
            return {
                isLoading: false,
                user: payload,
                error: null
            }
        case USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state
    }
}
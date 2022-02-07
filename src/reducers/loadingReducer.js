import {ACTION_TYPES} from "../actions";

const initialState = {
    isLoading: false,
    error: null
};

export default function loadingReducer(state = initialState, {type, payload}){
    switch (type){
        case ACTION_TYPES.Loading.REQUEST:
            return {
                isLoading: true,
                error: null
            }
        case ACTION_TYPES.Loading.SUCCESS:
            return {
                isLoading: false,
                error: null
            }
        case ACTION_TYPES.Loading.FAILURE:
            return {
                isLoading: false,
                error: payload
            }
        default:
            return state
    }
}


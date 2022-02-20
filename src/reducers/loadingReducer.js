import {LOADING} from "../actions/loadingActions";

const initialState = {
    isLoading: false,
    error: null
};

export default function loadingReducer(state = initialState, {type, payload}){
    switch (type){
        case LOADING.START_LOADING:
            return {
                isLoading: true,
                error: null
            }
        case LOADING.SUCCESS_LOADING:
            return {
                isLoading: false,
                error: null
            }
        case LOADING.FAILURE_LOADING:
            return {
                isLoading: false,
                error: payload
            }
        default:
            return state
    }
}


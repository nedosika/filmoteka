import {ACTION_TYPES} from "../actions";

const initialState = {
    results: [],
    options: []
};

export default function searchReducer(state = initialState, {type, payload}){
    switch (type){
        case ACTION_TYPES.Search.SEARCH_SUCCESS:
            return {
                ...state,
                results: payload
            }
        case ACTION_TYPES.Search.GET_SEARCH_OPTIONS_SUCCESS:
            return {
                ...state,
                options: payload
            }
        default:
            return state
    }
}
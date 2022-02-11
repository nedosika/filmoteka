import {ACTION_TYPES} from "../actions";

const initialState = {
    results: []
};

export default function searchReducer(state = initialState, {type, payload}){
    switch (type){
        case ACTION_TYPES.Search.SEARCH_SUCCESS:
            return {
                ...state,
                results: payload
            }
        default:
            return state
    }
}
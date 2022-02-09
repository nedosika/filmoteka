import {ACTION_TYPES} from "../actions";

const initialState = [];

export default function searchReducer(state = initialState, {type, payload}){
    switch (type){
        case ACTION_TYPES.Search.SEARCH_SUCCESS:
            return [...payload]
        default:
            return state
    }
}
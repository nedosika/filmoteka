import {SEARCH_SUCCESS, GET_SEARCH_OPTIONS_SUCCESS} from "../actions/searchActions";

const initialState = {
    byId: {},
    allIds: [],
    options: []
};

export default function searchReducer(state = initialState, {type, payload}) {
    switch (type) {
        case SEARCH_SUCCESS:
            return {
                ...state,
                ...payload
            }
        case GET_SEARCH_OPTIONS_SUCCESS:
            return {
                ...state,
                options: payload
            }
        default:
            return state
    }
}
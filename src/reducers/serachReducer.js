import {ACTION_TYPES} from "../actions";

const initialState = {
    byId: {},
    allIds: [],
    options: []
};

export default function searchReducer(state = initialState, {type, payload}) {
    switch (type) {
        case ACTION_TYPES.Search.SEARCH_SUCCESS:
            return {
                ...state,
                ...payload
            }
        case ACTION_TYPES.Search.GET_SEARCH_OPTIONS_SUCCESS:
            console.log(payload)
            return {
                ...state,
                options: payload
            }
        default:
            return state
    }
}
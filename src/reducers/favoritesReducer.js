import {ACTION_TYPES} from "../actions";

const initialState = {
    isLoading: false,
    favorites: [],
    error: null
}

export default function(state = initialState, {type, payload}){
    switch (type){
        case ACTION_TYPES.Favorites:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case ACTION_TYPES.Favorites.FAVORITES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                favorites: payload
            }
        case ACTION_TYPES.Favorites.FAVORITES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state
    }
}
import {ACTION_TYPES} from "../actions";

const initialState = [];

export default function favoritesReducer(state = initialState, {type, payload}){
    switch (type){
        case ACTION_TYPES.Favorites.FAVORITES_LOADED:
            return [...payload]
        case ACTION_TYPES.Favorites.FAVORITES_ADDED:
            return [...state, payload]
        case ACTION_TYPES.Favorites.FAVORITES_REMOVED:
            return state.filter((film) => film.id !== payload)
        default:
            return state
    }
}
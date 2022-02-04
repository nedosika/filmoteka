import {ACTION_TYPES} from "../actions";

const initialState = {
    isLoading: false,
    error: null,
    data: []
};

export default function favoritesReducer(state = initialState, {type, payload}){
    switch (type){
        case ACTION_TYPES.Favorites.FAVORITES_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case ACTION_TYPES.Favorites.FAVORITES_SUCCESS:
            return {
                isLoading: false,
                error: null,
                data: payload
            }
        case ACTION_TYPES.Favorites.FAVORITES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload,
            }
        case ACTION_TYPES.Favorites.FAVORITES_ADD_SUCCESS:
            return {
                isLoading: false,
                error: null,
                data: [...state.data, payload]
            }
        case ACTION_TYPES.Favorites.FAVORITES_REMOVE_SUCCESS:
            return {
                isLoading: false,
                error: null,
                data: state.data.filter((film) => film.id !== payload)
            }
        default:
            return state
    }
}
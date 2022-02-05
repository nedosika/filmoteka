import {ACTION_TYPES} from "../actions";

const initialState = {
    isLoading: false,
    data: [],
    error: null
};

export default function filmsReducer(state = initialState, {type, payload}){
    switch (type){
        case ACTION_TYPES.Films.FILMS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case ACTION_TYPES.Films.FILMS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload
            }
        case ACTION_TYPES.Films.FILMS_ADD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: [...state.data, payload]
            }
        case ACTION_TYPES.Films.FILMS_REMOVE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: state.data.filter((film) => film.id !== payload.id)
            }
        case ACTION_TYPES.Films.FILMS_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: [...state.data.filter((film) => film.id !== payload.id), payload]
            }
        case ACTION_TYPES.Films.FILMS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state
    }
}
import {ACTION_TYPES} from "../actions";

const initialState = {
    isLoading: false,
    films: [],
    error: null};

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
                films: payload
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
import {ACTION_TYPES} from "../actions";

const initialState = [];

export default function filmsReducer(state = initialState, {type, payload}){
    switch (type){
        case ACTION_TYPES.Films.FILMS_LOADED:
            return [...payload]
        case ACTION_TYPES.Films.FILM_ADDED:
            return [...state, payload]
        case ACTION_TYPES.Films.FILM_REMOVED:
            return state.filter((film) => film.id !== payload.id)
        case ACTION_TYPES.Films.FILM_UPDATED:
            return [...state.filter((film) => film.id !== payload.id), payload]
        default:
            return state
    }
}
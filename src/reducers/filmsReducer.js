import {ACTION_TYPES} from "../actions";

const initialState = {
    films: {
        byId: {},
        allIds: {}
    },
    current: {},
    pages: 0,
    page: 1
};

export default function filmsReducer(state = initialState, {type, payload}){
    switch (type){
        case ACTION_TYPES.Films.FILMS_LOADED:
            return payload
        case ACTION_TYPES.Films.FILM_ADDED:
            return {
                ...state,
                data: [...state.data, payload]
            }
        case ACTION_TYPES.Films.FILM_REMOVED:
            return {
                ...state,
                data: state.data.filter((film) => film.id !== payload.id)
            }
        case ACTION_TYPES.Films.FILM_UPDATED:
            const index = state.data.findIndex((film) => film.id === payload.id);
            return {
                ...state,
                data: [
                    ...state.data.slice(0, index),
                    payload,
                    ...state.data.slice(index + 1)
                ]
            }
        case ACTION_TYPES.Films.FILM_LOADED:
            return {
                ...state,
                current: payload
            }
        default:
            return state
    }
}
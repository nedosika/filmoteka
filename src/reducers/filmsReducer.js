import {FILMS_LOADED, FILM_LOADED} from "../actions/filmsActions";

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
        case FILMS_LOADED:
            return payload
        case FILM_LOADED:
            return {
                ...state,
                current: payload
            }
        default:
            return state
    }
}
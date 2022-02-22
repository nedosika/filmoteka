import {ACTION_TYPES} from "./index";
import {FilmService} from "../services";

const searchFilmsSuccess = (films) => ({
    type: ACTION_TYPES.Search.SEARCH_SUCCESS,
    payload: films
});

const getOptionsSuccess = (result) => ({
    type: ACTION_TYPES.Search.GET_SEARCH_OPTIONS_SUCCESS,
    payload: result.allIds.map((id) => ({id, name: result.byId[id].name}))
});

const searchFilms = (query) => (dispatch) =>
    FilmService
        .getAll({field: 'name', value: query})
        .then((result) => dispatch(searchFilmsSuccess(result)))
        .catch((error) => {
            dispatch(searchFilmsSuccess([]));
            throw new Error(error.message)
        })


const getSearchOptions = (query) => (dispatch) =>
    FilmService
        .getAll({field: 'name', value: query})
        .then((result) => dispatch(getOptionsSuccess(result)))
        .catch(() =>dispatch(getOptionsSuccess([])))

export default {
    searchFilms,
    getSearchOptions
}

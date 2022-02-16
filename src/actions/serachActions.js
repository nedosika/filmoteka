import {ACTION_TYPES} from "./index";
import {FilmService} from "../services";
import {request, success} from "./loadingActions";
import {showNotice} from "./noticeActions";
import {SnackBarSeverities} from "../components/SnackStack";

const searchFilmsSuccess = (films) => ({
    type: ACTION_TYPES.Search.SEARCH_SUCCESS,
    payload: [...films]
});

const getOptionsSuccess = (films) => ({
    type: ACTION_TYPES.Search.GET_SEARCH_OPTIONS_SUCCESS,
    payload: [...films.map(({id, name}) => ({id, name}))]
});

const searchFilms = (query) => (dispatch) => {
    dispatch(request());
    FilmService
        .getAll({field: 'name', value: query})
        .then((films) => dispatch(searchFilmsSuccess(films.data)))
        .catch((error) => dispatch(showNotice(error.message, SnackBarSeverities.error)))
        .finally(() => dispatch(success()))
}

const getSearchOptions = (query) => (dispatch) => {
    dispatch(request());
    FilmService
        .getAll({field: 'name', value: query})
        .then((films) => dispatch(getOptionsSuccess(films.data)))
        .catch((error) => dispatch(showNotice(error.message, SnackBarSeverities.error)))
        .finally(() => dispatch(success()))
}

export default {
    searchFilms,
    getSearchOptions
}

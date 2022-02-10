import {ACTION_TYPES} from "./index";
import {FilmService} from "../services";
import {request, success} from "./loadingActions";

const searchFilmsSuccess = (films) => ({
    type: ACTION_TYPES.Search.SEARCH_SUCCESS,
    payload: films
})

const searchFilms = (text) => (dispatch) => {
    dispatch(request());
    FilmService
        .searchFilms({field: 'name', value: text})
        .then((films) => dispatch(searchFilmsSuccess(films.data)))
        .catch(() => dispatch(searchFilmsSuccess([])))
        .finally(() => dispatch(success()))
}

export default {
    searchFilms
}

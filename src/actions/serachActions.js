import {ACTION_TYPES} from "./index";
import {FilmService} from "../services";
import {request, success} from "./loadingActions";


const searchFilmsSuccess = (films) => ({
    type: ACTION_TYPES.Search.SEARCH_SUCCESS,
    payload: films
})

const searchFilms = (name) => (dispatch) => {
    dispatch(request());
    FilmService
        .getAllFilmsByQuery({field: 'name', value: name})
        .then((films) => dispatch(searchFilmsSuccess(films.data)))
        .catch(() => dispatch(searchFilmsSuccess([])))
        .finally(() => dispatch(success()))
}

export default {
    searchFilms
}

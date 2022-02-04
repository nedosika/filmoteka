import {ACTION_TYPES} from "./index";
import {FilmService} from "../services";

const request = () => ({
    type: ACTION_TYPES.Films.FILMS_REQUEST
});
const success = (token) => ({
    type: ACTION_TYPES.Films.FILMS_SUCCESS,
    payload: token
});
const failure = (errorMessage) => ({
    type: ACTION_TYPES.Films.FILMS_FAILURE,
    payload: errorMessage
});
const addSuccess = (film) => ({
    type: ACTION_TYPES.Films.FILMS_ADD_SUCCESS,
    payload: film
})
const removeSuccess = (film) => ({
    type: ACTION_TYPES.Films.FILMS_REMOVE_SUCCESS,
    payload: film
})

const getFilms = () => (dispatch) => {
    dispatch(request());
    FilmService.getAll()
        .then(({data}) => {
            dispatch(success(data))
        })
        .catch((error) => {
            dispatch(failure(error.message))
        })
}

const addFilm = (film) => (dispatch) => {
    dispatch(request());
    FilmService.addFilm(film)
        .then(({data}) => {
            dispatch(addSuccess(data))
        })
        .catch((error) => {
            dispatch(failure(error.message))
        })
}

const removeFilm = (id) => (dispatch) => {
    dispatch(request());
    FilmService.removeFilm(id)
        .then(({data}) => {
            dispatch(removeSuccess(data))
        })
        .catch((error) => {
            dispatch(failure(error.message))
        })
}

export default {
    getFilms,
    addFilm,
    removeFilm
}
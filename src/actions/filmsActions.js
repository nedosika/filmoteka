import {ACTION_TYPES} from "./index";
import {FilmService} from "../services";
import {request, success, failure} from "./loadingActions";
import {showNotice} from "./noticeActions";
import {SnackBarSeverities} from "../hooks/useSnackBar";

const getFilmsSuccess = (token) => ({
    type: ACTION_TYPES.Films.FILMS_LOADED,
    payload: token
});
const addFilmSuccess = (film) => ({
    type: ACTION_TYPES.Films.FILM_ADDED,
    payload: film
})
const updateFilmSuccess = (film) => ({
    type: ACTION_TYPES.Films.FILM_UPDATED,
    payload: film
})
const removeFilmSuccess = (film) => ({
    type: ACTION_TYPES.Films.FILM_REMOVED,
    payload: film
})

const getFilms = () => (dispatch) => {
    dispatch(request());
    FilmService
        .getAll()
        .then((films) => dispatch(getFilmsSuccess(films.data)))
        .then(() => dispatch(showNotice('films loaded', SnackBarSeverities.success)))
        .catch((error) => dispatch(showNotice(`Error loading films: ${error.message}`, SnackBarSeverities.error)))
        .finally(() => dispatch(success()))
}

const getFilmsByQuery = (query) => (dispatch) => {
    dispatch(request());
    FilmService
        .getAllByQuery(query)
        .then((films) => dispatch(getFilmsSuccess(films.data)))
        .then(() => dispatch(showNotice('films loaded', SnackBarSeverities.success)))
        .catch((error) => dispatch(showNotice(`Error loading films: ${error.message}`, SnackBarSeverities.error)))
        .finally(() => dispatch(success()))
}

const addFilm = (film) => (dispatch) => {
    dispatch(request());
    FilmService
        .addFilm(film)
        .then((film) => dispatch(addFilmSuccess(film.data)))
        .then(() => dispatch(showNotice('Film added', SnackBarSeverities.success)))
        .catch((error) => dispatch(showNotice(`Error adding films: ${error.message}`, SnackBarSeverities.error)))
        .finally(() => dispatch(success()))
}

const updateFilm = (film) => (dispatch) => {
    dispatch(request());
    return FilmService
        .updateFilm(film)
        .then((film) => dispatch(updateFilmSuccess(film.data)))
        .then(() => dispatch(success()))
        .then(() => dispatch(showNotice('Film updated', SnackBarSeverities.success)))
        .catch((error) => dispatch(showNotice(`Error updating films: ${error.message}`, SnackBarSeverities.error)))
        .finally(() => dispatch(success()))
}

const removeFilm = (id) => (dispatch) => {
    dispatch(request());
    FilmService
        .removeFilm(id)
        .then((film) => dispatch(removeFilmSuccess(film.data)))
        .then(() => dispatch(success()))
        .then(() => dispatch(showNotice('Film removed', SnackBarSeverities.success)))
        .catch((error) => dispatch(showNotice(`Error removing films: ${error.message}`, SnackBarSeverities.error)))
        .finally(() => dispatch(success()))
}

export default {
    getFilms,
    addFilm,
    removeFilm,
    updateFilm,
    getFilmsByQuery
}
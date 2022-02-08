import {ACTION_TYPES} from "./index";
import {FilmService} from "../services";
import {request, success, failure} from "./loadingActions";

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
    return FilmService
        .getAll()
        .then((films) => dispatch(getFilmsSuccess(films.data)))
        .then(() => dispatch(success()))
        .catch((error) => dispatch(failure(error)))
}

const addFilm = (film) => (dispatch) => {
    dispatch(request());
    return FilmService
        .addFilm(film)
        .then((film) => dispatch(addFilmSuccess(film.data)))
        .then(() => dispatch(success()))
        .catch((error) => dispatch(failure(error)))
}

const updateFilm = (film) => (dispatch) => {
    dispatch(request());
    return FilmService
        .updateFilm(film)
        .then((film) => dispatch(updateFilmSuccess(film.data)))
        .then(() => dispatch(success()))
        .catch((error) => dispatch(failure(error)))
}

const removeFilm = (id) => (dispatch) => {
    dispatch(request());
    return FilmService
        .removeFilm(id)
        .then((film) => dispatch(removeFilmSuccess(film.data)))
        .then(() => dispatch(success()))
        .catch((error) => dispatch(failure(error)))
}

export default {
    getFilms,
    addFilm,
    removeFilm,
    updateFilm
}
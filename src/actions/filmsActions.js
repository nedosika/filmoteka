import {ACTION_TYPES} from "./index";
import {FilmService} from "../services";
import loadingActions from "./loadingActions";

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

const getFilms = ({request, success, failure}) => () =>  (dispatch) => {
    request();
    FilmService.getAll()
        .then((films) => dispatch(getFilmsSuccess(films.data)))
        .then(success)
        .catch(failure)
}

const addFilm = (film) => (dispatch) => {
    dispatch(loadingActions.request());
    FilmService.addFilm(film)
        .then((film) => dispatch(addFilmSuccess(film.data)))
        .then(() => dispatch(loadingActions.success()))
        .catch((error) => dispatch(loadingActions.failure(error)))
}

const updateFilm = (film) => (dispatch) => {
    dispatch(loadingActions.request());
    FilmService.updateFilm(film)
        .then(({data}) => dispatch(updateFilmSuccess(data)))
        .then(() => dispatch(loadingActions.success()))
        .catch((error) => dispatch(loadingActions.failure(error)))
}

const removeFilm = (id) => (dispatch) => {
    dispatch(loadingActions.request());
    FilmService.removeFilm(id)
        .then(({data}) => dispatch(removeFilmSuccess(data)))
        .then(() => dispatch(loadingActions.success()))
        .catch((error) => dispatch(loadingActions.failure(error)))
}

export default {
    getFilms,
    addFilm,
    removeFilm,
    updateFilm
}
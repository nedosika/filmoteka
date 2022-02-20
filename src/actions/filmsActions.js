import {ACTION_TYPES} from "./index";
import {FilmService} from "../services";
import {showNotice} from "./noticeActions";
import {SnackBarSeverities} from "../components/SnackStack";

const FILMS_PER_PAGE = 5;

const getFilmsSuccess = (films) => ({
    type: ACTION_TYPES.Films.FILMS_LOADED,
    payload: films
});

const getFilmSuccess = (film) => ({
    type: ACTION_TYPES.Films.FILM_LOADED,
    payload: film
});

const getFilm = (id) => (dispatch) =>
    FilmService
        .getOne(id)
        .then(({data}) => dispatch(getFilmSuccess(data)))

const getFilms = (query) => (dispatch) =>
    FilmService
        .getAll({...query, limit: FILMS_PER_PAGE})
        .then(({data, size, limit, page}) =>
            dispatch(getFilmsSuccess({
                data,
                page,
                pages: Math.ceil(size / limit)
            })))

const addFilm = (film) => (dispatch, getState) => {
    const {films: {page}} = getState();
    return FilmService
        .addFilm(film)
        .then(() => dispatch(showNotice('Film added', SnackBarSeverities.success)))
        .then(() => dispatch(getFilms({page})))
}

const updateFilm = (film) => (dispatch, getState) => {
    const {films: {page}} = getState();
    return FilmService
        .updateFilm(film)
        .then(() => dispatch(showNotice('Film updated', SnackBarSeverities.success)))
        .then(() => dispatch(getFilms({page})))
}

const removeFilm = (id) => (dispatch, getState) => {
    const {films: {page}} = getState();
    return FilmService
        .removeFilm(id)
        .then(() => dispatch(showNotice('Film removed', SnackBarSeverities.success)))
        .then(() => dispatch(getFilms({page})))
}

export default {
    getFilm,
    getFilms,
    addFilm,
    removeFilm,
    updateFilm
}
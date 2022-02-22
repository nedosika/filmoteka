import {FilmService} from "../services";
import {showNotice} from "./noticeActions";
import {SnackBarSeverities} from "../components/SnackStack";

const FILMS_PER_PAGE = 5;

export const FILMS_LOADED = 'FILMS_LOADED';
export const FILM_LOADED = 'FILM_LOADED';

const getFilmsSuccess = (payload) => ({
    type: FILMS_LOADED,
    payload
});

const getFilmSuccess = (film) => ({
    type: FILM_LOADED,
    payload: film
});

const getFilm = (id) => (dispatch) =>
    FilmService
        .getOne(id)
        .then(({data}) => dispatch(getFilmSuccess(data)))

const getFilms = (query) => (dispatch) =>
    FilmService
        .getAll({...query, limit: FILMS_PER_PAGE})
        .then((result) => dispatch(getFilmsSuccess(result)))

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
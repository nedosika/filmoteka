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

export default {
    getFilms
}
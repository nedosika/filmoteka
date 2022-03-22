import { FilmService } from '../services';

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const GET_SEARCH_OPTIONS_SUCCESS = 'GET_SEARCH_OPTIONS_SUCCESS';

export const searchFilmsSuccess = (films) => ({
  type: SEARCH_SUCCESS,
  payload: films,
});

export const getOptionsSuccess = (result) => ({
  type: GET_SEARCH_OPTIONS_SUCCESS,
  payload: result.allIds.map((id) => ({ id, name: result.byId[id].name })),
});

export const searchFilms = (query) => (dispatch) =>
  FilmService.getAll({ search: query })
    .then((result) => dispatch(searchFilmsSuccess(result)))
    .catch((error) => {
      dispatch(searchFilmsSuccess([]));
      throw new Error(error.message);
    });

export const getSearchOptions = (query) => (dispatch) =>
  FilmService.getAll({ search: query })
    .then((result) => dispatch(getOptionsSuccess(result)))
    .catch(() => dispatch(getOptionsSuccess([])));

export default {
  searchFilms,
  getSearchOptions,
};

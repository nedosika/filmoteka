import { createAsyncThunk } from '@reduxjs/toolkit';
import { filmReceived, filmUpdated, filmsReceived } from '../reducers/filmsReducer';
import { FilmService } from '../services';

export const FILMS_PER_PAGE = 5;

export const getFilms = createAsyncThunk('films/fetchAll', async (params, thunkAPI) => {
  const user = thunkAPI.getState().auth.user;
  const withUserIdParams = user ? { ...params, userId: user.id } : params;
  const result = await FilmService.getAll(withUserIdParams);
  thunkAPI.dispatch(filmsReceived(result));
});

export const getFilm = createAsyncThunk('films/fetchOne', async (id, thunkAPI) => {
  const result = await FilmService.getOne(id);
  thunkAPI.dispatch(filmReceived(result));
});

export const addFilm = createAsyncThunk('films/addOne', (film, thunkAPI) => FilmService.addFilm(film));

export const removeFilm = createAsyncThunk('films/deleteFilm', (id, thunkAPI) => FilmService.removeFilm(id));

export const updateFilm = createAsyncThunk('films/updateOne', (film) => FilmService.updateFilm(film));

export default {
  removeFilm,
  addFilm,
  updateFilm,
  getFilm,
  getFilms,
};

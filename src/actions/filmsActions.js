import { createAsyncThunk } from '@reduxjs/toolkit';
import { SnackBarSeverities } from '../components/SnackStack';
import { FilmService } from '../services';
import { showNotice } from './noticesActions';

export const FILMS_PER_PAGE = 5;

export const getFilms = createAsyncThunk('films/fetchAll', async (params, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;
    const withUserIdParams = user ? { ...params, userId: user.id } : params;
    return await FilmService.getAll(withUserIdParams);
  } catch (error) {
    thunkAPI.dispatch(showNotice(error.message, SnackBarSeverities.error));
  }
});

export const removeFilm = createAsyncThunk('films/deleteFilm', async (id, thunkAPI) => {
  try {
    await FilmService.removeFilm(id);
    thunkAPI.dispatch(getFilms({ limit: FILMS_PER_PAGE }));
    thunkAPI.dispatch(showNotice('Film removed', SnackBarSeverities.warning));
  } catch (error) {
    thunkAPI.dispatch(showNotice(error.message, SnackBarSeverities.error));
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getFilm = createAsyncThunk('films/fetchOne', async (id, thunkAPI) => {
  try {
    return await FilmService.getOne(id);
  } catch (error) {
    thunkAPI.dispatch(showNotice(error.message, SnackBarSeverities.error));
  }
});

export const updateFilm = createAsyncThunk('films/updateOne', async (film, thunkAPI) => {
  try {
    const response = await FilmService.updateFilm(film);
    thunkAPI.dispatch(showNotice('Film updated', SnackBarSeverities.success));
    return response;
  } catch (error) {
    thunkAPI.dispatch(showNotice(error.message, SnackBarSeverities.error));
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addFilm = createAsyncThunk('films/addOne', async (film, thunkAPI) => {
  try {
    await FilmService.addFilm(film);
    thunkAPI.dispatch(getFilms({ limit: FILMS_PER_PAGE }));
    thunkAPI.dispatch(showNotice('Film added', SnackBarSeverities.success));
  } catch (error) {
    thunkAPI.dispatch(showNotice(error.message, SnackBarSeverities.error));
    return thunkAPI.rejectWithValue(error.message);
  }
});

export default {
  removeFilm,
  addFilm,
  updateFilm,
  getFilm,
  getFilms,
};

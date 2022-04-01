import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmService } from '../services';

export const searchFilms = createAsyncThunk('search/searchFilms', async (params, { rejectWithValue }) => {
  try {
    return await FilmService.getAll({ search: params });
  } catch (error) {
    rejectWithValue('films not found');
  }
});
export const getSearchOptions = createAsyncThunk('search/getOptions', async (params, { rejectWithValue }) => {
  try {
    return await FilmService.getAll({ search: params });
  } catch (error) {
    rejectWithValue('films not found');
  }
});

export default {
  searchFilms,
  getSearchOptions,
};

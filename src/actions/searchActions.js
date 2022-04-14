import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmsService } from '../services';

export const searchFilms = createAsyncThunk('search/searchFilms', async (params, { rejectWithValue }) => {
  try {
    return await FilmsService.getAll({ search: params });
  } catch (error) {
    return rejectWithValue('films not found');
  }
});
export const getSearchOptions = createAsyncThunk('search/getOptions', async (params, { rejectWithValue }) => {
  try {
    return await FilmsService.getAll({ search: params });
  } catch (error) {
    return rejectWithValue('films not found');
  }
});

export default {
  searchFilms,
  getSearchOptions,
};

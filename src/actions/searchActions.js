import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmsService } from '../services';
import api from '../services/api';
import { API_ROUTES } from '../services/config';

export const searchFilms = createAsyncThunk('search/searchFilms', async (params, { rejectWithValue }) => {
  try {
    const { data } = await api(API_ROUTES.films, { queryParams: { search: params } });
    return data;
  } catch (error) {
    return rejectWithValue('films not found');
  }
});
export const getSearchOptions = createAsyncThunk('search/getOptions', async (params, { rejectWithValue }) => {
  try {
    const { data } = await api(API_ROUTES.films, { queryParams: { search: params } });
    return data;
  } catch (error) {
    return rejectWithValue('films not found');
  }
});

export default {
  searchFilms,
  getSearchOptions,
};

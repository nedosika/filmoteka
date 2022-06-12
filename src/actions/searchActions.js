import api from '@Services/api';
import { API_ROUTES } from '@Services/config';
import { createAsyncThunk } from '@reduxjs/toolkit';

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

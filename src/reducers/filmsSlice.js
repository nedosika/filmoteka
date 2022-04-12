import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { addFilm, getFilm, updateFilm } from '../actions/filmsActions';

const filmsAdapter = createEntityAdapter({
  selectId: (film) => film.id,
});

export const slice = createSlice({
  name: 'films',
  initialState: filmsAdapter.getInitialState({
    loading: false,
    error: null,
    current: {},
    pages: 0,
    page: 1,
  }),
  reducers: {
    filmsReceived: (state, { payload }) => {
      state.pages = payload.pages;
      state.page = payload.page;
      filmsAdapter.setAll(state, payload.films);
    },
  },
  extraReducers: {
    [getFilm.fulfilled.type]: (state, { payload: film }) => {
      state.current = film;
    },
    [updateFilm.fulfilled.type]: (state, { payload: film }) => {
      filmsAdapter.updateOne(state, {
        id: film.id,
        changes: film,
      });
    },
    [addFilm.rejected.type]: (state, { payload }) => {
      state.loading = false;
      state.error = payload?.message;
    },
  },
});

export const filmsSelectors = filmsAdapter.getSelectors((state) => state.films);
export const { filmsReceived } = slice.actions;

const reducer = slice.reducer;

export default reducer;

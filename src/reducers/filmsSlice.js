import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getFilm, getFilms, updateFilm } from '../actions/filmsActions';

const filmsAdapter = createEntityAdapter({
  selectId: (film) => film.id,
});

export const slice = createSlice({
  name: 'films',
  initialState: filmsAdapter.getInitialState({
    loading: false,
    current: {},
    pages: 0,
    page: 1,
  }),
  reducers: {},
  extraReducers: {
    [getFilms.pending.type]: (state) => {
      state.loading = true;
    },
    [getFilms.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.pages = payload.pages;
      state.page = payload.page;
      filmsAdapter.setAll(state, payload.films);
    },
    [getFilms.rejected.type]: (state, action) => {
      state.loading = false;
    },
    [getFilm.fulfilled.type]: (state, { payload: film }) => {
      state.current = film;
    },
    [updateFilm.fulfilled.type]: (state, { payload: film }) => {
      filmsAdapter.updateOne(state, {
        id: film.id,
        changes: film,
      });
    },
  },
});

export const filmsSelectors = filmsAdapter.getSelectors((state) => state.films);

const reducer = slice.reducer;

export default reducer;

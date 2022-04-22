import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getSearchOptions, searchFilms } from '../actions/searchActions';

const searchAdapter = createEntityAdapter({
  selectId: (film) => film.id,
});
export const slice = createSlice({
  name: 'search',
  initialState: searchAdapter.getInitialState({
    options: [],
  }),
  reducers: {},
  extraReducers: {
    [searchFilms.fulfilled.type]: (state, action) => {
      searchAdapter.setAll(state, action.payload);
    },
    [searchFilms.rejected.type]: (state) => {
      searchAdapter.setAll(state, []);
    },
    [getSearchOptions.fulfilled.type]: (state, action) => {
      state.options = action.payload ? action.payload : [];
    },
    [getSearchOptions.rejected.type]: (state) => {
      state.options = [];
    },
  },
});

export const searchSelector = searchAdapter.getSelectors((state) => state.search);

const reducer = slice.reducer;

export default reducer;

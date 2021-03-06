import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const filmsAdapter = createEntityAdapter({
  selectId: (film) => film.id,
});

const filmsSlice = createSlice({
  name: 'films',
  initialState: filmsAdapter.getInitialState({
    current: { name: '', genre: '', year: '', img: '', description: '' },
    pages: 0,
    page: 1,
  }),
  reducers: {
    filmsReceived: (state, { payload }) => {
      state.pages = payload.pages;
      state.page = payload.page;
      filmsAdapter.setAll(state, payload.films);
    },
    filmAdded: filmsAdapter.addOne,
    filmUpdated: (state, { payload }) => {
      const { id, ...changes } = payload;
      filmsAdapter.updateOne(state, { id, changes });
    },
    filmRemoved: filmsAdapter.removeOne,
    filmReceived: (state, { payload }) => {
      state.current = payload;
    },
  },
});

export const filmsSelectors = filmsAdapter.getSelectors((state) => state.films);
export const { filmsReceived, filmReceived, filmAdded, filmUpdated, filmRemoved } = filmsSlice.actions;

export default filmsSlice.reducer;

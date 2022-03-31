import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  byId: {},
  allIds: [],
  current: {},
  pages: 0,
  page: 1,
};

export const slice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    filmsFetching(state) {
      state.loading = true;
    },
    filmsFetchingSuccess(state, action) {
      state.loading = false;
      state.error = '';
      state.byId = action.payload.byId;
      state.allIds = action.payload.allIds;
      state.pages = action.payload.pages;
      state.page = action.payload.page;
    },
    filmFetchingSuccess(state, action) {
      state.loading = false;
      state.current = action.payload;
      state.error = '';
    },
    filmsFetchingError(state, action) {
      state.lodaing = false;
      state.error = action.payload;
    },
  },
});

const reducer = slice.reducer;

export default reducer;

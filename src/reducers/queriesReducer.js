import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const queriesAdapter = createEntityAdapter({
  selectId: (query) => query.id,
});

const queriesSlice = createSlice({
  name: 'queries',
  initialState: queriesAdapter.getInitialState(),
  reducers: {
    addQuery: queriesAdapter.addOne,
    removeQuery: queriesAdapter.removeOne,
    updateQuery: queriesAdapter.updateOne,
  },
});

export const queriesSelector = queriesAdapter.getSelectors((state) => state.queries);

export const { addQuery, removeQuery, updateQuery } = queriesSlice.actions;

export default queriesSlice.reducer;

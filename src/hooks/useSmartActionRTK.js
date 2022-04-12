import { createAsyncThunk } from '@reduxjs/toolkit';
import { filmsReceived } from '../reducers/filmsSlice';
import { addQuery, removeQuery, updateQuery } from '../reducers/queriesReducer';

const useSmartActionRTK = (query) => {
  const queryId = `queries/${new Date() + Math.random()}`;
  return createAsyncThunk(queryId, async (params, thunkAPI) => {
    thunkAPI.dispatch(addQuery({ id: queryId, progress: 'pending' }));
    try {
      const result = await query(params);
      thunkAPI.dispatch(updateQuery({ id: queryId, progress: 'fulfilled' }));
      thunkAPI.dispatch(filmsReceived(result));
      return result;
    } catch (error) {
      thunkAPI.dispatch(updateQuery({ id: queryId, progress: 'rejected', message: error.message }));
    }
  });
};

export default useSmartActionRTK;

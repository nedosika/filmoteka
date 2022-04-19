import { useDispatch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { bindActionCreators } from 'redux';
import { showNotice } from '../actions/noticesActions';
import { SnackBarSeverities } from '../components/SnackStack';
import ValidationError from '../helpers/ValidationError';
import { addQuery, removeQuery, updateQuery } from '../reducers/queriesReducer';

const useSmartActionRTK = (action, options) => {
  const dispatch = useDispatch();

  const queryId = `queries/${new Date().getTime() + Math.random()}`;
  const notices = Object.assign({ pending: false, fulfilled: false, rejected: true }, options?.notices);
  const done = options?.done;

  return bindActionCreators(
    createAsyncThunk(queryId, async (params, thunkAPI) => {
      thunkAPI.dispatch(addQuery({ id: queryId, progress: 'pending' }));
      notices.pending && thunkAPI.dispatch(showNotice(notices.pending));
      try {
        await thunkAPI.dispatch(action(params));
        thunkAPI.dispatch(updateQuery({ id: queryId, progress: 'fulfilled' }));
        notices.fulfilled && thunkAPI.dispatch(showNotice(notices.fulfilled));
        done && done();
      } catch (error) {
        thunkAPI.dispatch(updateQuery({ id: queryId, progress: 'rejected', message: error.message }));
        const message = typeof notices.rejected === 'string' ? notices.rejected : error.message;
        notices.rejected && thunkAPI.dispatch(showNotice(message, SnackBarSeverities.error));
        error instanceof ValidationError && done ? done({ status: 'validation error', data: error.data }) : done();
      } finally {
        thunkAPI.dispatch(removeQuery(queryId));
      }
    }),
    dispatch,
  );
};

export default useSmartActionRTK;

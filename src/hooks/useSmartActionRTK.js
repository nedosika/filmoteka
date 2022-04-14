import { useDispatch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { bindActionCreators } from 'redux';
import { showNotice } from '../actions/noticesActions';
import { SnackBarSeverities } from '../components/SnackStack';
import { addQuery, removeQuery, updateQuery } from '../reducers/queriesReducer';

const useSmartActionRTK = (action, options, done) => {
  const dispatch = useDispatch();

  const queryId = `queries/${new Date().getTime() + Math.random()}`;
  const notices = Object.assign({ pending: false, fulfilled: false, rejected: true }, options?.notices);

  return bindActionCreators(
    createAsyncThunk(queryId, async (params, thunkAPI) => {
      thunkAPI.dispatch(addQuery({ id: queryId, progress: 'pending' }));
      notices.pending && thunkAPI.dispatch(showNotice(notices.pending));
      try {
        await thunkAPI.dispatch(action(params));
        thunkAPI.dispatch(updateQuery({ id: queryId, progress: 'fulfilled' }));
        notices.fulfilled && thunkAPI.dispatch(showNotice(notices.fulfilled));
      } catch (error) {
        thunkAPI.dispatch(updateQuery({ id: queryId, progress: 'rejected', message: error.message }));
        //TODO: ponder about showing custom or server error message
        notices.rejected && thunkAPI.dispatch(showNotice(error.message, SnackBarSeverities.error));
      } finally {
        thunkAPI.dispatch(removeQuery(queryId));
        done && done();
      }
    }),
    dispatch,
  );
};

export default useSmartActionRTK;

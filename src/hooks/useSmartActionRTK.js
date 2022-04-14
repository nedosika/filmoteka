import { useDispatch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { bindActionCreators } from 'redux';
import { showNotice } from '../actions/noticesActions';
import { SnackBarSeverities } from '../components/SnackStack';
import { addQuery, removeQuery, updateQuery } from '../reducers/queriesReducer';

const useSmartActionRTK = (
  query,
  action,
  options = { notices: { pending: false, fulfilled: false, rejected: true } },
  done,
) => {
  const dispatch = useDispatch();

  const queryId = `queries/${new Date().getTime() + Math.random()}`;

  return bindActionCreators(
    createAsyncThunk(queryId, async (params, thunkAPI) => {
      thunkAPI.dispatch(addQuery({ id: queryId, progress: 'pending' }));
      options.notices.pending && thunkAPI.dispatch(showNotice(options.notices.pending));
      try {
        const result = await query(params);
        thunkAPI.dispatch(action(result));
        thunkAPI.dispatch(updateQuery({ id: queryId, progress: 'fulfilled' }));
        options.notices.fulfilled && thunkAPI.dispatch(showNotice(options.notices.fulfilled));
      } catch (error) {
        thunkAPI.dispatch(updateQuery({ id: queryId, progress: 'rejected', message: error.message }));
        //TODO: ponder about showing custom or server error message
        options.notices.rejected && thunkAPI.dispatch(showNotice(error.message, SnackBarSeverities.error));
      } finally {
        thunkAPI.dispatch(removeQuery(queryId));
        done && done();
      }
    }),
    dispatch,
  );
};

export default useSmartActionRTK;

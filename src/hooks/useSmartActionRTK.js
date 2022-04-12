import { useDispatch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { bindActionCreators } from 'redux';
import { showNotice } from '../actions/noticesActions';
import { SnackBarSeverities } from '../components/SnackStack';
import { filmsReceived } from '../reducers/filmsSlice';
import { addQuery, removeQuery, updateQuery } from '../reducers/queriesReducer';

const useSmartActionRTK = (query, options = { notices: { pending: false, fulfilled: false, rejected: true } }) => {
  const dispatch = useDispatch();

  const queryId = `queries/${new Date().getTime() + Math.random()}`;

  return bindActionCreators(
    createAsyncThunk(queryId, async (params, thunkAPI) => {
      thunkAPI.dispatch(addQuery({ id: queryId, progress: 'pending' }));
      options.notices.pending && thunkAPI.dispatch(showNotice(options.notices.pending));
      try {
        const result = await query(params);
        thunkAPI.dispatch(updateQuery({ id: queryId, progress: 'fulfilled' }));
        thunkAPI.dispatch(filmsReceived(result));
        options.notices.fulfilled && thunkAPI.dispatch(showNotice(options.notices.fulfilled));
        return result;
      } catch (error) {
        thunkAPI.dispatch(updateQuery({ id: queryId, progress: 'rejected', message: error.message }));
        //TODO: ponder about showing custom or server error message
        options.notices.rejected && thunkAPI.dispatch(showNotice(error.message, SnackBarSeverities.error));
      } finally {
        thunkAPI.dispatch(removeQuery(queryId));
      }
    }),
    dispatch,
  );
};

export default useSmartActionRTK;

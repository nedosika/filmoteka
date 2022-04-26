import { useDispatch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { bindActionCreators } from 'redux';
import { showNotice } from '../actions/noticesActions';
import { SnackBarSeverities } from '../components/SnackStack';
import { QUERIES_PAYLOAD, addQuery, removeQuery, updateQuery } from '../reducers/queriesReducer';

export const SMART_ACTION_OPTIONS = {
  pending: 'pending',
  success: 'success',
  error: 'error',
};

const useSmartActionRTK = (action, options) => {
  const dispatch = useDispatch();

  const queryId = `queries/${new Date().getTime() + Math.random()}`;

  const notices = {
    [SMART_ACTION_OPTIONS.pending]: () => false,
    [SMART_ACTION_OPTIONS.success]: () => false,
    [SMART_ACTION_OPTIONS.error]: () => true,
    ...options,
  };

  return bindActionCreators(
    createAsyncThunk(queryId, async (params, thunkAPI) => {
      thunkAPI.dispatch(
        addQuery({
          [QUERIES_PAYLOAD.id]: queryId,
          [QUERIES_PAYLOAD.progress.name]: QUERIES_PAYLOAD.progress.type.pending,
        }),
      );
      const pendingMessage = notices[SMART_ACTION_OPTIONS.pending](queryId);
      pendingMessage && thunkAPI.dispatch(showNotice(pendingMessage));
      try {
        await thunkAPI.dispatch(action(params));
        thunkAPI.dispatch(
          updateQuery({
            [QUERIES_PAYLOAD.id]: queryId,
            [QUERIES_PAYLOAD.progress.name]: QUERIES_PAYLOAD.progress.type.success,
          }),
        );
        const successMessage = notices[SMART_ACTION_OPTIONS.success]();
        successMessage && thunkAPI.dispatch(showNotice(successMessage));
      } catch (error) {
        thunkAPI.dispatch(
          updateQuery({
            [QUERIES_PAYLOAD.id]: queryId,
            [QUERIES_PAYLOAD.progress.name]: QUERIES_PAYLOAD.progress.type.error,
            [QUERIES_PAYLOAD.message]: error.message,
          }),
        );
        const errorMessage = notices[SMART_ACTION_OPTIONS.error](error);
        errorMessage && thunkAPI.dispatch(showNotice(errorMessage), SnackBarSeverities.error);
      } finally {
        thunkAPI.dispatch(removeQuery(queryId));
      }
    }),
    dispatch,
  );
};

export default useSmartActionRTK;

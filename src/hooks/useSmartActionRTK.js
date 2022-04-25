import { useDispatch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { bindActionCreators } from 'redux';
import { showNotice } from '../actions/noticesActions';
import { SnackBarSeverities } from '../components/SnackStack';
import ValidationError from '../helpers/ValidationError';
import { QUERIES_PAYLOAD, addQuery, removeQuery, updateQuery } from '../reducers/queriesReducer';

export const SMART_ACTION_OPTIONS = {
  notices: 'notices',
  done: 'done',
};

export const SMART_ACTION_NOTICES_OPTION = {
  pending: 'pending',
  success: 'success',
  error: 'error',
};

const useSmartActionRTK = (action, { notices, done }) => {
  const dispatch = useDispatch();

  const queryId = `queries/${new Date().getTime() + Math.random()}`;

  return bindActionCreators(
    createAsyncThunk(queryId, async (params, thunkAPI) => {
      thunkAPI.dispatch(
        addQuery({
          [QUERIES_PAYLOAD.id]: queryId,
          [QUERIES_PAYLOAD.progress.name]: QUERIES_PAYLOAD.progress.type.pending,
        }),
      );
      notices[SMART_ACTION_NOTICES_OPTION.pending] &&
        thunkAPI.dispatch(showNotice(notices[SMART_ACTION_NOTICES_OPTION.pending]));
      try {
        await thunkAPI.dispatch(action(params));
        thunkAPI.dispatch(
          updateQuery({
            [QUERIES_PAYLOAD.id]: queryId,
            [QUERIES_PAYLOAD.progress.name]: QUERIES_PAYLOAD.progress.type.success,
          }),
        );
        notices[SMART_ACTION_NOTICES_OPTION.success] &&
          thunkAPI.dispatch(showNotice(notices[SMART_ACTION_NOTICES_OPTION.success]));
        done();
      } catch (error) {
        thunkAPI.dispatch(
          updateQuery({
            [QUERIES_PAYLOAD.id]: queryId,
            [QUERIES_PAYLOAD.progress.name]: QUERIES_PAYLOAD.progress.type.error,
            [QUERIES_PAYLOAD.message]: error.message,
          }),
        );
        const message =
          typeof notices[SMART_ACTION_NOTICES_OPTION.error] === 'string'
            ? notices[SMART_ACTION_NOTICES_OPTION.error]
            : error.message;
        notices[SMART_ACTION_NOTICES_OPTION.error] && thunkAPI.dispatch(showNotice(message, SnackBarSeverities.error));
        (error instanceof ValidationError && done({ status: 'validation error', data: error.data })) || done();
      } finally {
        thunkAPI.dispatch(removeQuery(queryId));
      }
    }),
    dispatch,
  );
};

export default useSmartActionRTK;

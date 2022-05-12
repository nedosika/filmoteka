import { useState } from 'react';
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

const getMessage = (option, result) => (typeof option === 'function' ? option(result) : option);

const useSmartActionRTK = (action, options) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const queryId = `queries/${new Date().getTime() + Math.random()}`;

  const notices = {
    [SMART_ACTION_OPTIONS.pending]: false,
    [SMART_ACTION_OPTIONS.success]: false,
    [SMART_ACTION_OPTIONS.error]: true,
    ...options,
  };

  return {
    action: bindActionCreators(
      createAsyncThunk(queryId, async (params, thunkAPI) => {
        setIsLoading(true);
        thunkAPI.dispatch(
          addQuery({
            [QUERIES_PAYLOAD.id]: queryId,
            [QUERIES_PAYLOAD.progress.name]: QUERIES_PAYLOAD.progress.type.pending,
          }),
        );
        const pendingMessage = getMessage(notices[SMART_ACTION_OPTIONS.pending]);
        pendingMessage && thunkAPI.dispatch(showNotice(pendingMessage));

        try {
          const result = await thunkAPI.dispatch(action(params));
          thunkAPI.dispatch(
            updateQuery({
              [QUERIES_PAYLOAD.id]: queryId,
              [QUERIES_PAYLOAD.progress.name]: QUERIES_PAYLOAD.progress.type.success,
            }),
          );
          const successMessage = getMessage(notices[SMART_ACTION_OPTIONS.success], result);
          successMessage && thunkAPI.dispatch(showNotice(successMessage));
        } catch (error) {
          thunkAPI.dispatch(
            updateQuery({
              [QUERIES_PAYLOAD.id]: queryId,
              [QUERIES_PAYLOAD.progress.name]: QUERIES_PAYLOAD.progress.type.error,
              [QUERIES_PAYLOAD.message]: error.message,
            }),
          );

          const errorMessage = getMessage(notices[SMART_ACTION_OPTIONS.error]);

          errorMessage &&
            thunkAPI.dispatch(
              showNotice(typeof errorMessage === 'string' ? errorMessage : error.message, SnackBarSeverities.error),
            );
          setError(error);
        } finally {
          thunkAPI.dispatch(removeQuery(queryId));
          setIsLoading(false);
        }
      }),
      dispatch,
    ),
    isLoading,
    error,
  };
};

export default useSmartActionRTK;

import { AuthService } from '../services';
import { failureLoading, startLoading, successLoading } from './loadingActions';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_SIGNOUT = 'AUTH_SIGNOUT';

const authSuccess = (payload) => {
  localStorage.setItem('auth', JSON.stringify(payload));

  return {
    type: AUTH_SUCCESS,
    payload,
  };
};

const authFailure = () => {
  localStorage.removeItem('auth');

  return {
    type: AUTH_SIGNOUT,
  };
};

export const signIn = (email, password) => (dispatch) => {
  dispatch(startLoading());

  return AuthService.signIn(email, password)
    .then((data) => {
      dispatch(authSuccess(data));
    })
    .then(() => dispatch(successLoading()))
    .catch((error) => dispatch(failureLoading(error.message)));
};

export const signUp = (email, password) => (dispatch) => {
  dispatch(startLoading());

  return AuthService.signUp(email, password)
    .then((data) => {
      dispatch(authSuccess(data));
    })
    .then(() => dispatch(successLoading()))
    .catch((error) => dispatch(failureLoading(error.message)));
};

export const signOut = () => (dispatch) => dispatch(authFailure());

export const refreshAuth = (payload) => (dispatch) => dispatch(authSuccess(payload.data));

export default {
  signIn,
  signOut,
  signUp,
  refreshAuth,
};

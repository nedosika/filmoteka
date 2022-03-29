import { AuthService } from '../services';
import { failureLoading, startLoading, successLoading } from './loadingActions';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_SIGNOUT = 'AUTH_SIGNOUT';

const authSuccess = (payload) => ({
  type: AUTH_SUCCESS,
  payload,
});

const authFailure = () => ({
  type: AUTH_SIGNOUT,
});

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

  AuthService.signUp(email, password)
    .then((data) => {
      dispatch(authSuccess(data));
    })
    .then(() => dispatch(successLoading()))
    .catch((error) => dispatch(failureLoading(error.message)));
};

export const signOut = () => (dispatch) => {
  console.log('signout');
  localStorage.removeItem('auth');
  dispatch(authFailure());
};

export const checkAuth = () => (dispatch) => {
  return AuthService.checkAuth()
    .then((data) => {
      dispatch(authSuccess(data));
    })
    .catch((err) => {
      dispatch(authFailure());
    });
};

export default {
  signIn,
  signOut,
  signUp,
  checkAuth,
};

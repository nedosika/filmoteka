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
    .then(({ data }) => {
      localStorage.setItem('auth', JSON.stringify(data));
      dispatch(authSuccess(data));
    })
    .then(() => dispatch(successLoading()))
    .catch((error) => dispatch(failureLoading(error.message)));
};

export const signUp = (email, password) => (dispatch) => {
  dispatch(startLoading());

  AuthService.signUp(email, password)
    .then(({ data }) => {
      localStorage.setItem('auth', JSON.stringify(data));
      dispatch(authSuccess(data));
    })
    .then(() => dispatch(successLoading()))
    .catch((error) => dispatch(failureLoading(error.message)));
};

export const signOut = () => (dispatch) => {
  localStorage.removeItem('auth');
  dispatch(authFailure());
};

export const refreshToken = () => (dispatch) => {
  const auth = JSON.parse(localStorage.getItem('auth'));

  return AuthService.checkAuth(auth?.token)
    .then(({ data }) => {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          token: data.accessToken,
          user: data.user,
          id: data.user.id,
        }),
      );
      dispatch(
        authSuccess({
          token: data.accessToken,
          user: data.user,
        }),
      );
    })
    .catch((err) => {
      localStorage.removeItem('auth');
      dispatch(authFailure());
    });
};

export default {
  signIn,
  signOut,
  signUp,
  refreshToken,
};

import authReducer from '@Reducers/authReducer';
import { favoritesAPI } from '@Reducers/favoritesReducer';
import filmsReducer from '@Reducers/filmsReducer';
import loadingReducer from '@Reducers/loadingReducer';
import noticesReducer from '@Reducers/noticesReducer';
import queriesReducer from '@Reducers/queriesReducer';
import searchReducer from '@Reducers/searchReducer';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  films: filmsReducer,
  queries: queriesReducer,
  auth: authReducer,
  loading: loadingReducer,
  notices: noticesReducer,
  search: searchReducer,
  [favoritesAPI.reducerPath]: favoritesAPI.reducer,
});

export const createReduxStore = (initialState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(favoritesAPI.middleware),
  });
};

export default {
  createReduxStore,
};

//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(favoritesAPI.middleware),

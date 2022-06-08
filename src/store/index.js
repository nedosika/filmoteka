import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from 'reducers/authReducer';
import { favoritesAPI } from 'reducers/favoritesReducer';
import filmsReducer from 'reducers/filmsReducer';
import loadingReducer from 'reducers/loadingReducer';
import noticesReducer from 'reducers/noticesReducer';
import queriesReducer from 'reducers/queriesReducer';
import searchReducer from 'reducers/searchReducer';
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

//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(favoritesAPI.middleware),

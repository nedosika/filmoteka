import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './reducers/authReducer';
import { favoritesAPI } from './reducers/favoritesReducer';
import filmsReducer from './reducers/filmsReducer';
import loadingReducer from './reducers/loadingReducer';
import noticesReducer from './reducers/noticesReducer';
import queriesReducer from './reducers/queriesReducer';
import searchReducer from './reducers/searchReducer';

export default configureStore({
  reducer: {
    films: filmsReducer,
    queries: queriesReducer,
    auth: authReducer,
    loading: loadingReducer,
    notices: noticesReducer,
    search: searchReducer,
    [favoritesAPI.reducerPath]: favoritesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, favoritesAPI.middleware),
});

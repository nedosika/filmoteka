import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './reducers/authReducer';
import { favoritesAPI } from './reducers/favoritesReducer';
import filmsReducer from './reducers/filmsSlice';
import loadingReducer from './reducers/loadingReducer';
import noticesReducer from './reducers/noticesReducer';
import searchReducer from './reducers/searchSlice';

export default configureStore({
  reducer: {
    films: filmsReducer,
    auth: authReducer,
    loading: loadingReducer,
    notices: noticesReducer,
    search: searchReducer,
    [favoritesAPI.reducerPath]: favoritesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, favoritesAPI.middleware),
});

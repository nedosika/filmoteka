import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './reducers/authReducer';
import filmsReducer from './reducers/filmsSlice';
import loadingReducer from './reducers/loadingReducer';
import noticesReducer from './reducers/noticesReducer';
import searchReducer from './reducers/searchSlice';
import { favoritesAPI } from './services/FavoritesService';

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

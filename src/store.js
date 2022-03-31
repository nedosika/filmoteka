import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './reducers/authReducer';
import favoritesReducer from './reducers/favoritesReducer';
import filmsReducer from './reducers/filmsSlice';
import loadingReducer from './reducers/loadingReducer';
import noticesReducer from './reducers/noticesReducer';
import searchReducer from './reducers/serachReducer';

//import { filmsAPI } from './services';

export default configureStore({
  reducer: {
    films: filmsReducer,
    auth: authReducer,
    favorites: favoritesReducer,
    loading: loadingReducer,
    notices: noticesReducer,
    search: searchReducer,
    //[filmsAPI.reducerPath]: filmsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  //, filmsAPI.middleware
});

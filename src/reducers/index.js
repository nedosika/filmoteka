import { combineReducers } from 'redux';
import auth from './authReducer';
import favorites from './favoritesReducer';
import films from './filmsReducer';
import loading from './loadingReducer';
import notices from './noticesReducer';
import search from './serachReducer';

const rootReducer = combineReducers({
  auth,
  films,
  search,
  notices,
  loading,
  favorites,
});

export default rootReducer;

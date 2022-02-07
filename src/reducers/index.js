import {combineReducers} from "redux";

import auth from "./authReducer";
import films from "./filmsReducer";
import user from "./userReducer";
import favorites from "./favoritesReducer";
import loading from "./loadingReducer";

const rootReducer = combineReducers({auth, films, user, favorites, loading});

export default rootReducer;
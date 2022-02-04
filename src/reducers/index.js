import {combineReducers} from "redux";

import auth from "./authReducer";
import films from "./filmsReducer";
import user from "./userReducer";
import favorites from "./favoritesReducer";

const rootReducer = combineReducers({auth, films, user, favorites});

export default rootReducer;
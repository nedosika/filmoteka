import {combineReducers} from "redux";

import auth from "./authReducer";
import films from "./filmsReducer";
import user from "./userReducer";

const rootReducer = combineReducers({auth, films, user});

export default rootReducer;
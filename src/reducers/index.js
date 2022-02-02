import {combineReducers} from "redux";

import auth from "./authReducer";
import films from "./filmsReducer";

const rootReducer = combineReducers({auth, films});

export default rootReducer;
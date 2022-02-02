import {combineReducers} from "redux";

import auth from "./authReducer";
import films from "./filmsReducer";

export const SELECTORS = {
    auth: ({auth}) => auth,
    films: ({films}) => films
}

const rootReducer = combineReducers({auth, films});

export default rootReducer;
import {combineReducers} from "redux";

import auth from "./authReducer";

export const SELECTORS = {
    auth: (state) => state.auth
}

const rootReducer = combineReducers({auth});

export default rootReducer;
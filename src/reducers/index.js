import {combineReducers} from "redux";

import auth from "./authReducer";
import user from "./userReducer";
import films from "./filmsReducer";
import search from "./serachReducer";
import notices from "./noticesReducer";
import loading from "./loadingReducer";
import favorites from "./favoritesReducer";

const rootReducer = combineReducers({
    auth,
    user,
    films,
    search,
    notices,
    loading,
    favorites
});

export default rootReducer;
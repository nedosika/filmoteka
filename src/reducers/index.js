import {combineReducers} from "redux";

import auth from "./authReducer";
import user from "./userReducer";
import films from "./filmsReducer";
import loading from "./loadingReducer";
import favorites from "./favoritesReducer";
import search from "./serachReducer";
import notice from "./noticeReducer";

const rootReducer = combineReducers({
    auth,
    films,
    user,
    favorites,
    loading,
    search,
    notice
});

export default rootReducer;
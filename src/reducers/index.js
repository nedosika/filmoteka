import {combineReducers} from "redux";

import auth from "./authReducer";
import user from "./userReducer";
import films from "./filmsReducer";
import notice from "./noticeReducer";
import loading from "./loadingReducer";
import favorites from "./favoritesReducer";
import search from "./serachReducer";

const rootReducer = combineReducers({
    auth,
    films,
    user,
    favorites,
    loading,
    notice,
    search
});

export default rootReducer;
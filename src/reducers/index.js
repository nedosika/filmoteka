import {combineReducers} from "redux";

import auth from "./authReducer";
import user from "./userReducer";
import films from "./filmsReducer";
import search from "./serachReducer";
import notice from "./noticeReducer";
import loading from "./loadingReducer";
import favorites from "./favoritesReducer";

const rootReducer = combineReducers({
    auth,
    user,
    films,
    search,
    notice,
    loading,
    favorites
});

export default rootReducer;
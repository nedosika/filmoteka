import authActionCreator from "./authActions";
import userActionCreator from "./userActions";
import filmsActionCreator from "./filmsActions";
import noticesActions from "./noticesActions";
import noticeActionCreator from "./noticesActions";
import searchActionCreators from "./searchActions";
import favoritesActionCreator from "./favoritesActions";
import loadingActions from "./loadingActions";

export const ACTION_TYPES = {
    Auth: {
        AUTH_SUCCESS: 'AUTH_SUCCESS',
        AUTH_SIGNOUT: 'AUTH_SIGNOUT'
    },
    User: {
        USER_REQUEST: 'USER_REQUEST',
        USER_SUCCESS: 'USER_SUCCESS',
        USER_FAILURE: 'USER_FAILURE'
    },
    Favorites: {
        FAVORITES_LOADED: 'FAVORITES_LOADED',
        FAVORITES_ADDED: 'FAVORITES_ADDED',
        FAVORITES_REMOVED: 'FAVORITES_REMOVED'
    },
    Search: {
        SEARCH_SUCCESS: 'SEARCH_SUCCESS',
        GET_SEARCH_OPTIONS_SUCCESS: 'GET_SEARCH_OPTIONS_SUCCESS'
    }
};

export const ActionCreators = {
    ...noticesActions,
    ...authActionCreator,
    ...userActionCreator,
    ...filmsActionCreator,
    ...noticeActionCreator,
    ...searchActionCreators,
    ...favoritesActionCreator,
    ...loadingActions
}

export default ActionCreators;
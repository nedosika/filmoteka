import authActionCreator from "./authActions";
import userActionCreator from "./userActions";
import filmsActionCreator from "./filmsActions";
import noticeActionCreator from "./noticeActions";
import favoritesActionCreator from "./favoritesActions";

export const ACTION_TYPES = {
    Loading: {
        REQUEST: 'REQUEST',
        SUCCESS: 'SUCCESS',
        FAILURE: 'FAILURE'
    },
    Auth: {
        AUTH_SUCCESS: 'AUTH_SUCCESS',
        AUTH_SIGNOUT: 'AUTH_SIGNOUT'
    },
    Films: {
        FILMS_LOADED: 'FILMS_LOADED',
        FILM_ADDED: 'FILM_ADDED',
        FILM_REMOVED: 'FILM_REMOVED',
        FILM_UPDATED: 'FILM_UPDATED'
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
    Notice: {
        SHOW_NOTICE: 'SHOW_NOTICE',
        HIDE_NOTICE: 'HIDE_NOTICE'
    }
};

export const ActionCreators = {
    ...authActionCreator,
    ...userActionCreator,
    ...filmsActionCreator,
    ...noticeActionCreator,
    ...favoritesActionCreator,
}

export default ActionCreators;
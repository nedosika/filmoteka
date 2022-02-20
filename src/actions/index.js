import dialogsActions from "./dialogsActions";
import authActionCreator from "./authActions";
import userActionCreator from "./userActions";
import filmsActionCreator from "./filmsActions";
import snackStackActions from "./noticeActions";
import noticeActionCreator from "./noticeActions";
import searchActionCreators from "./searchActions";
import favoritesActionCreator from "./favoritesActions";
import loadingActions from "./loadingActions";

export const ACTION_TYPES = {
    Auth: {
        AUTH_SUCCESS: 'AUTH_SUCCESS',
        AUTH_SIGNOUT: 'AUTH_SIGNOUT'
    },
    Films: {
        FILMS_LOADED: 'FILMS_LOADED',
        FILM_LOADED: 'FILM_LOADED',
        FILM_ADDED: 'FILM_ADDED',
        FILM_REMOVED: 'FILM_REMOVED',
        FILM_UPDATED: 'FILM_UPDATED',
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
    },
    Notice: {
        ADD_NOTICE: 'ADD_NOTICE',
        DISABLE_NOTICE: 'DISABLE_NOTICE',
        REMOVE_NOTICE: 'REMOVE_NOTICE'
    },
    Dialog: {
        PUSH_DIALOG: 'PUSH_DIALOG',
        POP_DIALOG: 'POP_DIALOG'
    }
};

export const ActionCreators = {
    ...dialogsActions,
    ...snackStackActions,
    ...authActionCreator,
    ...userActionCreator,
    ...filmsActionCreator,
    ...noticeActionCreator,
    ...searchActionCreators,
    ...favoritesActionCreator,
    ...loadingActions
}

export default ActionCreators;
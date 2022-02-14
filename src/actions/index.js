import authActionCreator from "./authActions";
import userActionCreator from "./userActions";
import filmsActionCreator from "./filmsActions";
import noticeActionCreator from "./noticeActions";
import searchActionCreators from "./serachActions";
import favoritesActionCreator from "./favoritesActions";
import snackStackActions from "./noticeActions";

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
        ADD_SNACK: 'ADD_SNACK',
        DISABLE_SNACK: 'DISABLE_SNACK',
        REMOVE_SNACK: 'REMOVE_SNACK'
    }
};

export const ActionCreators = {
    ...authActionCreator,
    ...userActionCreator,
    ...filmsActionCreator,
    ...noticeActionCreator,
    ...searchActionCreators,
    ...favoritesActionCreator,
    ...snackStackActions
}

export default ActionCreators;
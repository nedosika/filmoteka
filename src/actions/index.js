import authActionCreator from "./authActions";
import filmsActionCreator from "./filmsActions";
import userActionCreator from "./userActions";
import favoritesCreator from "./favoritesActions";

export const ACTION_TYPES = {
    Auth: {
        AUTH_REQUEST: 'AUTH_REQUEST',
        AUTH_SUCCESS: 'AUTH_SUCCESS',
        AUTH_FAILURE: 'AUTH_FAILURE',
        AUTH_SIGNOUT: 'AUTH_SIGNOUT'
    },
    Films: {
        FILMS_REQUEST: 'FILMS_REQUEST',
        FILMS_SUCCESS: 'FILMS_SUCCESS',
        FILMS_FAILURE: 'FILMS_FAILURE',
        FILMS_ADD_SUCCESS: 'FILMS_ADD_SUCCESS',
        FILMS_REMOVE_SUCCESS: 'FILMS_REMOVE_SUCCESS'
    },
    User: {
        USER_REQUEST: 'USER_REQUEST',
        USER_SUCCESS: 'USER_SUCCESS',
        USER_FAILURE: 'USER_FAILURE'
    },
    Favorites: {
        FAVORITES_REQUEST: 'FAVORITES_REQUEST',
        FAVORITES_SUCCESS: 'FAVORITES_SUCCESS',
        FAVORITES_FAILURE: 'FAVORITES_FAILURE',
        FAVORITES_ADD_SUCCESS: 'FAVORITES_ADD_SUCCESS',
        FAVORITES_REMOVE_SUCCESS: 'FAVORITES_REMOVE_SUCCESS'

    },
};

export const ActionCreators = {
    ...authActionCreator,
    ...filmsActionCreator,
    ...userActionCreator,
    ...favoritesCreator
}

export default ActionCreators;
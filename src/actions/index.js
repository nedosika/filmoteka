import authActionCreator from "./authActions";
import filmsActionCreator from "./filmsActions";
import userActionCreator from "./userActions";
import favoritesActionCreator from "./favoritesActions";

export const ACTION_TYPES = {
    Auth: {
        AUTH_REQUEST: 'AUTH_REQUEST',
        AUTH_SUCCESS: 'AUTH_SUCCESS',
        AUTH_FAILURE: 'AUTH_FAILURE',
        SIGNOUT: 'SIGNOUT'
    },
    Films: {
        FILMS_REQUEST: 'FILMS_REQUEST',
        FILMS_SUCCESS: 'FILMS_SUCCESS',
        FILMS_FAILURE: 'FILMS_FAILURE',
    },
    User: {
        USER_REQUEST: 'USER_REQUEST',
        USER_SUCCESS: 'USER_SUCCESS',
        USER_FAILURE: 'USER_FAILURE'
    },
    Favorites: {
        FAVORITES_REQUEST: 'FAVORITES_REQUEST',
        FAVORITES_SUCCESS: 'FAVORITES_REQUEST',
        FAVORITES_FAILURE: 'FAVORITES_REQUEST'
    }
};

export const ActionCreators = {
    ...authActionCreator,
    ...filmsActionCreator,
    ...userActionCreator,
    ...favoritesActionCreator
}

export default ActionCreators;
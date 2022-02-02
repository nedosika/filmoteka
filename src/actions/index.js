import authActionCreator from "./authActions";
import filmsActionCreator from "./filmsActions";

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
    }
};

const ActionCreators = {
    ...authActionCreator,
    ...filmsActionCreator
}

export default ActionCreators;
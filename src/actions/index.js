import authActionCreator from "./authActions";

export const ACTION_TYPES = {
    Auth: {
        AUTH_REQUEST: 'AUTH_REQUEST',
        AUTH_SUCCESS: 'AUTH_SUCCESS',
        AUTH_FAILURE: 'AUTH_FAILURE',
        SIGNOUT: 'SIGNOUT'
    }
};

const ActionCreators = {
    ...authActionCreator
}

export default ActionCreators;
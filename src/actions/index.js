import authActionCreator from "./authActions";
import userActionCreator from "./userActions";
import filmsActionCreator from "./filmsActions";
import noticesActions from "./noticesActions";
import noticeActionCreator from "./noticesActions";
import searchActionCreators from "./searchActions";
import favoritesActionCreator from "./favoritesActions";
import loadingActions from "./loadingActions";

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
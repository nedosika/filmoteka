import {useDispatch} from "react-redux";

import loadingActions from "../actions/loadingActions";
import {bindActionCreators} from "redux";

const useSmartAction = (actionCreator) => {
    const dispatch = useDispatch();

    return (data) => dispatch(actionCreator(bindActionCreators(loadingActions, dispatch))())
}

export default useSmartAction;
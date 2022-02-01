import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";

import ActionsCreator from "../actions"

const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(ActionsCreator, dispatch);
}

export default useActions;
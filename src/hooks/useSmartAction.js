import {useDispatch} from "react-redux";

import useActions from "./useActions";
import noticeActions from "../actions/noticesActions";
import loadingActions from "../actions/loadingActions";
import {SnackBarSeverities} from "../components/SnackStack";

const useSmartAction = (actionCreator) => {
    const dispatch = useDispatch();

    const {startLoading, successLoading, showNotice} = useActions({...loadingActions, ...noticeActions});

    return (props) => {
        startLoading();
        dispatch(actionCreator(props))
            .catch((error) =>
                showNotice(error.message, SnackBarSeverities.error)
            )
            .finally(() => successLoading())
    }
}

export default useSmartAction;
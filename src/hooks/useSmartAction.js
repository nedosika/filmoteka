import {useDispatch} from "react-redux";

import useActions from "./useActions";
import loadingActions from "../actions/loadingActions";
import noticeActions from "../actions/noticeActions";
import {SnackBarSeverities} from "../components/SnackStack";

const useSmartAction = (actionCreator) => {
    const dispatch = useDispatch();

    const {request, success, showNotice} = useActions({...loadingActions, ...noticeActions});

    return (props) => {
        request();
        dispatch(actionCreator(props))
            .catch((error) =>
                showNotice(error.message, SnackBarSeverities.error)
            )
            .finally(() => success())
    }
}

export default useSmartAction;
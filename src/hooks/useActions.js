import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {useMemo} from "react";

import ActionCreators from "../actions"
//
// const useActions = () => {
//     const dispatch = useDispatch();
//     return bindActionCreators(ActionCreators, dispatch);
// }
//
// export default useActions;

export default function useActions(actions = ActionCreators, deps = []) {
    const dispatch = useDispatch();
    return useMemo(
        () => {
            if (Array.isArray(actions)) {
                return actions.map((a) => bindActionCreators(a, dispatch));
            }
            return bindActionCreators(actions, dispatch);
        },
        deps ? [dispatch, ...deps] : [dispatch]
    );
};

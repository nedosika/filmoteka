import loadingActions from "../actions/loadingActions";

import ActionCreators from "../actions";
import {useDispatch} from "react-redux";
import {useMemo} from "react";
import {bindActionCreators} from "redux";

// const useSmartActions = (actionCreator) =>
//     useActions(actionCreator(useActions(loadingActions)));

export default function useSmartActions(actions = ActionCreators, deps = []) {
    const dispatch = useDispatch();

    return useMemo(
        () => {
            if (Array.isArray(actions)) {
                return actions.map((action) =>
                    bindActionCreators(action(bindActionCreators(loadingActions, dispatch)), dispatch)
                );
            }
            return Object.assign(
                {},
                ...Object
                    .entries(actions)
                    .map(([name, action]) => ({
                            [name]: bindActionCreators(
                                action(bindActionCreators(loadingActions, dispatch)),
                                dispatch
                            )
                        })
                    )
            );

        },
        deps ? [dispatch, ...deps] : [dispatch]
    );
};
import {ACTION_TYPES} from "../actions";

const initialState = {
    notices: []
}

const noticeReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.Notice.ADD_NOTICE:
            return {
                ...state,
                notices: [...state.notices, {
                    key: payload.key,
                    message: payload.message,
                    severity: payload.severity,
                    isOpen: true
                }],
            }
        case ACTION_TYPES.Notice.DISABLE_NOTICE:
            const index = state.notices.findIndex((notice) => notice.key === payload);
            return {
                ...state,
                notices: [
                    ...state.notices.slice(0, index),
                    {...state.notices[index], isOpen: false},
                    ...state.notices.slice(index + 1)
                ]
            }
        case ACTION_TYPES.Notice.REMOVE_NOTICE:
            return {
                ...state,
                notices: state.notices.filter((notice) => notice.key !== payload)
            }
        default:
            return state
    }
}

export default noticeReducer;
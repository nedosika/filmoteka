import {ACTION_TYPES} from "../actions";
import {SnackBarSeverities} from "../actions/noticeActions";

const initialState = {
    severity: SnackBarSeverities.success,
    message: '',
    isShow: false
}

const noticeReducer = (state = initialState, {type, payload}) => {
    switch (type){
        case ACTION_TYPES.Notice.SHOW_NOTICE:
            return {...state, ...payload, isShow: true}
        case ACTION_TYPES.Notice.HIDE_NOTICE:
            return {...state, isShow: false}
        default:
            return state
    }
}

export default noticeReducer;
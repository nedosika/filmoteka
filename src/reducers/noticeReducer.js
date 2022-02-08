import {ACTION_TYPES} from "../actions";

export const SnackBarSeverities = {
    error: 'error',
    warning: 'warning',
    info: 'info',
    success: 'success'
}

const initialState = {
    severity: SnackBarSeverities.success,
    message: '',
    isShow: false
}

const noticeReducer = (state = initialState, {type, payload}) => {
    console.log(payload)
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
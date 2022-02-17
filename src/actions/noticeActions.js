import {ACTION_TYPES} from "./index";

export const showNotice = (message, severity) => ({
    type: ACTION_TYPES.Notice.ADD_NOTICE,
    payload: {
        key: new Date().getTime() + Math.random(),
        message,
        severity
    }
})

export const hideNotice = (key) => ({
    type: ACTION_TYPES.Notice.DISABLE_NOTICE,
    payload: key
})

export const removeNotice = (key) => ({
    type: ACTION_TYPES.Notice.REMOVE_NOTICE,
    payload: key
})

export default {
    showNotice,
    hideNotice,
    removeNotice
}
import {ACTION_TYPES} from "./index";

export const showNotice = (message, severity) => ({
    type: ACTION_TYPES.Notice.SHOW_NOTICE,
    payload: {message, severity}
})

const hideNotice = () => ({
    type: ACTION_TYPES.Notice.HIDE_NOTICE
})

export default {
    showNotice,
    hideNotice
}
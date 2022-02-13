import {ACTION_TYPES} from "./index";

const addSnack = (snack) => ({
    type: ACTION_TYPES.SnackStack.ADD_SNACK,
    payload: snack
})

const disableSnack = (key) => ({
    type: ACTION_TYPES.SnackStack.DISABLE_SNACK,
    payload: key
})

const removeSnack = (key) => ({
    type: ACTION_TYPES.SnackStack.REMOVE_SNACK,
    payload: key
})

export const showNotice = (message, severity) => (dispatch) => {
    dispatch(addSnack({
        key: new Date().getTime() + Math.random(),
        message,
        severity
    }))
}

export const hideNotice = (key) => (dispatch) => {
    dispatch(disableSnack(key));
    setTimeout(() => dispatch(removeSnack(key)), 300);
}

export default {
    showNotice,
    hideNotice
}
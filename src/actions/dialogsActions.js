import {ACTION_TYPES} from "./index";

const openDialog = (type, props) => ({
    type: ACTION_TYPES.Dialog.PUSH_DIALOG,
    payload: {
        type,
        props
    }
})

const closeDialog = () => ({
    type: ACTION_TYPES.Dialog.POP_DIALOG
})

export default {
    openDialog,
    closeDialog
}
import {ACTION_TYPES} from "../actions";

const initialState = [];

const dialogsReducer = (state = initialState, {type, payload}) => {
    switch (type){
        case ACTION_TYPES.Dialog.PUSH_DIALOG:
            return [...state, payload]
        case ACTION_TYPES.Dialog.POP_DIALOG:
            return state.slice(0, state.length - 1)
        default:
            return state;
    }
}

export default dialogsReducer;
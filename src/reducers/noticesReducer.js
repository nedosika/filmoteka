import {ADD_NOTICE, REMOVE_NOTICE, DISABLE_NOTICE} from "../actions/noticesActions";

const initialState = {
    byId: {},
    allIds: []
}

const noticesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ADD_NOTICE:
            return {
                ...state,
                byId:{
                    ...state.byId,
                    [payload.id]: {
                        message: payload.message,
                        severity: payload.severity,
                        isOpen: true
                    }
                },
                allIds: [...state.allIds, payload.id]
            }
        case DISABLE_NOTICE:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [payload]: {
                        ...state.byId[payload],
                        isOpen: false
                    }
                }
            }
        case REMOVE_NOTICE:
            const notices = {...state.byId};
            delete notices[payload];

            return {
                ...state,
                byId: {...notices},
                allIds: state.allIds.filter((id) => id !== payload)
            }
        default:
            return state
    }
}

export default noticesReducer;
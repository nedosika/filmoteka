import {ACTION_TYPES} from "./index";

export const request = () => ({
    type: ACTION_TYPES.Loading.REQUEST
});
export const success = () => ({
    type: ACTION_TYPES.Loading.SUCCESS,
});
export const failure = (error) => ({
    type: ACTION_TYPES.Loading.FAILURE,
    payload: error
});

export default {
    request,
    success,
    failure
}
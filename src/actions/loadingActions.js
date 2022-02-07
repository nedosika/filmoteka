import {ACTION_TYPES} from "./index";

const request = () => ({
    type: ACTION_TYPES.Loading.REQUEST
});
const success = () => ({
    type: ACTION_TYPES.Loading.SUCCESS,
});
const failure = (error) => ({
    type: ACTION_TYPES.Loading.FAILURE,
    payload: error
});

export default {
    request,
    success,
    failure
}
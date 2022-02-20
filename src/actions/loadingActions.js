export const LOADING = {
    START_LOADING: 'START_LOADING',
    SUCCESS_LOADING: 'SUCCESS_LOADING',
    FAILURE_LOADING: 'FAILURE_LOADING'
}

export const startLoading = () => ({
    type: LOADING.START_LOADING
});
export const successLoading = () => ({
    type: LOADING.SUCCESS_LOADING,
});
export const failureLoading = (error) => ({
    type: LOADING.FAILURE_LOADING,
    payload: error
});

export default {
    startLoading,
    successLoading,
    failureLoading
}
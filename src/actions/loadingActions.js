export const START_LOADING = 'START_LOADING';
export const SUCCESS_LOADING = 'SUCCESS_LOADING';
export const FAILURE_LOADING = 'FAILURE_LOADING';

export const startLoading = () => ({
    type: START_LOADING
});
export const successLoading = () => ({
    type: SUCCESS_LOADING,
});
export const failureLoading = (error) => ({
    type: FAILURE_LOADING,
    payload: error
});

export default {
    startLoading,
    successLoading,
    failureLoading
}
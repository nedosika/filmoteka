export const ADD_NOTICE = 'ADD_NOTICE';
export const DISABLE_NOTICE = 'DISABLE_NOTICE';
export const REMOVE_NOTICE = 'REMOVE_NOTICE';

export const showNotice = (message, severity) => ({
  type: ADD_NOTICE,
  payload: {
    id: new Date().getTime() + Math.random(),
    message,
    severity,
  },
});

export const hideNotice = (id) => ({
  type: DISABLE_NOTICE,
  payload: id,
});

export const removeNotice = (id) => ({
  type: REMOVE_NOTICE,
  payload: id,
});

export default {
  showNotice,
  hideNotice,
  removeNotice,
};

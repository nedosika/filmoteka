import { useDispatch } from 'react-redux';
import loadingActions from '../actions/loadingActions';
import noticeActions from '../actions/noticesActions';
import { SnackBarSeverities } from '../components/SnackStack';
import useActions from './useActions';

const useSmartAction = (actionCreator) => {
  const dispatch = useDispatch();

  const { startLoading, successLoading, showNotice } = useActions({ ...loadingActions, ...noticeActions });

  return (props) => {
    startLoading();
    dispatch(actionCreator(props))
      .catch((error) => showNotice(error.message, SnackBarSeverities.error))
      .finally(() => successLoading());
  };
};

export default useSmartAction;

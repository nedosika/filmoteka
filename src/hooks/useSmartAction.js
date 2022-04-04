import { useDispatch } from 'react-redux';
import authActions from '../actions/authActions';
import loadingActions from '../actions/loadingActions';
import noticeActions from '../actions/noticesActions';
import { SnackBarSeverities } from '../components/SnackStack';
import useActions from './useActions';

const useSmartAction = (actionCreator) => {
  const dispatch = useDispatch();

  const { startLoading, successLoading, showNotice, signOut } = useActions({
    ...loadingActions,
    ...noticeActions,
    ...authActions,
  });

  return (props) => {
    startLoading();
    dispatch(actionCreator(props))
      .then(({ payload }) => {
        if (payload === 'Invalid Credentials') {
          signOut();
        }
      })
      .catch((error) => {
        showNotice(error.message, SnackBarSeverities.error);
      })
      .finally(() => successLoading());
  };
};

export default useSmartAction;

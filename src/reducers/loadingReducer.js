import { FAILURE_LOADING, START_LOADING, SUCCESS_LOADING } from 'actions/loadingActions';

const initialState = {
  isLoading: false,
  error: null,
};

export default function loadingReducer(state = initialState, { type, payload }) {
  switch (type) {
    case START_LOADING:
      return {
        isLoading: true,
        error: null,
      };
    case SUCCESS_LOADING:
      return {
        isLoading: false,
        error: null,
      };
    case FAILURE_LOADING:
      return {
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}

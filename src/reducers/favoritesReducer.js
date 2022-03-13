import { FAVORITES_LOADED } from '../actions/favoritesActions';

const initialState = [];

export default function favoritesReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FAVORITES_LOADED:
      return [...payload];
    default:
      return state;
  }
}

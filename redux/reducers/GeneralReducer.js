import { TYPE_ERROR, TYPE_LOADING } from '../types';

export default (state = {}, action) => {
  switch (action.type) {
      case TYPE_ERROR:
        return { ...state, error: action.payload };
      case TYPE_LOADING:
        return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
import { TYPE_ERROR, TYPE_LOADING } from '../types';

export default (state = {}, action) => {
  switch (action.type) {
      case TYPE_ERROR:
        return {
          ...state,
          error: action.payload,
          isLoading: false
        };
      case TYPE_LOADING:
        return { ...state,
          error: null,
          isLoading: true
        };
    default:
      return { ...state, error: null, isLoading: false };
  }
}
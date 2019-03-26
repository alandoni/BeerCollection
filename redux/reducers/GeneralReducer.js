import { 
  TYPE_ERROR,
  TYPE_LOADING,
  TYPE_AUTH_CHANGE
} from '../types';

export default (state = {}, action) => {
  switch (action.type) {
      case TYPE_ERROR:
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        };
      case TYPE_LOADING:
        return { ...state,
          error: null,
          isLoading: true,
        };
      case TYPE_AUTH_CHANGE:
        return state;
    default:
        console.log(action.type);
      return {...state, error: null, isLoading: false};
  }
}
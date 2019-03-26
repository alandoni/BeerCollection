import { 
  TYPE_LOGIN,
  TYPE_AUTH_CHANGE,
} from '../types';

export default (state = {}, action) => {
  switch (action.type) {
      case TYPE_LOGIN:
      case TYPE_AUTH_CHANGE:
        const newState = {
          ...state,
          user: action.payload.user,
          isLoggedIn: action.payload.isLoggedIn,
          error: null,
          isLoading: false,
        };
        return newState;
    default:
      return state;
  }
}
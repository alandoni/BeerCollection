import { 
  TYPE_LOGIN,
  TYPE_AUTH_CHANGE,
} from '../types';

export default (state = {}, action) => {
  switch (action.type) {
      case TYPE_LOGIN:
      case TYPE_AUTH_CHANGE:
        return action.payload;
    default:
      return state;
  }
}
import { 
  TYPE_CREATE_USER,
} from '../types';

export default (state = {}, action) => {
  switch (action.type) {
      case TYPE_CREATE_USER:
      return {
        user: action.payload,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
}
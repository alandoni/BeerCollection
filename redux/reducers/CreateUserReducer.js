import { 
  TYPE_CREATE_USER,
} from '../types';

export default (state = {}, action) => {
  switch (action.type) {
      case TYPE_CREATE_USER:
        return action.payload;
    default:
      return state;
  }
}
import { 
  TYPE_SAVE_BEER,
  TYPE_REQUEST_BEERS,
} from '../types';

export default (state = {}, action) => {
  switch (action.type) {
      case TYPE_SAVE_BEER:
        const { beers } = state;
        beers.push(action.payload);
        return {
          error: null,
          beers,
          newBeer: action.payload,
          isLoading: false
        };
      case TYPE_REQUEST_BEERS:
        return {
          beers: action.payload,
          error: null,
          newBeer: null,
          isLoading: false
        };
    default:
      return state;
  }
}
import { 
  TYPE_SAVE_BEER,
  TYPE_REQUEST_BEERS,
} from '../types';

export default (state = {}, action) => {
  switch (action.type) {
      case TYPE_SAVE_BEER:
        const { beers } = state;
        beers.push(action.payload);
        return {...state, error: null, beers, newBeer: action.payload};
      case TYPE_REQUEST_BEERS:
        return {beers: action.payload, error: null, newBeer: null};
    default:
      return state;
  }
}
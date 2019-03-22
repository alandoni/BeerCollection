import { 
  TYPE_SAVE_BEER_FROM_USER,
  TYPE_REQUEST_BEERS_FROM_USER,
  TYPE_DELETE_BEER_FROM_USER,
} from '../types';

export default (state = {}, action) => {
  switch (action.type) {
      case TYPE_SAVE_BEER_FROM_USER:
        const { beers } = state;
        beers.push(action.payload);
        return {...state, error: null, beersFromUser, newBeerFromUser: action.payload};
      case TYPE_DELETE_BEER_FROM_USER:
        const { beersFromUser } = state;
        const newBeersFromUser = beersFromUser.filter((value) => {
          return value.id !== action.payload;
        });
        return {...state, error: null, newBeersFromUser, newBeerFromUser: null};
      case TYPE_REQUEST_BEERS_FROM_USER:
        return {beersFromUser: action.payload, error: null};
    default:
      return state;
  }
}
import { 
  TYPE_SAVE_BEER,
  TYPE_REQUEST_BEERS,
  TYPE_SAVE_BEER_FROM_USER,
  TYPE_REQUEST_BEERS_FROM_USER,
  TYPE_DELETE_BEER_FROM_USER,
} from '../types';

export default (state = {}, action) => {
  switch (action.type) {
      case TYPE_SAVE_BEER:
        const newBeers = addBeerToList(state, action);
        return {
          ...state,
          error: null,
          beers: newBeers,
          newBeer: action.payload,
          isLoading: false
        };
      case TYPE_REQUEST_BEERS:
        return {
          ...state,
          beers: action.payload,
          error: null,
          newBeer: null,
          isLoading: false
        };
      case TYPE_SAVE_BEER_FROM_USER:
        return addBeerToTheUserCollection(state, action);
      case TYPE_DELETE_BEER_FROM_USER:
        return removeBeerFromTheList(state, action);
      case TYPE_REQUEST_BEERS_FROM_USER:
        const beersFromUser = setBeers(state, action.payload);
        return {
          ...state,
          beersFromUser,
          error: null,
          newBeerFromUser: null,
          isLoading: false
        };
    default:
      return state;
  }
}

function addBeerToList(state, action) {
  const { beers } = state;
  const newBeers = []
  beers.forEach((beer) => {
    newBeers.push(beer);
  });
  newBeers.push(action.payload);
  return newBeers;
}

function addBeerToTheUserCollection(state, action) {
  const beersFromUser = [];
  state.beersFromUser.forEach((beer) => {
    beersFromUser.push(beer);
  });
  const newBeerFromUser = setBeers(state, [action.payload])[0];
  beersFromUser.push(newBeerFromUser);
  return {
    ...state,
    error: null,
    beersFromUser,
    newBeerFromUser,
    isLoading: false
  };
}

function removeBeerFromTheList(state, action) {
  const { beersFromUser } = state;
  const newBeersFromUser = beersFromUser.filter((value) => {
    return value.id !== action.payload;
  });
  return {
    ...state,
    error: null,
    beersFromUser: newBeersFromUser,
    newBeerFromUser: null,
    isLoading: false
  };
}

function setBeers(state, payload) {
  const { beers } = state;
  if (!beers) {
    return [];
  }

  return payload.map((value) => {
    const beerFromUser = value;
    beers.forEach((beer) => {
      if (value.beerId === beer.id) {
        beerFromUser.beer = beer;
      }
    });
    return beerFromUser;
  });
}
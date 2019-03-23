import {
  TYPE_REQUEST_BEERS,
  TYPE_SAVE_BEER_FROM_USER,
  TYPE_REQUEST_BEERS_FROM_USER,
  TYPE_DELETE_BEER_FROM_USER,
} from '../types';

export default (state = {}, action) => {
  switch (action.type) {
      case TYPE_REQUEST_BEERS:
        return {beers: action.payload};
      case TYPE_SAVE_BEER_FROM_USER:
        return addBeerToTheList(state, action);
      case TYPE_DELETE_BEER_FROM_USER:
        return removeBeerFromTheList(state, action);
      case TYPE_REQUEST_BEERS_FROM_USER:
        const beersFromUser = setBeers(state, action.payload);
        return {
          beersFromUser,
          error: null,
          newBeerFromUser: null,
          isLoading: false
        };
    default:
      return state;
  }
}

function addBeerToTheList(state, action) {
  console.log(state);
  let { beersFromUser } = state;
  const newBeerFromUser = setBeers(state, [action.payload])[0];
  beersFromUser.push(newBeerFromUser);

  return {
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
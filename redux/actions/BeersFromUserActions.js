import {
  TYPE_REQUEST_BEERS_FROM_USER,
  TYPE_SAVE_BEER_FROM_USER,
  TYPE_DELETE_BEER_FROM_USER,
} from '../types';
import { save, remove, get } from './CrudActions';

export const collection = '/user_beers';

export const saveBeerFromUserAction = (payload) => {
  return {
    type: TYPE_SAVE_BEER_FROM_USER,
    payload,
  }
};

export const deleteBeerFromUserAction = (payload) => {
  return {
    type: TYPE_DELETE_BEER_FROM_USER,
    payload,
  }
};

export const getBeersFromUserAction = (payload) => {
  return {
    type: TYPE_REQUEST_BEERS_FROM_USER,
    payload,
  }
};

export const saveBeerFromUser = (beer, id) => {
  return save(collection, beer, id, saveBeerFromUserAction);
}

export const deleteBeerFromUser = (id) => {
  return remove(collection, id, deleteBeerFromUserAction);
}

export const getBeersFromUser = (userId) => {
  return get(collection, 'userId', userId, getBeersFromUserAction);
}

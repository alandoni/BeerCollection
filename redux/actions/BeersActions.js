import {
  TYPE_REQUEST_BEERS,
  TYPE_SAVE_BEER,
} from '../types';
import { save, get } from './CrudActions';

const collection = '/beers';

export const saveBeerAction = (payload) => {
  return {
    type: TYPE_SAVE_BEER,
    payload,
  }
};

export const requestBeersAction = (payload) => {
  return {
    type: TYPE_REQUEST_BEERS,
    payload,
  }
};

export const saveBeer = (beer, id) => {
  return save(collection, beer, id, saveBeerAction);
}

export const getBeers = () => {
  return get(collection, 'name', null, requestBeersAction);
}
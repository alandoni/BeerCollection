import {
  TYPE_REQUEST_TYPES,
  TYPE_SAVE_TYPES,
} from '../types';
import { save, get } from './CrudActions';

const collection = '/types';

export const saveTypeOfBeerAction = (payload) => {
  return {
    type: TYPE_SAVE_TYPES,
    payload,
  }
};

export const requestTypesOfBeerAction = (payload) => {
  return {
    type: TYPE_REQUEST_TYPES,
    payload,
  }
};

export const saveTypeOfBeer = (id) => {
  return save(collection, beer, id, saveTypeOfBeerAction);
}

export const requestTypesOfBeer = () => {
  return get(collection, '', requestTypesOfBeerAction);
}

import {
  TYPE_ERROR,
  TYPE_LOADING,
} from './../types';

export const loadingAction = () => {
  return {
    type: TYPE_LOADING,
  }
}

export const errorAction = (error) => {
  return {
    type: TYPE_ERROR,
    payload: error,
  }
}
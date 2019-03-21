import {
  TYPE_ERROR,
  TYPE_LOADING,
} from './../types';

export const loadingAction = (isLoading) => {
  return {
    type: TYPE_LOADING,
    payload: isLoading,
  }
}

export const errorAction = (error) => {
  return {
    type: TYPE_ERROR,
    payload: error,
  }
}
import {
    TYPE_CREATE_USER,
  } from './../types';

  import { 
    loadingAction,
    errorAction,
  } from './GeneralActions';

  import firebase from './../../firebase';

  export const creteUserAction = (user) => {
    return {
      type: TYPE_CREATE_USER,
      payload: user,
    }
  };

  export const createUser = (email, password, retypePassword) => {
    return async (dispatch) => {
      try {
        dispatch(loadingAction(true));

        if (retypePassword.length === 0 || password.length === 0) {
          dispatch(errorAction('Type a valid password'));
          dispatch(loadingAction(false));
          return;
        }
        if (password !== retypePassword) {
          dispatch(errorAction('The passwords don\'t match'));
          dispatch(loadingAction(false));
          return;
        }

        const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        dispatch(creteUserAction(user))
      } catch (error) {
        dispatch(errorAction(error.message));
      } finally {
        dispatch(loadingAction(false));
      }
    };
  };
  
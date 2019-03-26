import {
    TYPE_CREATE_USER,
  } from './../types';

  import { 
    loadingAction,
    errorAction,
  } from './GeneralActions';

  import firebase from './../../firebase';

  export const createUserAction = (user) => {
    return {
      type: TYPE_CREATE_USER,
      payload: user,
    }
  };

  export const createUser = (email, password, retypePassword) => {
    return async (dispatch) => {
      try {
        dispatch(loadingAction());

        if (retypePassword.length === 0 || password.length === 0) {
          console.log('Type a valid password');
          dispatch(errorAction('Type a valid password'));
          return;
        }
        if (password !== retypePassword) {
          console.log('The passwords don\'t match');
          dispatch(errorAction('The passwords don\'t match'));
          return;
        }

        const user = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password);
        console.log(user);
        dispatch(createUserAction(user))
      } catch (error) {
        dispatch(errorAction(error.message));
      }
    };
  };
  
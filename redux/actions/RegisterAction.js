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
          dispatch(errorAction('Type a valid password'));
          return;
        }
        if (password !== retypePassword) {
          dispatch(errorAction('The passwords don\'t match'));
          return;
        }
        const user = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password);
        const newUser = { email: user.user.email, userId: user.uid };
        dispatch(createUserAction(newUser));
      } catch (error) {
        dispatch(errorAction(error.message));
      }
    };
  };
  
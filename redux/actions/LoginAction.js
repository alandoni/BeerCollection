import {
  TYPE_LOGIN,
  TYPE_AUTH_CHANGE,
} from './../types';
import { 
  loadingAction,
  errorAction,
} from './GeneralActions';
import firebase from './../../firebase';
import * as Expo from 'expo';

export const loginAction = (user) => {
  return {
    type: TYPE_LOGIN,
    payload: user,
  }
};

export const loginFacebookAction = (action) => {
  return {
    type: TYPE_LOGIN,
    payload: action,
  }
};

export const authChangeAction = (action) => {
  return {
    type: TYPE_AUTH_CHANGE,
    payload: action,
  }
};

export const listenAuth = () => {
  return async (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        dispatch(authChangeAction({user, isLoggedIn: true}));
      } else {
        dispatch(authChangeAction({user, isLoggedIn: false}));
      }
    });
  };
}

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(loginAction(user))
    } catch (error) {
      dispatch(errorAction(error.message));
    } finally {
      dispatch(loadingAction(false));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      firebase.auth().signOut();
      dispatch(authChangeAction({user: null, isLoggedIn: false}));
    } catch (error) {
      dispatch(errorAction(error.message));
    } finally {
      dispatch(loadingAction(false));
    }
  };
}

export const loginWithFacebook = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      const appId = Expo.Constants.manifest.extra.facebook.appId;
      const permissions = ['public_profile', 'email'];
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {permissions});

      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const user = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
        console.log(user);
        dispatch(loginAction(user));
      }
    } catch (error) {
      dispatch(errorAction(error.message));
    } finally {
      dispatch(loadingAction(false));
    }
  };
}
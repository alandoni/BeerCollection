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
    dispatch(loadingAction());
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        const { email, uid } = user;
        const newUser = { email, userId: uid};
        dispatch(authChangeAction({user: newUser, isLoggedIn: true}));        
      } else {
        dispatch(authChangeAction({user: null, isLoggedIn: false}));
      }
    });
  };
}

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction());
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      const { userEmail, uid } = user.user;
      const newUser = { email: userEmail, userId: uid};
      dispatch(loginAction({ user: newUser, isLoggedIn: true }))
    } catch (error) {
      dispatch(authChangeAction({user: null, isLoggedIn: false}));
      dispatch(errorAction(error.message));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction());
      firebase.auth().signOut();
      dispatch(authChangeAction({user: null, isLoggedIn: false}));
    } catch (error) {
      dispatch(errorAction(error.message));
    }
  };
}

export const loginWithFacebook = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction());
      const appId = Expo.Constants.manifest.extra.facebook.appId;
      const permissions = ['public_profile', 'email'];
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {permissions});

      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const user = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
        const { email, uid } = user;
        const newUser = { email, userId: uid};
        dispatch(loginAction({ user: newUser, isLoggedIn: true }))
      }
    } catch (error) {
      dispatch(authChangeAction({user: null, isLoggedIn: false}));
      dispatch(errorAction(error.message));
    }
  };
}
import firebase from '../../firebase';
import { loadingAction, errorAction } from './GeneralActions';

export const save = (colletion, object, id, action) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      let result = null;
      if (id) {
        result = await firebase.database().ref(colletion + '/' + id).set(object);
      } else {
        result = await firebase.database().ref(colletion).push(object).key;
        object.id = result;
      }
      console.log(object);
      dispatch(action(object));
    } catch (error) {
      dispatch(errorAction(error.message));
    } finally {
      dispatch(loadingAction(false));
    }
  };
}

export const remove = (colletion, id, action) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      const result = await firebase.database().ref(colletion + '/' + id).remove();
      dispatch(action(result));
    } catch (error) {
      dispatch(errorAction(error.message));
    } finally {
      dispatch(loadingAction(false));
    }
  };
}

export const get = (colletion, where, action) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      const result = await firebase.database().ref(colletion).orderByChild('name').once('value');
      const list = [];
      result.forEach((value) => {
        var itemVal = value.val();
        itemVal.id = value.key;
        list.push(itemVal);
      });
      dispatch(action(list));
    } catch (error) {
      dispatch(errorAction(error.message));
    } finally {
      dispatch(loadingAction(false));
    }
  };
}
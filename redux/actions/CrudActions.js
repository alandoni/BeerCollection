import firebase from '../../firebase';
import { loadingAction, errorAction } from './GeneralActions';

export const save = (colletion, object, id, action) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction());
      let result = null;
      if (id) {
        result = await firebase.database().ref(colletion + '/' + id).set(object);
      } else {
        result = await firebase.database().ref(colletion).push(object).key;
        object.id = result;
      }
      dispatch(action(object));
    } catch (error) {
      dispatch(errorAction(error.message));
    }
  };
}

export const remove = (colletion, id, action) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction());
      await firebase.database().ref(colletion + '/' + id).remove();
      dispatch(action(id));
    } catch (error) {
      dispatch(errorAction(error.message));
    }
  };
}

export const get = (colletion, orderBy, equalTo, action) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction);
      const ref = firebase.database().ref(colletion).orderByChild(orderBy);
      let result;
      if (equalTo) {
        result = await ref.equalTo(equalTo);
      } else {
        result = await ref.once('value');
      }

      const list = [];
      result.forEach((value) => {
        var itemVal = value.val();
        itemVal.id = value.key;
        list.push(itemVal);
      });
      dispatch(action(list));
    } catch (error) {
      dispatch(errorAction(error.message));
    }
  };
}
import firebase from '../../firebase';
import { loadingAction, errorAction } from './GeneralActions';

export const save = (colletion, object, id, action) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction());
      let result = null;
      if (id) {
        console.log(`UPDATE: ${colletion}, id = ${id}`);
        result = await firebase.database().ref(colletion + '/' + id).set(object);
        console.log(`RESULT UPDATE: ${colletion}, id = ${id}: ${JSON.stringify(result)}`);
      } else {
        console.log(`POST: ${colletion}: ${JSON.stringify(object)}`);
        result = await firebase.database().ref(colletion).push(object).key;
        object.id = result;
        console.log(`RESULT POST: ${colletion}: ${JSON.stringify(object)}`);
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
      console.log(`DELETE: ${colletion}, ID: ${id}`);
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
      dispatch(loadingAction());
      const ref = firebase.database().ref(colletion).orderByChild(orderBy);
      let result;
      if (equalTo) {
        console.log(`GET: ${colletion}, ${orderBy} = ${equalTo}`);
        result = await ref.equalTo(equalTo).once('value');
      } else {
        console.log(`GET: ${colletion}, ORDER BY ${orderBy}`);
        result = await ref.once('value');
      }

      const list = [];
      if (!result.forEach) {
        // An error occurred;
        result = [];
      }

      result.forEach((value) => {
        var itemVal = value.val();
        itemVal.id = value.key;
        list.push(itemVal);
      });
      console.log(`RESULT GET: ${colletion}, ${orderBy} = ${equalTo}: ${JSON.stringify(list)}`);
      dispatch(action(list));
    } catch (error) {
      dispatch(errorAction(error.message));
    }
  };
}
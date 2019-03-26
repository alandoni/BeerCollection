import {
  TYPE_REQUEST_PICTURE,
  TYPE_UPLOAD_PICTURE,
} from '../types';

import { save, get } from './CrudActions';

export const collection = '/pictures';

export const requestPictureAction = (payload) => {
  return {
    type: TYPE_REQUEST_PICTURE,
    payload,
  }
};

export const uploadPictureAction = (payload) => {
  return {
    type: TYPE_UPLOAD_PICTURE,
    payload,
  }
};

export const requestPicture = (beerFromUserId) => {
  return get(collection, 'beerFromUserId', beerFromUserId, requestPictureAction);
}

export const uploadPicture = (base64, beerFromUserId, id) => {
  return save(collection, {base64, beerFromUserId}, id, uploadPictureAction);
}
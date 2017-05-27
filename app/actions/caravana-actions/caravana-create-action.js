import { create } from 'app/storage/caravana-storage';
import { CARAVANA_CREATE_RECEIVED, CARAVANA_CREATE_REJECT, CARAVANA_CREATE_REQUEST } from '../action-types';

export function requestCreate() {
  return {
    type: CARAVANA_CREATE_REQUEST,
  };
}

export function rejectCreate(error) {
  return {
    error,
    type: CARAVANA_CREATE_REJECT,
  };
}

export function receiveCreate(caravana) {
  return {
    caravana,
    type: CARAVANA_CREATE_RECEIVED,
  };
}

export default function createCaravana(caravana) {
  return (dispatch) => {
    dispatch(requestCreate());

    return create(caravana)
      .then((json) => {
        dispatch(receiveCreate(json));
      })

      .catch((error) => {
        dispatch(rejectCreate(error));
      })
    ;
  };
}

import { save } from 'app/storage/caravana-storage';
import { CARAVANA_SAVE_RECEIVED, CARAVANA_SAVE_REJECT, CARAVANA_SAVE_REQUEST } from '../action-types';

export function requestCreate() {
  return {
    type: CARAVANA_SAVE_REQUEST,
  };
}

export function rejectCreate(error) {
  return {
    error,
    type: CARAVANA_SAVE_REJECT,
  };
}

export function receiveCreate(caravana) {
  return {
    caravana,
    type: CARAVANA_SAVE_RECEIVED,
  };
}

export default function saveCaravana(caravana) {
  return (dispatch) => {
    dispatch(requestCreate());

    return save(caravana)
      .then((json) => {
        dispatch(receiveCreate(json));
      })

      .catch((error) => {
        dispatch(rejectCreate(error));
      })
    ;
  };
}

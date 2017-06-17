import { removeById } from 'app/storage/caravana-storage';
import { CARAVANA_DELETE_RECEIVED, CARAVANA_DELETE_REJECT, CARAVANA_DELETE_REQUEST } from '../action-types';

export function requestDelete() {
  return {
    type: CARAVANA_DELETE_REQUEST,
  };
}

export function rejectDelete(error) {
  return {
    error,
    type: CARAVANA_DELETE_REJECT,
  };
}

export function receiveDelete(caravanaId) {
  return {
    caravanaId,
    type: CARAVANA_DELETE_RECEIVED,
  };
}

export default function deleteCaravana(caravanaId) {
  return (dispatch) => {
    dispatch(requestDelete());

    return removeById(caravanaId)
      .then((json) => {
        dispatch(receiveDelete(json));
      })

      .catch((error) => {
        dispatch(rejectDelete(error));
      })
    ;
  };
}

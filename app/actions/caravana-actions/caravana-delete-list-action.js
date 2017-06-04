import { removeList } from 'app/storage/caravana-storage';
import { CARAVANA_DELETE_LIST_RECEIVED, CARAVANA_DELETE_LIST_REJECT, CARAVANA_DELETE_LIST_REQUEST } from '../action-types';

export function requestDelete() {
  return {
    type: CARAVANA_DELETE_LIST_REQUEST,
  };
}

export function rejectDelete(error) {
  return {
    error,
    type: CARAVANA_DELETE_LIST_REJECT,
  };
}

export function receiveDelete(caravanas) {
  return {
    caravanas,
    type: CARAVANA_DELETE_LIST_RECEIVED,
  };
}

export default function deleteCaravanaList(caravanas) {
  return (dispatch) => {
    dispatch(requestDelete());

    return removeList(caravanas)
      .then((json) => {
        dispatch(receiveDelete(json));
      })

      .catch((error) => {
        dispatch(rejectDelete(error));
      })
    ;
  };
}

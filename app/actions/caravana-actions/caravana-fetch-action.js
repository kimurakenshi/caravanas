import { getAll } from 'app/storage/caravana-storage';
import { CARAVANA_FETCH_RECEIVED, CARAVANA_FETCH_REJECT, CARAVANA_FETCH_REQUEST } from '../action-types';

export function requestFetchCaravana() {
  return {
    type: CARAVANA_FETCH_REQUEST,
  };
}

export function rejectFetchCaravana() {
  return {
    type: CARAVANA_FETCH_REJECT,
  };
}

export function receiveFetchCaravana(caravanas) {
  return {
    caravanas,
    type: CARAVANA_FETCH_RECEIVED,
  };
}

export default function fetchCaravanas() {
  return (dispatch) => {
    dispatch(requestFetchCaravana());

    return getAll()
      .then((json) => {
        dispatch(receiveFetchCaravana(json));
      })

      .catch((error) => {
        dispatch(rejectFetchCaravana(error));
      })
    ;
  };
}

import { getAllForCompany } from 'app/storage/movement-storage';
import { getSettings } from 'app/reducers';
import { MOVEMENT_FETCH_RECEIVED, MOVEMENT_FETCH_REJECT, MOVEMENT_FETCH_REQUEST } from '../action-types';

export function requestFetchMovement() {
  return {
    type: MOVEMENT_FETCH_REQUEST,
  };
}

export function rejectFetchMovement() {
  return {
    type: MOVEMENT_FETCH_REJECT,
  };
}

export function receiveFetchMovement(movements) {
  return {
    movements,
    type: MOVEMENT_FETCH_RECEIVED,
  };
}

export default function fetchMovements() {
  return (dispatch, getState) => {
    dispatch(requestFetchMovement());

    const settings = getSettings(getState());

    return getAllForCompany(settings.data.activeCompanyId)
      .then((json) => {
        dispatch(receiveFetchMovement(json));
      })

      .catch((error) => {
        dispatch(rejectFetchMovement(error));
      })
    ;
  };
}

import { getAllForCompany } from 'app/storage/caravana-storage';
import { getSettings } from 'app/reducers';
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
  return (dispatch, getState) => {
    dispatch(requestFetchCaravana());

    const settings = getSettings(getState());

    return getAllForCompany(settings.data.activeCompanyId)
      .then((json) => {
        dispatch(receiveFetchCaravana(json));
      })

      .catch((error) => {
        dispatch(rejectFetchCaravana(error));
      })
    ;
  };
}

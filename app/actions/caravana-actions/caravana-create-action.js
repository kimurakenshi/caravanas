import { create } from 'app/storage/caravana-storage';
import { getSettings } from 'app/reducers';
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

export function receiveCreate(company) {
  return {
    company,
    type: CARAVANA_CREATE_RECEIVED,
  };
}

export default function createCaravana(caravana) {
  return (dispatch, getState) => {
    dispatch(requestCreate());

    const settings = getSettings(getState());

    const newCaravana = {
      description: caravana.description,
      idCompany: settings.data.activeCompanyId,
      number: caravana.name,
    };

    return create(newCaravana)
      .then((json) => {
        dispatch(receiveCreate(json));
      })

      .catch((error) => {
        dispatch(rejectCreate(error));
      })
    ;
  };
}

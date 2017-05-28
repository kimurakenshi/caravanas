import { save } from 'app/storage/company-storage';
import { saveSettings } from 'app/actions/settings-actions';
import { getSettings } from 'app/reducers';
import { COMPANY_SAVE_RECEIVED, COMPANY_SAVE_REJECT, COMPANY_SAVE_REQUEST } from '../action-types';

export function requestCreate() {
  return {
    type: COMPANY_SAVE_REQUEST,
  };
}

export function rejectCreate(error) {
  return {
    error,
    type: COMPANY_SAVE_REJECT,
  };
}

export function receiveCreate(company) {
  return {
    company,
    type: COMPANY_SAVE_RECEIVED,
  };
}

export default function saveCompany(company) {
  return (dispatch, getState) => {
    dispatch(requestCreate());

    const settings = getSettings(getState());

    return save(company)
      .then((json) => {
        dispatch(receiveCreate(json));

        if (!settings.data.activeCompanyId) {
          const newSettings = {
            data: {
              activeCompanyId: json.id,
            },
          };
          dispatch(saveSettings(newSettings));
        }
      })

      .catch((error) => {
        dispatch(rejectCreate(error));
      })
    ;
  };
}

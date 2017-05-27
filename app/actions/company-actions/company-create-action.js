import { create } from 'app/storage/company-storage';
import { saveSettings } from 'app/actions/settings-actions';
import { getSettings } from 'app/reducers';
import { COMPANY_CREATE_RECEIVED, COMPANY_CREATE_REJECT, COMPANY_CREATE_REQUEST } from '../action-types';

export function requestCreate() {
  return {
    type: COMPANY_CREATE_REQUEST,
  };
}

export function rejectCreate(error) {
  return {
    error,
    type: COMPANY_CREATE_REJECT,
  };
}

export function receiveCreate(company) {
  return {
    company,
    type: COMPANY_CREATE_RECEIVED,
  };
}

export default function createCompany(company) {
  return (dispatch, getState) => {
    dispatch(requestCreate());

    const settings = getSettings(getState());

    const newCompany = {
      name: company.name,
      description: company.description,
    };

    return create(newCompany)
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

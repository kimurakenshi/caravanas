import { create } from 'app/storage/company-storage';
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

export function createCompany(company) {
  return (dispatch) => {
    dispatch(requestCreate());

    const newCompany = {
      name: company.name,
      description: company.description,
    };

    return create(newCompany)
      .then((json) => {
        dispatch(receiveCreate(json));
      })

      .catch((error) => {
        dispatch(rejectCreate(error));
      })
    ;
  };
}

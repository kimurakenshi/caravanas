import { removeById } from 'app/storage/company-storage';
import { COMPANY_DELETE_RECEIVED, COMPANY_DELETE_REJECT, COMPANY_DELETE_REQUEST } from '../action-types';

export function requestDelete() {
  return {
    type: COMPANY_DELETE_REQUEST,
  };
}

export function rejectDelete(error) {
  return {
    error,
    type: COMPANY_DELETE_REJECT,
  };
}

export function receiveDelete(companyId) {
  return {
    companyId,
    type: COMPANY_DELETE_RECEIVED,
  };
}

export default function deleteCompany(companyId) {
  return (dispatch) => {
    dispatch(requestDelete());

    return removeById(companyId)
      .then((json) => {
        dispatch(receiveDelete(json));
      })

      .catch((error) => {
        dispatch(rejectDelete(error));
      })
    ;
  };
}

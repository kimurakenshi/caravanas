import { getAll } from 'app/storage/company-storage';
import { COMPANY_FETCH_RECEIVED, COMPANY_FETCH_REJECT, COMPANY_FETCH_REQUEST } from '../action-types';

export function requestFetch() {
  return {
    type: COMPANY_FETCH_REQUEST,
  };
}

export function rejectFetch(error) {
  return {
    error,
    type: COMPANY_FETCH_REJECT,
  };
}

export function receiveFetch(companies) {
  return {
    companies,
    type: COMPANY_FETCH_RECEIVED,
  };
}

export default function fetchCompanies() {
  return (dispatch) => {
    dispatch(requestFetch());

    return getAll()
      .then((json) => {
        dispatch(receiveFetch(json));
      })

      .catch((error) => {
        dispatch(rejectFetch(error));
      })
    ;
  };
}

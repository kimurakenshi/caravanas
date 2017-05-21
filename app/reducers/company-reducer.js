import * as actionTypes from '../actions/action-types';

const {
  COMPANY_CREATE_RECEIVED,
  COMPANY_CREATE_REJECT,
  COMPANY_CREATE_REQUEST,
  COMPANY_FETCH_RECEIVED,
  COMPANY_FETCH_REJECT,
  COMPANY_FETCH_REQUEST,
} = actionTypes;

const initialState = {
  companies: [],
  error: null,
  isFetching: false,
};

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case COMPANY_CREATE_REQUEST:
    case COMPANY_FETCH_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case COMPANY_FETCH_RECEIVED: {
      return {
        companies: action.companies,
        isFetching: false,
        error: null,
      };
    }

    case COMPANY_CREATE_RECEIVED: {
      return {
        companies: state.companies.concat(action.company),
        isFetching: false,
        error: null,
      };
    }

    case COMPANY_CREATE_REJECT:
    case COMPANY_FETCH_REJECT: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }

    default: {
      return state;
    }
  }
}

export function getCompanies(state) {
  return state.companies;
}

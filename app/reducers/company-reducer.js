import * as actionTypes from '../actions/action-types';

const {
  COMPANY_SAVE_RECEIVED,
  COMPANY_SAVE_REJECT,
  COMPANY_SAVE_REQUEST,
  COMPANY_DELETE_RECEIVED,
  COMPANY_DELETE_REJECT,
  COMPANY_DELETE_REQUEST,
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
    case COMPANY_SAVE_REQUEST:
    case COMPANY_DELETE_REQUEST:
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

    case COMPANY_SAVE_RECEIVED: {
      return {
        companies: state.companies.concat(action.company),
        isFetching: false,
        error: null,
      };
    }

    case COMPANY_DELETE_RECEIVED: {
      return {
        companies: state.companies.filter((company) => company.id !== action.companyId),
        isFetching: false,
        error: null,
      };
    }

    case COMPANY_SAVE_REJECT:
    case COMPANY_DELETE_REJECT:
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
  return state;
}

import * as actionTypes from '../actions/action-types';
import COMPANY_LIST_MODE from 'app/containers/companies/components/company-list/enum';

const {
  COMPANY_DELETE_RECEIVED,
  COMPANY_DELETE_REJECT,
  COMPANY_DELETE_REQUEST,
  COMPANY_FETCH_RECEIVED,
  COMPANY_FETCH_REJECT,
  COMPANY_FETCH_REQUEST,
  COMPANY_LIST_SET_MODE,
  COMPANY_SAVE_RECEIVED,
  COMPANY_SAVE_REJECT,
  COMPANY_SAVE_REQUEST,
} = actionTypes;

export const initialState = {
  companies: [],
  editCompanyId: null,
  error: null,
  isFetching: false,
  viewMode: COMPANY_LIST_MODE.VIEW_MODE,
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

    case COMPANY_LIST_SET_MODE: {
      const {
        viewMode,
        editCompanyId = null,
      } = action.payload;

      return {
        ...state,
        viewMode,
        editCompanyId,
      };
    }

    case COMPANY_FETCH_RECEIVED: {
      return {
        ...state,
        companies: action.companies,
        isFetching: false,
        error: null,
      };
    }

    case COMPANY_SAVE_RECEIVED: {
      const updatedCompanies = state.companies
        .filter((company) => company.id !== action.company.id)
        .concat(action.company)
      ;

      return {
        ...state,
        companies: updatedCompanies,
        isFetching: false,
        error: null,
      };
    }

    case COMPANY_DELETE_RECEIVED: {
      return {
        ...state,
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

export function getCompanyById(state, id) {
  return state.companies.find((company) => company.id === id);
}

export function hasCompany(state, name, excludeId) {
  return state.companies
    .some((company) => {
      if (excludeId) {
        return company.id !== excludeId && company.name.toLowerCase() === name.toLowerCase();
      }

      return company.name.toLowerCase() === name.toLowerCase();
    })
  ;
}

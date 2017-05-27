import * as actionTypes from '../actions/action-types';

const {
  SETTINGS_FETCH_RECEIVED,
  SETTINGS_FETCH_REQUEST,
  SETTINGS_FETCH_REJECT,
  SETTINGS_SAVE_RECEIVED,
  SETTINGS_SAVE_REJECT,
  SETTINGS_SAVE_REQUEST,
} = actionTypes;

const initialState = {
  data: {
    activeCompanyId: null,
  },
  app: {
    sidebarOpen: true,
  },
  error: null,
  isFetching: false,
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_FETCH_REQUEST:
    case SETTINGS_SAVE_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case SETTINGS_SAVE_RECEIVED: {
      return {
        state,
        ...action.settings,
        isFetching: false,
        error: null,
      };
    }

    case SETTINGS_FETCH_RECEIVED: {
      return {
        state,
        ...action.settings,
      };
    }

    case SETTINGS_FETCH_REJECT:
    case SETTINGS_SAVE_REJECT: {
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

export function getSettings(state) {
  return state;
}

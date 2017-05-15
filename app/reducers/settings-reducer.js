import { SETTINGS_RECEIVED } from '../actions/action-types';

const initialState = {
  data: {
    defaultCompanyId: null,
  },
  app: {
    sidebarOpen: true,
  },
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {

    case SETTINGS_RECEIVED: {
      return {
        state,
        ...action.settings,
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

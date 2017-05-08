import { SIDEBAR_CLOSE, SIDEBAR_OPEN } from '../actions/action-types';

const initialState = {
  isOpen: false,
};

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case SIDEBAR_CLOSE: {
      return initialState;
    }

    case SIDEBAR_OPEN: {
      return { isOpen: true };
    }

    default: {
      return initialState;
    }
  }
}

export function isOpen(state) {
  return state.isOpen;
}

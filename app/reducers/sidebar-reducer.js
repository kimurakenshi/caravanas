import { SIDEBAR_TOGGLE } from '../actions/action-types';

const initialState = {
  isOpen: false,
};

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case SIDEBAR_TOGGLE: {
      return {
        isOpen: !state.isOpen,
      };
    }

    default: {
      return initialState;
    }
  }
}

export function isOpen(state) {
  return state.isOpen;
}

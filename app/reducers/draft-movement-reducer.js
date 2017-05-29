import * as actionTypes from '../actions/action-types';

const {
  MOVEMENT_DRAFT_INIT,
  MOVEMENT_DRAFT_ADD,
  MOVEMENT_DRAFT_DELETE,
} = actionTypes;

const initialState = {
  id: null,
  creationDate: null,
  caravanas: [],
};

export default function draftMovementReducer(state = initialState, action) {
  switch (action.type) {
    case MOVEMENT_DRAFT_INIT: {
      return {
        ...initialState,
      };
    }

    case MOVEMENT_DRAFT_ADD: {
      if (state.caravanas.some((c) => c.id === action.payload.caravana.id)) {
        return state;
      }

      const caravanaToAdd = Object.assign({}, action.payload.caravana);

      const updatedCaravanas = state.caravanas.concat(caravanaToAdd);

      return {
        ...state,
        caravanas: updatedCaravanas,
      };
    }

    case MOVEMENT_DRAFT_DELETE: {
      if (!state.caravanas.some((c) => c.id === action.payload.id)) {
        return state;
      }

      return {
        ...state,
        caravanas: state.caravanas.filter((c) => c.id !== action.payload.id),
      };
    }

    default: {
      return state;
    }
  }
}

export function getDraftMovements(state) {
  return state;
}

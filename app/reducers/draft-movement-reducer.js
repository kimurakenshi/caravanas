import * as actionTypes from '../actions/action-types';
import MOVEMENT_STATUS from 'app/containers/create-movement/enum';

const {
  MOVEMENT_DRAFT_INIT,
  MOVEMENT_DRAFT_SET,
  MOVEMENT_DRAFT_ADD,
  MOVEMENT_DRAFT_DELETE,
  MOVEMENT_SAVE_RECEIVED,
} = actionTypes;

const initialState = {
  id: null,
  idCompany: null,
  creationDate: null,
  caravanas: [],
  status: MOVEMENT_STATUS.DRAFT,
};

export default function draftMovementReducer(state = initialState, action) {
  switch (action.type) {
    case MOVEMENT_DRAFT_INIT: {
      return {
        ...initialState,
        idCompany: action.payload.activeCompanyId,
      };
    }

    case MOVEMENT_DRAFT_SET: {
      return {
        ...action.payload.movement,
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

    case MOVEMENT_SAVE_RECEIVED: {
      return {
        ...action.movement,
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

export function getDraftMovement(state) {
  return state;
}

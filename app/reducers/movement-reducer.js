import * as actionTypes from '../actions/action-types';
import MOVEMENT_LIST_MODE from 'app/containers/movements/components/movement-list/enum';

const {
  MOVEMENT_SAVE_RECEIVED,
  MOVEMENT_SAVE_REJECT,
  MOVEMENT_SAVE_REQUEST,
  MOVEMENT_DELETE_RECEIVED,
  MOVEMENT_DELETE_REJECT,
  MOVEMENT_DELETE_REQUEST,
  MOVEMENT_FETCH_RECEIVED,
  MOVEMENT_FETCH_REJECT,
  MOVEMENT_FETCH_REQUEST,
  MOVEMENT_LIST_SET_MODE,
} = actionTypes;

const initialState = {
  movements: [],
  editMovementId: null,
  error: null,
  isFetching: false,
  viewMode: MOVEMENT_LIST_MODE.VIEW_MODE,
};

export default function movementReducer(state = initialState, action) {
  switch (action.type) {
    case MOVEMENT_SAVE_REQUEST:
    case MOVEMENT_DELETE_REQUEST:
    case MOVEMENT_FETCH_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case MOVEMENT_FETCH_RECEIVED: {
      return {
        ...state,
        movements: action.movements,
        isFetching: false,
        error: null,
      };
    }

    case MOVEMENT_LIST_SET_MODE: {
      const {
        viewMode,
        editMovementId = null,
      } = action.payload;

      return {
        ...state,
        viewMode,
        editMovementId,
      };
    }

    case MOVEMENT_SAVE_RECEIVED: {
      const updatedMovements = state.movements
        .filter((movement) => movement.id !== action.movement.id)
        .concat(action.movement)
      ;

      return {
        ...state,
        movements: updatedMovements,
        isFetching: false,
        error: null,
      };
    }

    case MOVEMENT_DELETE_RECEIVED: {
      return {
        ...state,
        movements: state.movements.filter((movement) => movement.id !== action.movementId),
        isFetching: false,
        error: null,
      };
    }

    case MOVEMENT_SAVE_REJECT:
    case MOVEMENT_DELETE_REJECT:
    case MOVEMENT_FETCH_REJECT: {
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

export function getMovements(state) {
  return state;
}

export function getMovementById(state, id) {
  return state.movements.find((movement) => movement.id === id);
}

import * as actionTypes from '../actions/action-types';
import CARAVANA_LIST_MODE from 'app/containers/caravanas/components/caravanas-list/enum';

const {
  CARAVANA_SAVE_RECEIVED,
  CARAVANA_SAVE_REJECT,
  CARAVANA_SAVE_REQUEST,
  CARAVANA_DELETE_RECEIVED,
  CARAVANA_DELETE_REJECT,
  CARAVANA_DELETE_REQUEST,
  CARAVANA_FETCH_RECEIVED,
  CARAVANA_FETCH_REJECT,
  CARAVANA_FETCH_REQUEST,
  CARAVANA_LIST_SET_MODE,
} = actionTypes;

const initialState = {
  caravanas: [],
  editCaravanaId: null,
  error: null,
  isFetching: false,
  viewMode: CARAVANA_LIST_MODE.VIEW_MODE,
};

export default function caravanaReducer(state = initialState, action) {
  switch (action.type) {
    case CARAVANA_SAVE_REQUEST:
    case CARAVANA_DELETE_REQUEST:
    case CARAVANA_FETCH_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case CARAVANA_FETCH_RECEIVED: {
      return {
        ...state,
        caravanas: action.caravanas,
        isFetching: false,
        error: null,
      };
    }

    case CARAVANA_LIST_SET_MODE: {
      const {
        viewMode,
        editCaravanaId = null,
      } = action.payload;

      return {
        ...state,
        viewMode,
        editCaravanaId,
      };
    }

    case CARAVANA_SAVE_RECEIVED: {
      const updatedCaravanas = state.caravanas
        .filter((caravana) => caravana.id !== action.caravana.id)
        .concat(action.caravana)
      ;

      return {
        ...state,
        caravanas: updatedCaravanas,
        isFetching: false,
        error: null,
      };
    }

    case CARAVANA_DELETE_RECEIVED: {
      return {
        caravanas: state.caravanas.filter((caravana) => caravana.id !== action.caravanaId),
        isFetching: false,
        error: null,
      };
    }

    case CARAVANA_SAVE_REJECT:
    case CARAVANA_DELETE_REJECT:
    case CARAVANA_FETCH_REJECT: {
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

export function getCaravanas(state) {
  return state;
}

export function getCaravanaById(state, id) {
  return state.caravanas.find((caravana) => caravana.id === id);
}

export function hasCaravana(state, caravanaNumber, excludeId) {
  return state.caravanas
    .some((caravana) => {
      if (excludeId) {
        return (
          caravana.id !== excludeId &&
          caravana.number.toLowerCase() === caravanaNumber.toLowerCase());
      }

      return caravana.number.toLowerCase() === caravanaNumber.toLowerCase();
    })
  ;
}

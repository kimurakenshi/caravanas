import * as actionTypes from '../actions/action-types';

const {
  CARAVANA_CREATE_RECEIVED,
  CARAVANA_CREATE_REJECT,
  CARAVANA_CREATE_REQUEST,
  CARAVANA_DELETE_RECEIVED,
  CARAVANA_DELETE_REJECT,
  CARAVANA_DELETE_REQUEST,
  CARAVANA_FETCH_RECEIVED,
  CARAVANA_FETCH_REJECT,
  CARAVANA_FETCH_REQUEST,
} = actionTypes;

const initialState = {
  caravanas: [],
  error: null,
  isFetching: false,
};

export default function caravanaReducer(state = initialState, action) {
  switch (action.type) {
    case CARAVANA_CREATE_REQUEST:
    case CARAVANA_DELETE_REQUEST:
    case CARAVANA_FETCH_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case CARAVANA_FETCH_RECEIVED: {
      return {
        caravanas: action.caravanas,
        isFetching: false,
        error: null,
      };
    }

    case CARAVANA_CREATE_RECEIVED: {
      return {
        caravanas: state.caravanas.concat(action.caravana),
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

    case CARAVANA_CREATE_REJECT:
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

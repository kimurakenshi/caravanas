import { MOVEMENT_DRAFT_INIT, MOVEMENT_DRAFT_ADD, MOVEMENT_DRAFT_DELETE, MOVEMENT_DRAFT_SET } from '../action-types';
import { getMovementById } from 'app/reducers';

export function initDraftMovement(activeCompanyId) {
  return {
    payload: {
      activeCompanyId,
    },
    type: MOVEMENT_DRAFT_INIT,
  };
}

export function setDraftMovement(id) {
  return (dispatch, getState) => {
    const movement = getMovementById(getState(), id);

    return {
      payload: {
        movement,
      },
      type: MOVEMENT_DRAFT_SET,
    };
  };
}

export function addCaravanaToDraftMovement(caravana) {
  return {
    payload: {
      caravana,
    },
    type: MOVEMENT_DRAFT_ADD,
  };
}

export function removeCaravanaFromDraftMovement(id) {
  return {
    payload: {
      id,
    },
    type: MOVEMENT_DRAFT_DELETE,
  };
}

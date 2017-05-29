import { MOVEMENT_DRAFT_INIT, MOVEMENT_DRAFT_ADD, MOVEMENT_DRAFT_DELETE } from '../action-types';

export function initDraftMovement(movement = null) {
  return {
    movement,
    type: MOVEMENT_DRAFT_INIT,
  };
}

export function addCaravanaToDraftMovement(caravana) {
  return {
    caravana,
    type: MOVEMENT_DRAFT_ADD,
  };
}

export function removeCaravanaFromDraftMovement(id) {
  return {
    id,
    type: MOVEMENT_DRAFT_DELETE,
  };
}

import { MOVEMENT_LIST_SET_MODE } from '../action-types';

export default function setListMode(viewMode, editMovementId = null) {
  return {
    payload: {
      editMovementId,
      viewMode,
    },
    type: MOVEMENT_LIST_SET_MODE,
  };
}

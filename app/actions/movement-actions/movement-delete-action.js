import { removeById } from 'app/storage/movement-storage';
import { MOVEMENT_DELETE_RECEIVED, MOVEMENT_DELETE_REJECT, MOVEMENT_DELETE_REQUEST } from '../action-types';

export function requestDelete() {
  return {
    type: MOVEMENT_DELETE_REQUEST,
  };
}

export function rejectDelete(error) {
  return {
    error,
    type: MOVEMENT_DELETE_REJECT,
  };
}

export function receiveDelete(movementId) {
  return {
    movementId,
    type: MOVEMENT_DELETE_RECEIVED,
  };
}

export default function deleteMovement(movement) {
  return (dispatch) => {
    dispatch(requestDelete());

    return removeById(movement)
      .then((json) => {
        dispatch(receiveDelete(json));
      })

      .catch((error) => {
        dispatch(rejectDelete(error));
      })
    ;
  };
}

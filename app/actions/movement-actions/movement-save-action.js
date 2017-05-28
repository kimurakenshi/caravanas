import { save } from 'app/storage/movement-storage';
import { MOVEMENT_SAVE_RECEIVED, MOVEMENT_SAVE_REJECT, MOVEMENT_SAVE_REQUEST } from '../action-types';

export function requestCreate() {
  return {
    type: MOVEMENT_SAVE_REQUEST,
  };
}

export function rejectCreate(error) {
  return {
    error,
    type: MOVEMENT_SAVE_REJECT,
  };
}

export function receiveCreate(movement) {
  return {
    movement,
    type: MOVEMENT_SAVE_RECEIVED,
  };
}

export default function saveMovement(movement) {
  return (dispatch) => {
    dispatch(requestCreate());

    return save(movement)
      .then((json) => {
        dispatch(receiveCreate(json));
      })

      .catch((error) => {
        dispatch(rejectCreate(error));
      })
    ;
  };
}

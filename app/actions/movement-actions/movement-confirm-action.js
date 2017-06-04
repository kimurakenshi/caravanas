import { save } from 'app/storage/movement-storage';
import { MOVEMENT_CONFIRM_RECEIVED, MOVEMENT_CONFIRM_REJECT, MOVEMENT_CONFIRM_REQUEST } from '../action-types';
import { deleteCaravanaList } from 'app/actions/caravana-actions';

export function requestConfirm() {
  return {
    type: MOVEMENT_CONFIRM_REQUEST,
  };
}

export function rejectConfirm(error) {
  return {
    error,
    type: MOVEMENT_CONFIRM_REJECT,
  };
}

export function receiveConfirm(movement) {
  return {
    movement,
    type: MOVEMENT_CONFIRM_RECEIVED,
  };
}

export default function confirmMovement(movement, status) {
  return (dispatch) => {
    dispatch(requestConfirm());

    movement.status = status;

    return save(movement)
      .then((json) => {
        dispatch(receiveConfirm(json));
        dispatch(deleteCaravanaList(movement.caravanas));
      })

      .catch((error) => {
        dispatch(rejectConfirm(error));
      })
    ;
  };
}

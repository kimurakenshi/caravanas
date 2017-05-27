import { SETTINGS_FETCH_RECEIVED, SETTINGS_FETCH_REJECT, SETTINGS_FETCH_REQUEST } from '../action-types';

export function requestSettings() {
  return {
    type: SETTINGS_FETCH_REQUEST,
  };
}

export function rejectSettings() {
  return {
    type: SETTINGS_FETCH_REJECT,
  };
}

export function receiveSettings(settings) {
  return {
    settings,
    type: SETTINGS_FETCH_RECEIVED,
  };
}

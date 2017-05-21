import { SETTINGS_RECEIVED, SETTINGS_REJECT, SETTINGS_REQUEST } from './action-types';

export function requestSettings() {
  return {
    type: SETTINGS_REQUEST,
  };
}

export function rejectSettings() {
  return {
    type: SETTINGS_REJECT,
  };
}

export function receiveSettings(settings) {
  return {
    settings,
    type: SETTINGS_RECEIVED,
  };
}

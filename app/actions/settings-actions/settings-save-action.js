import { getSettings } from 'app/reducers';
import save from 'app/storage/settings-storage';
import { SETTINGS_SAVE_RECEIVED, SETTINGS_SAVE_REJECT, SETTINGS_SAVE_REQUEST } from '../action-types';

export function requestSaveSettings() {
  return {
    type: SETTINGS_SAVE_REQUEST,
  };
}

export function rejectSaveSettings() {
  return {
    type: SETTINGS_SAVE_REJECT,
  };
}

export function receiveSaveSettings(settings) {
  return {
    settings,
    type: SETTINGS_SAVE_RECEIVED,
  };
}

export default function saveSettings(settings) {
  return (dispatch, getState) => {
    dispatch(requestSaveSettings());

    const currentSettings = getSettings(getState());

    const newSettings = {
      ...currentSettings,
      ...settings,
    };

    return save(newSettings)
      .then((json) => {
        dispatch(receiveSaveSettings(json));
      })

      .catch((error) => {
        dispatch(rejectSaveSettings(error));
      })
    ;
  };
}

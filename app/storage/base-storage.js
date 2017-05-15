import isEmpty from 'lodash/isEmpty';
import { SETTINGS_STORAGE_KEY } from './enum';

const storage = require('electron-json-storage');

window.resetSettings = save;

const initialSettings = {
  settingsReducer: {
    data: {
      defaultCompanyId: 2,
    },
    app: {
      sidebarOpen: true,
    }
  }
};

function parseStorageResponse(response, emptyResponse = null) {
  return isEmpty(response) ? emptyResponse : response;
}

export function get(key) {
  return new Promise((resolve, reject) => {
    storage.get(key, (error, data) => {
      if (error) {
        reject('Se produjo un error al intentar  obtener la información.');
      }

      resolve(parseStorageResponse(data));
    });
  });
}

export function save(key, data) {
  return new Promise((resolve, reject) => {
    storage.set(key, data, (error) => {
      if (error) {
        reject('Se produjo un error al intentar guardar los cambios.');
      }

      resolve(parseStorageResponse(data));
    });
  });
}

export function getInitialStorage() {
  return new Promise((resolve, reject) => {
    get(SETTINGS_STORAGE_KEY)
      .then((data) => {
        if (data) {
          resolve(data);

          return;
        }

        save(SETTINGS_STORAGE_KEY, initialSettings)
          .then((initialData) => resolve(initialData))

          .catch(() => {
            reject('Error al inicializar la aplicación.');
          })
        ;
      })
      .catch((err) => console.log(err))
    ;
  });
}

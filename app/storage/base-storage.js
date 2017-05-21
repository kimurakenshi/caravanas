import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import uuid from 'uuid';
import { SETTINGS_STORAGE_KEY, STORAGE_TYPE } from './enum';

const storage = require('electron-json-storage');

window.resetSettings = save;

const initialSettings = {
  settingsReducer: {
    data: {
      defaultCompanyId: null, //@todo: revert to null
    },
    app: {
      sidebarOpen: true,
    }
  }
};

function parseStorageResponse(response, emptyResponse = null) {
  return isEmpty(response) ? emptyResponse : response;
}

export function get(key, defaultValue = null) {
  return new Promise((resolve, reject) => {
    storage.get(key, (error, data) => {
      if (error) {
        reject('Se produjo un error al intentar  obtener la información.');
      }

      resolve(parseStorageResponse(data, defaultValue));
    });
  });
}

function getInitialValueForStorage(storageType) {
  switch (storageType) {
    case STORAGE_TYPE.ARRAY: {
      return [];
    }
    case STORAGE_TYPE.OBJECT: {
      return {};
    }
    default: {
      return {};
    }
  }
}

function getStorageDataForType(currentStorage, newData, storageType) {
  let storageData = currentStorage;

  // Initialize the storage if is empty.
  if (isEmpty(storageData)) {
    storageData = getInitialValueForStorage(storageType);
  }

  // Update the storage based on the storage type.
  if (storageType === STORAGE_TYPE.ARRAY) {
    storageData.push(newData);
  } else {
    storageData = newData;
  }

  return storageData;
}

export function create(key, item, storageType) {
  return new Promise((resolve, reject) => {
    const itemToSave = Object.assign({}, item);

    // Generate id for new items.
    if (!has(item, 'id')) {
      itemToSave['id'] = uuid();
    }

    get(key)
      .then((data) => {
        const newStorage = getStorageDataForType(data, itemToSave, storageType);

        save(key, newStorage)
          .then(() => {
            resolve(itemToSave);
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}

function save(key, data) {
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

import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import uuid from 'uuid';
import { STORAGE_TYPE } from './enum';

const storage = require('electron-json-storage');

window.resetSettings = updateStorage;

window.cleanStorage = () => {
  updateStorage('SETTINGS', null);
  updateStorage('COMPANY', null);
  updateStorage('CARAVANAS', null);
  updateStorage('MOVEMENT', null);
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

function getStorageDataForType(currentStorage, storageType) {
  let storageData = currentStorage;

  // Initialize the storage if is empty.
  if (isEmpty(storageData)) {
    storageData = getInitialValueForStorage(storageType);
  }

  return storageData;
}

/**
 * Create or Update an item in the storage based on the storageType and
 * the item to save. If the item has not an id property is considered new
 * and add it as a new item to the correspodent storage based on the storage key.
 * @param key
 * @param item
 * @param storageType
 * @returns {Promise}
 */
export function save(key, item, storageType) {
  return new Promise((resolve, reject) => {
    const itemToSave = Object.assign({}, item);
    const isNew = !has(item, 'id') || !item.id;

    // Generate id for new items.
    if (isNew) {
      itemToSave['id'] = uuid();
    }

    get(key)
      .then((data) => {
        let storageData = getStorageDataForType(data, storageType);

        // Update the storage based on the storage type.
        if (storageType === STORAGE_TYPE.ARRAY) {
          if (!isNew) {
            storageData = storageData.filter((item) => item.id !== itemToSave.id);
          }

          storageData.push(itemToSave);
        } else {
          storageData = itemToSave;
        }

        updateStorage(key, storageData)
          .then(() => {
            resolve(itemToSave);
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}

export function removeById(key, id, storageType) {
  return new Promise((resolve, reject) => {
    get(key)
      .then((data) => {
        const newStorage = getStorageDataForType(data, undefined, storageType);

        const updatedStorage = newStorage.filter((item) => item.id !== id);

        updateStorage(key, updatedStorage)
          .then(() => {
            resolve(id);
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}


/**
 * Update an storage defined by the key with the provided data.
 * @param key
 * @param data
 * @returns {Promise}
 */
export function updateStorage(key, data) {
  return new Promise((resolve, reject) => {
    storage.set(key, data, (error) => {
      if (error) {
        reject('Se produjo un error al intentar guardar los cambios.');
      }

      resolve(parseStorageResponse(data));
    });
  });
}

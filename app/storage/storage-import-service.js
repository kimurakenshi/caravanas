import * as baseStorage from 'app/storage/base-storage';
import { getStorageKeyValues } from 'app/storage/enum';

export default function importConfigData(dataToImport) {
  return new Promise((resolve, reject) => {
    const importPromises = [];
    const storageKeys = getStorageKeyValues();

    Object.keys(dataToImport).forEach((key) => {
      if (storageKeys.includes(key)) {
        importPromises.push(() => baseStorage.updateStorage(key, dataToImport[key]));
      }
    });

    baseStorage
      .clear()
      .then(() => {
        Promise
          .all(importPromises.map((promise) => promise()))
          .then(() => resolve('Los datos se importaron exitosamente.'))
          .catch(() => reject('Se produjo un error al importar los datos.'))
        ;
      })
      .catch(() => reject('Se produjo un error al importar los datos.'))
    ;
  });
}

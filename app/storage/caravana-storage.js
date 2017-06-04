import { CARAVANAS_STORAGE_KEY, STORAGE_TYPE } from './enum';
import * as baseStorage from './base-storage';

export function save(caravana) {
  return baseStorage
    .save(CARAVANAS_STORAGE_KEY, caravana, STORAGE_TYPE.ARRAY)
  ;
}


export function removeById(caravanaId) {
  return baseStorage
    .removeById(CARAVANAS_STORAGE_KEY, caravanaId, STORAGE_TYPE.ARRAY)
  ;
}

export function removeList(caravanasToRemove) {
  return new Promise((resolve, reject) => {
    baseStorage
      .get(CARAVANAS_STORAGE_KEY)
      .then((caravanas) => {
        const caravanasToRemoveId = caravanasToRemove
          .map((caravana) => caravana.id)
        ;

        const caravanasToSave = caravanas
          .filter((caravana) => !caravanasToRemoveId.includes(caravana.id))
        ;

        baseStorage.updateStorage(CARAVANAS_STORAGE_KEY, caravanasToSave)
          .then(() => resolve(caravanasToSave))
          .catch(() => reject('Se produjo un error al eliminar el listado de caravanas.'))
        ;
      })
      .catch(() => reject('Se produjo un error al eliminar el listado de caravanas.'))
    ;
  });
}

export function getCaravana(caravanaId) {
  return baseStorage
    .get(CARAVANAS_STORAGE_KEY)
    .then((caravanas) => caravanas.filter((caravana) => caravana.id === caravanaId))
  ;
}

export function getAllForCompany(companyId) {
  return baseStorage
    .get(CARAVANAS_STORAGE_KEY, [])
    .then((caravanas) => caravanas.filter((caravana) => caravana.idCompany === companyId))
  ;
}

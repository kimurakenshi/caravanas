import { CARAVANAS_STORAGE_KEY, STORAGE_TYPE } from './enum';
import * as baseStorage from './base-storage';

export function create(caravana) {
  return baseStorage
    .create(CARAVANAS_STORAGE_KEY, caravana, STORAGE_TYPE.ARRAY)
  ;
}


export function removeById(caravanaId) {
  return baseStorage
    .removeById(CARAVANAS_STORAGE_KEY, caravanaId, STORAGE_TYPE.ARRAY)
  ;
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

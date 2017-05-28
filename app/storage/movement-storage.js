import { MOVEMENTS_STORAGE_KEY, STORAGE_TYPE } from './enum';
import * as baseStorage from './base-storage';

export function save(movement) {
  return baseStorage
    .save(MOVEMENTS_STORAGE_KEY, movement, STORAGE_TYPE.ARRAY)
  ;
}

export function removeById(movementId) {
  return baseStorage
    .removeById(MOVEMENTS_STORAGE_KEY, movementId, STORAGE_TYPE.ARRAY)
  ;
}

export function getMovement(movementId) {
  return baseStorage
    .get(MOVEMENTS_STORAGE_KEY)
    .then((movements) => movements.filter((movement) => movement.id === movementId))
  ;
}

export function getAllForCompany(companyId) {
  return baseStorage
    .get(MOVEMENTS_STORAGE_KEY, [])
    .then((movements) => movements.filter((movement) => movement.idCompany === companyId))
  ;
}

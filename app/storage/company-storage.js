import { COMPANY_STORAGE_KEY, STORAGE_TYPE } from './enum';
import * as baseStorage from './base-storage';
import { getAllForCompany as getMovements } from './movement-storage';
import { getAllForCompany as getCaravanas } from './caravana-storage';

export function save(company) {
  return baseStorage
    .save(COMPANY_STORAGE_KEY, company, STORAGE_TYPE.ARRAY)
  ;
}


export function removeById(companyId) {
  return new Promise((resolve, reject) => {
    const checkDependenciesPromises = [
      () => getMovements(companyId),
      () => getCaravanas(companyId),
    ];

    Promise
      .all(checkDependenciesPromises.map((dependency) => dependency()))
      .then((response) => {
        const movements = response[0];
        const caravanas = response[1];

        if (movements.length > 0) {
          reject('La empresa tiene moviemientos asociados y no puede ser eliminada.');

          return;
        }

        if (caravanas.length > 0) {
          reject('La empresa tiene caravanas asociadas y no puede ser eliminada.');

          return;
        }

        resolve(baseStorage.removeById(COMPANY_STORAGE_KEY, companyId, STORAGE_TYPE.ARRAY));
      })
      .catch(() => reject('Se produjo un error al intentar eliminar la empresa.'))
    ;
  });
}

export function getCompany(companyId) {
  return baseStorage
    .get(COMPANY_STORAGE_KEY)
    .then((companies) => companies.filter((company) => company.id === companyId))
  ;
}

export function getAll() {
  return baseStorage
    .get(COMPANY_STORAGE_KEY, [])
  ;
}

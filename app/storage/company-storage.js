import { COMPANY_STORAGE_KEY, STORAGE_TYPE } from './enum';
import * as baseStorage from './base-storage';

export function save(company) {
  return baseStorage
    .save(COMPANY_STORAGE_KEY, company, STORAGE_TYPE.ARRAY)
  ;
}


export function removeById(companyId) {
  return baseStorage
    .removeById(COMPANY_STORAGE_KEY, companyId, STORAGE_TYPE.ARRAY)
  ;
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

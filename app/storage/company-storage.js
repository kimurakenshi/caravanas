import { COMPANY_STORAGE_KEY, STORAGE_TYPE } from './enum';
import * as baseStorage from './base-storage';

export function create(company) {
  return baseStorage
    .create(COMPANY_STORAGE_KEY, company, STORAGE_TYPE.ARRAY)
  ;
}


export function remove(company) {
  // @todo: get the companies and remove the current.
  const companies = [company];

  return baseStorage
    .save(COMPANY_STORAGE_KEY, companies)
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

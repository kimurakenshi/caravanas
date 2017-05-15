import { COMPANY_STORAGE_KEY } from './enum';
import * as baseStorage from './base-storage';

export function save(company) {
  // @todo: get the companies and append the new one.
  const companies = [company];

  return baseStorage
    .save(COMPANY_STORAGE_KEY, companies)
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

import { SETTINGS_STORAGE_KEY, COMPANY_STORAGE_KEY } from './enum';
import { initialState } from 'app/reducers/company-reducer';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import * as baseStorage from './base-storage';

const initialSettings = {
  data: {
    activeCompanyId: null,
  },
  app: {
    sidebarOpen: true,
  }
};

function getCompaniesInitialState(companiesData) {
  const companiesInitialValue = !isEmpty(companiesData) ? companiesData : [];

  return Object.assign({}, initialState, { companies: companiesInitialValue });
}

export function getInitialStorage() {
  return new Promise((resolve, reject) => {
    baseStorage.get(SETTINGS_STORAGE_KEY)
      .then((settings) => {
        if (settings) {
          if (settings.data.activeCompanyId) {
            baseStorage.get(COMPANY_STORAGE_KEY)
              .then((companies) => {
                resolve({
                  companyReducer: getCompaniesInitialState(companies),
                  settingsReducer: settings,
                });
              })
              .catch(() => {
                reject('Error al inicializar la aplicación.');
              })
            ;
          } else {
            resolve({ settingsReducer: settings });
          }

          return;
        }

        baseStorage.updateStorage(SETTINGS_STORAGE_KEY, initialSettings)
          .then((initialData) => resolve({ settingsReducer: initialData }))

          .catch(() => {
            reject('Error al inicializar la aplicación.');
          })
        ;
      })
      .catch((err) => console.log(err))
    ;
  });
}

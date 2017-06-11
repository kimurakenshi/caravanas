import { SETTINGS_STORAGE_KEY, COMPANY_STORAGE_KEY, MOVEMENTS_STORAGE_KEY } from './enum';
import { initialState as companyInitialState } from 'app/reducers/company-reducer';
import { initialState as movementInitialState } from 'app/reducers/movement-reducer';
import isEmpty from 'lodash/isEmpty';
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

  return Object.assign({}, companyInitialState, { companies: companiesInitialValue });
}

function getMovementsInitialState(movementsData, activeCompanyId) {
  const movementsInitialValue = !isEmpty(movementsData) ?
    movementsData.filter((movement) => movement.idCompany === activeCompanyId) :
    [];

  return Object.assign({}, movementInitialState, { movements: movementsInitialValue });
}

export default function getInitialStorage() {
  return new Promise((resolve, reject) => {
    baseStorage.get(SETTINGS_STORAGE_KEY)
      .then((settings) => {
        if (settings) {
          if (settings.data.activeCompanyId) {
            baseStorage.get(COMPANY_STORAGE_KEY)
              .then((companies) => {
                baseStorage.get(MOVEMENTS_STORAGE_KEY)
                  .then((movements) => {
                    resolve({
                      companyReducer: getCompaniesInitialState(companies),
                      movementReducer: getMovementsInitialState(
                        movements,
                        settings.data.activeCompanyId,
                      ),
                      settingsReducer: settings,
                    });
                  })
                  .catch(() => {
                    reject('Error al inicializar la aplicación.');
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

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import caravanaReducer, * as fromCaravana from './caravana-reducer';
import companyReducer, * as fromCompany from './company-reducer';
import sidebarReducer, * as fromSidebar from './sidebar-reducer';
import settingsReducer, * as fromSettings from './settings-reducer';

const rootReducer = combineReducers({
  caravanaReducer,
  companyReducer,
  settingsReducer,
  sidebarReducer,
  router,
});

export default rootReducer;

export function isSidebarOpen(state) {
  return fromSidebar.isOpen(state.sidebarReducer);
}

export function getSettings(state) {
  return fromSettings.getSettings(state.settingsReducer);
}

export function getCaravanas(state) {
  return fromCaravana.getCaravanas(state.caravanaReducer);
}

export function getCompanies(state) {
  return fromCompany.getCompanies(state.companyReducer);
}

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import companyReducer, * as fromCompany from './company-reducer';
import sidebarReducer, * as fromSidebar from './sidebar-reducer';
import settingsReducer, * as fromSettings from './settings-reducer';

const rootReducer = combineReducers({
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

export function getCompanies(state) {
  return fromCompany.getCompanies(state.companyReducer);
}

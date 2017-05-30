import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import caravanaReducer, * as fromCaravana from './caravana-reducer';
import draftMovementReducer, * as fromDraftMovementReducer from './draft-movement-reducer';
import movementReducer, * as fromMovement from './movement-reducer';
import companyReducer, * as fromCompany from './company-reducer';
import sidebarReducer, * as fromSidebar from './sidebar-reducer';
import settingsReducer, * as fromSettings from './settings-reducer';

const rootReducer = combineReducers({
  caravanaReducer,
  companyReducer,
  draftMovementReducer,
  movementReducer,
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

export function getCaravanaById(state, id) {
  return fromCaravana.getCaravanaById(state.caravanaReducer, id);
}

export function getCaravanas(state) {
  return fromCaravana.getCaravanas(state.caravanaReducer);
}

export function hasCaravana(state, caravanaNumber, excludeId = null) {
  return fromCaravana.hasCaravana(state.caravanaReducer, caravanaNumber, excludeId);
}

export function hasCompany(state, name, excludeId = null) {
  return fromCompany.hasCompany(state.companyReducer, name, excludeId);
}

export function getCompanies(state) {
  return fromCompany.getCompanies(state.companyReducer);
}

export function getCompanyById(state, id) {
  return fromCompany.getCompanyById(state.companyReducer, id);
}

export function getMovementById(state, id) {
  return fromMovement.getMovementById(state.movementReducer, id);
}

export function getMovements(state) {
  return fromMovement.getMovements(state.movementReducer);
}

export function getDraftMovement(state) {
  return fromDraftMovementReducer.getDraftMovement(state.draftMovementReducer);
}

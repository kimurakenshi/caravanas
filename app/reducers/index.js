// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import sidebarReducer, * as fromSidebar from './sidebar-reducer';

const rootReducer = combineReducers({
  counter,
  sidebarReducer,
  router,
});

export default rootReducer;

export function isSidebarOpen(state) {
  return fromSidebar.isOpen(state.sidebarReducer);
}

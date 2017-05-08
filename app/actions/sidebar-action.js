import { SIDEBAR_CLOSE, SIDEBAR_OPEN } from './action-types';

export function closeSidebar() {
  return {
    type: SIDEBAR_CLOSE
  };
}

export function openSidebar() {
  return {
    type: SIDEBAR_OPEN
  };
}

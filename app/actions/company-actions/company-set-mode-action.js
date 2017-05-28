import { COMPANY_LIST_SET_MODE } from '../action-types';

export default function setListMode(viewMode, editCompanyId = null) {
  return {
    payload: {
      editCompanyId,
      viewMode,
    },
    type: COMPANY_LIST_SET_MODE,
  };
}

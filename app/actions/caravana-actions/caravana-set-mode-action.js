import { CARAVANA_LIST_SET_MODE } from '../action-types';

export default function setListMode(editCaravanaId, viewMode) {
  return {
    payload: {
      editCaravanaId,
      viewMode,
    },
    type: CARAVANA_LIST_SET_MODE,
  };
}

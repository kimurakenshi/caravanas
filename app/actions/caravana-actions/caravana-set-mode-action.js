import { CARAVANA_LIST_SET_MODE } from '../action-types';

export default function setListMode(viewMode, editCaravanaId = null) {
  return {
    payload: {
      editCaravanaId,
      viewMode,
    },
    type: CARAVANA_LIST_SET_MODE,
  };
}

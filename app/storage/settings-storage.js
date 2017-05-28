import { SETTINGS_STORAGE_KEY } from './enum';
import * as baseStorage from './base-storage';

export default function save(settings) {
  return baseStorage
    .save(SETTINGS_STORAGE_KEY, settings)
  ;
}

export const CARAVANAS_STORAGE_KEY = 'CARAVANAS';
export const COMPANY_STORAGE_KEY = 'COMPANY';
export const MOVEMENTS_STORAGE_KEY = 'MOVEMENT';
export const SETTINGS_STORAGE_KEY = 'SETTINGS';
export const STORAGE_TYPE = {
  ARRAY: 'ARRAY',
  OBJECT: 'OBJECT',
};

export function getStorageKeyValues() {
  return [
    CARAVANAS_STORAGE_KEY,
    COMPANY_STORAGE_KEY,
    MOVEMENTS_STORAGE_KEY,
    SETTINGS_STORAGE_KEY,
  ];
}

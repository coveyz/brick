import injectResponseStorage from './responsive';
import Storage from 'responsive-storage';

const $Storage = Storage;

export const getItem = (key: string) => {
  return $Storage.get(`admin-${key}`)
}

export const setItem = (key: string, value: any) => {
  return $Storage.set(`admin-${key}`, value)
}

export { injectResponseStorage, $Storage }


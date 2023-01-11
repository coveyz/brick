import Storage from 'responsive-storage';
import { ElNotification } from 'element-plus'
import injectResponseStorage from './responsive';
import setting from '@/setting'

import { Update } from './checkUpdate';

const $Storage = Storage;

export const getItem = (key: string) => {
  return $Storage.get(`admin-${key}`)
}

export const setItem = (key: string, value: any) => {
  return $Storage.set(`admin-${key}`, value)
}

export { injectResponseStorage, $Storage }

/**
 * 成功信息
 */
export const successMsg = (message: string, title = '成功') => {
  return ElNotification({
    title,
    message,
    type: 'success',
  })
}

/**
 * 错误信息
*/
export const errorMsg = (message: string, title = '错误') => {
  return ElNotification({
    title,
    message,
    type: 'error',
  })
}

const title = setting['Title'] || 'VVE Admin'
export const getPageTitle = (pageTitle?: string) => {
  if (pageTitle) {
    return `${pageTitle} | ${title}`
  }
  return title
}


export const checkUpdate = Update;
import Cookies from 'js-cookie'

export const tokenKey = 'admin-token';
export const getToken = () => {
  return Cookies.get(tokenKey)
}
export const setToken = (token: string) => {
  return Cookies.set(tokenKey, token)
}
export const removeToken = () => {
  return Cookies.remove(tokenKey);
}

const sidebarKey = 'sidebarStatus'
export const getSidebarStatus = () => Cookies.get(sidebarKey)
export const setSidebarStatus = (status: string) => Cookies.set(sidebarKey, status)
export const removeSidebarStatus = () => Cookies.remove(sidebarKey)
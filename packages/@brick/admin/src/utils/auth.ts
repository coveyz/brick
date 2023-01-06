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
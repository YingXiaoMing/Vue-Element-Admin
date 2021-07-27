// import Cookies from 'js-cookie'
// const TokenKey = 'Admin-Token'

import * as local from '@/utils/local'
const tokenKey = 'auth_token'
const accountKey = 'auth_account'

export function getToken() {
  // return Cookies.get(TokenKey)
  return local.get(tokenKey)
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token)
  return local.set(tokenKey, token)
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  return local.remove(tokenKey)
}

export function getAccount() {
  return local.get(accountKey)
}

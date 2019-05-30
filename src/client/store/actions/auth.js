import * as actionTypes from './actionTypes';

const STORAGE_NAME_KEY = 'name';
const STORAGE_PASSWORD_KEY = 'password';
const ADMIN_NAME = 'admin';
const ADMIN_PASSWORD = '123';

export const switchLoginModal = () => {
  return { type: actionTypes.SWITCH_LOGIN_MODAL };
}

export const updateLoginForm = (updateObj) => {
  return { type: actionTypes.UPDATE_LOGIN_FORM, updateObj }
}

export const tryAutoLogin = () => {
  const userData = loadUserData();

  if (!userData.name) {
    return { type: actionTypes.NULL };
  }

  return loginUser(userData.name, userData.password);
}

export const logoutUser = () => {
  removeUserData();
  return { type: actionTypes.LOGOUT_USER };
}

export const loginUser = (name, password) => {
  if ( isUserValid(name, password) ) {
    saveUserData({ name, password });
    return { type: actionTypes.LOGIN_USER, name };
  }

  return { type: actionTypes.SHOW_LOGIN_ERROR, errorText: 'Invalid username or password' };
}

function isUserValid (name, password) {
  return name === ADMIN_NAME && password === ADMIN_PASSWORD;
}

function saveUserData (data) {
  window.localStorage.setItem(STORAGE_NAME_KEY, data.name);
  window.localStorage.setItem(STORAGE_PASSWORD_KEY, data.password);
}

function loadUserData () {
  const name = window.localStorage.getItem(STORAGE_NAME_KEY);
  const password = window.localStorage.getItem(STORAGE_PASSWORD_KEY);
  return { name, password };
}

function removeUserData () {
  window.localStorage.removeItem(STORAGE_NAME_KEY);
  window.localStorage.removeItem(STORAGE_PASSWORD_KEY);
}
import axios from 'axios';
import md5 from 'crypto-js/md5';
import statuses from '../../constants/statuses';
import { modifyTodoModel } from './specialCaseModifiers';

const axiosInstance = axios.create({
  baseURL: GLOBAL__API_URL,
  crossdomain: true,
});

function buildFormData (obj) {
  const formData = new FormData();

  for (let key in obj) {
    formData.set(key, obj[key]);
  }

  return formData;
}

function getTodos (params) {
  return axiosInstance.get('/', {
    params: {
      sort_field: params.sortField,
      sort_direction: params.sortDirection,
      page: params.pageNum,
      developer: 'Name'
    }
  }).then(handleResponse);
}

function createTodo (params) {
  return axiosInstance.post('/create/?developer=Name', buildFormData(params), {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(handleResponse);
}

function updateTodo (id, params) {
  const signature = generateSignature(params).toString();

  return axiosInstance.post(
    `/edit/${id}/?developer=Name`,
    buildFormData({ ...params, signature, token: 'beejee' }), {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(handleResponse);
}

function removeTodo (id) {
  return axiosInstance.delete(`/${id}`).then(handleResponse);
}

function generateSignature (paramsObj) {
  const sortedKeys = Object.keys(paramsObj).sort();
  
  const stringsArr = sortedKeys.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(paramsObj[key]));
  stringsArr.push('token=beejee');

  const string = stringsArr.join('&');

  return md5(string).toString();
}

function handleResponse (response) {
  return new Promise ((res, rej) => {
    if (response.data.status !== statuses.OK) {
      const error = new Error(response.data.status);
      error.details = response.data.message;
      rej(error);
    }
  
    res(response.data.message);
  });
}

const Todo = {
  get: getTodos,
  create: createTodo,
  update: updateTodo,
  remove: removeTodo,
};

if (GLOBAL__API_URL.indexOf('/') !== 0) {
  modifyTodoModel(Todo);
}

export default Todo;

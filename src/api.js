import {encode} from 'base-64'

const BASE_URL = 'http://claymaa6.miniserver.com:8080/bristol-pound/'
const USER = 'test1';
const PASS = 'testing123';

const headers = new Headers();
headers.append("Authorization", 'Basic ' + encode(USER + ':' + PASS));

const querystring = params =>
  Object.keys(params).map(key => key + '=' + params[key]).join('&');

const apiRequest = (url, params) =>
  fetch(BASE_URL + url + (params ? '?' + querystring : ''), {headers})
    .then(response => response.text())
    .then(JSON.parse)

export const getBusinesses = () =>
  apiRequest('business');

export const getAccount = () =>
  apiRequest('account');

export const getTransactions = (pageNumber = 1) =>
  apiRequest('transaction', {
    pageNumber,
    pageSize: 20
  });

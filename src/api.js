const BASE_URL = 'http://claymaa6.miniserver.com:8080/bristol-pound/'
const USER = 'test1';
const PASS = 'testing123';

const headers = new Headers();
headers.append("Authorization", 'Basic ' + btoa(USER + ':' + PASS));

const apiRequest = (url) =>
  fetch(url, {headers})
    .then(response => response.text())
    .then(JSON.parse)

export const getBusinesses = () =>
  apiRequest(BASE_URL + 'business/');

import {encode} from 'base-64'
import merge from './util/merge'
import ApiError, { UNAUTHORIZED_ACCESS, throwOnError } from './apiError'

import {connectivityChanged} from './store/reducer/networkConnection'
import {loggedOut} from './store/reducer/login'

const parseShortDisplay = fullDisplay => fullDisplay.includes('(') ? fullDisplay.substring(fullDisplay.indexOf('(') + 1, fullDisplay.indexOf(')')) : fullDisplay

const BASE_URL = 'https://bristol-stage.community-currency.org/cyclos/api/'
let globalSessionToken = ''

export const setBaseUrl = newUrl => {
  BASE_URL = newUrl
}

export const PAGE_SIZE = 20

const httpHeaders = () => {
  const headers = new Headers()
  if (globalSessionToken) {
    headers.append('Session-Token', globalSessionToken)
  }
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  return headers
}

const basicAuthHeaders = (username, password) => {
  const headers = new Headers()
  headers.append('Authorization', 'Basic ' + encode(username + ':' + password))
  headers.append('Accept', 'application/json')
  return headers
}

const querystring = params =>
  Object.keys(params).map(key => key + '=' + params[key]).join('&')

const dispatchSuccessfulConnection = dispatch => response => {
  dispatch(connectivityChanged(true))
  return response
}

const maybeDispatchFailure = dispatch => err => {
  if (err.message === 'Network request failed') {
    dispatch(connectivityChanged(false))
  } else if (err instanceof ApiError && err.type === UNAUTHORIZED_ACCESS) {
    dispatch(loggedOut())
  } else {
    throw err
  }
}

const get = (url, params, dispatch) =>
  fetch(BASE_URL + url + (params ? '?' + querystring(params) : ''), {headers: httpHeaders()})
    .then(dispatchSuccessfulConnection(dispatch))
    .then(decodeResponse)
    .then((data) => {
      throwOnError(data.response, data.json)
      return data.json
    })
    .catch(maybeDispatchFailure(dispatch))

// Will continually load pages of a get request until successCriteria is met.
// successCriteria - should be a function with takes the result of the get request
//                   and returns a boolean as to whether the request is complete. It
//                   will be called on each individual get request.
const getPages = (url, params, dispatch, successCriteria, pageNo = 0) => {
  params = merge(params, { page: pageNo })
  return new Promise(function(resolve, reject) {
    get(url, params, dispatch)
      .then(results => {
        if (results.length < PAGE_SIZE || successCriteria === undefined || successCriteria(results)){
          resolve(results)
        } else {
          getPages(url, params, dispatch, successCriteria, pageNo + 1)
            .then(nextResults => resolve(results.concat(nextResults)))
            .catch(reject)
        }
      })
      .catch(reject)
  })
}

const post = (url, params, dispatch, expectedResponse=201) =>
  fetch(BASE_URL + url, merge({headers: httpHeaders()}, {method: 'POST', body: JSON.stringify(params)}))
    .then(dispatchSuccessfulConnection(dispatch))
    .then(decodeResponse)
    .then((data) => {
      throwOnError(data.response, data.json, expectedResponse)
      return data.response
    })
    .catch(maybeDispatchFailure(dispatch))

export const getBusinesses = (dispatch) =>
  get('users', {
    fields: [
      'id',
      'address.addressLine1',
      'address.addressLine2',
      'address.zip',
      'address.location',
      'image.url',
      'display',
      'shortDisplay',
      'username',
      'name'
    ],
    pageSize: 1000000,
    addressResult: 'primary',
    orderBy: 'alphabeticallyAsc'
  }, dispatch)
  .then(businesses => {
    // TODO: TEMPORARY FIX
    // remove when we are using one api and calls gives same values when logged in/out. The prod api gives incorrect shortdisplay (format: DISPLAY (SHORTDISPLAY))
    //                                                                                  Also when logged in on either dev or prod the api uses username & name rather than shortDisplay and display
    if (businesses) {
      businesses = businesses.map(bu => merge(bu, {
        display: bu.display || bu.name,
        shortDisplay: parseShortDisplay(bu.shortDisplay || bu.username)
      }))
    }

    return (businesses || [])
  })

export const getBusinessProfile = (businessId, dispatch) =>
  get('users/' + businessId, {}, dispatch)

// person can be an id or a username
// 1. add contact
// 2. get updated contact list
export const addContact = (person, dispatch) =>
  post('self/contacts/' + person, {}, dispatch, 200).then(() =>
    get('self/contacts', {}, dispatch))

export const getAccountBalance = (dispatch) =>
  get('self/accounts', {
    fields: ['status.balance']
  },
  dispatch)

export const getAccountDetails = (dispatch) =>
  get('users/self', {
    fields: ['display', 'shortDisplay', 'image.url', 'email', 'phones']
  },
  dispatch)

export const getTransactions = (dispatch, additionalParams, successCriteria) =>
  getPages('self/accounts/member/history', merge({
    fields: [
      'id',
      'transactionNumber',
      'date',
      'description',
      'amount',
      'type',
      'relatedAccount'
    ],
    pageSize: PAGE_SIZE
  }, additionalParams ? additionalParams : {}), dispatch, successCriteria)

export const putTransaction = (payment, dispatch) =>
  get('self/payments/data-for-perform', {
      to: payment.subject,
      fields: 'paymentTypes.id'
  }, dispatch)
  .then(json => post('self/payments', {
      ...payment,
      type: json.paymentTypes[0].id
    }, dispatch))

// decodes the response via the json() function, which returns a promise, combining
// the results with the original response object. This allows access to both
// response data (e.g. status code) and application level data.
const decodeResponse =
  response => response.json()
    .then(json => ({response, json}))

export const authenticate = (username, password, dispatch) =>
  fetch(BASE_URL + 'auth/session', {
    headers: basicAuthHeaders(username, password),
    method: 'POST'
  })
  .then(dispatchSuccessfulConnection(dispatch))
  .then(decodeResponse)
  .then((data) => {
    throwOnError(data.response, data.json)
    globalSessionToken = data.json.sessionToken
    return data.json.sessionToken
  })
  .catch(maybeDispatchFailure(dispatch))

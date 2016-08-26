import React from 'react'
import Tabs from './component/Tabs'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './store/reducer'

import { accountDetailsReceived, transactionsReceived } from './store/reducer/transaction'
import { businessDetailsReceived } from './store/reducer/business'
import { getAccount, getTransactions, getBusinesses } from './api'

getAccount()
  .then(account => store.dispatch(accountDetailsReceived(account)))
  .catch(console.error)

getTransactions()
  .then(transactions => store.dispatch(transactionsReceived(transactions)))
  .catch(console.error)

getBusinesses()
  .then(businesses => store.dispatch(businessDetailsReceived(businesses)))
  .catch(console.error)

const store = createStore(reducer, applyMiddleware(thunk))

const App = () =>
  <Provider store={store}>
    <Tabs />
  </Provider>

export default App

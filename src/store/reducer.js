import { combineReducers } from 'redux'

import transaction from './reducer/transaction'
import navigation from './reducer/navigation'
import business from './reducer/business'

const reducer = combineReducers({
  transaction,
  navigation,
  business
})

export default reducer

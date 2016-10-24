import { putTransaction } from '../../api/payments'
import merge from '../../util/merge'
import { loadTransactionsAfterLast } from './transaction'
import ApiError, {UNEXPECTED_ERROR} from '../../api/apiError'

const initialState = {
  payee: '',
  amount: undefined,
  loading: false,
  success: undefined,
  message: ''
}

export const resetForm = () => ({
  type: 'sendMoney/RESET_FORM'
})

export const updatePayee = (payee) => ({
  type: 'sendMoney/UPDATE_PAYEE',
  payee
})

export const updateAmount = (amount) => ({
  type: 'sendMoney/UPDATE_AMOUNT',
  amount
})

const setLoading = () => ({
  type: 'sendMoney/SET_LOADING'
})

const transactionComplete = (success, message) => ({
  type: 'sendMoney/TRANSACTION_COMPLETE',
  success,
  message
})

export const sendTransaction = () =>
  (dispatch, getState) => {
    dispatch(setLoading())
    putTransaction({
        subject: getState().sendMoney.payee,
        description: 'Test description',
        amount: getState().sendMoney.amount
      }, dispatch)
      .then(response => {
        if (response.status === 201) {
          dispatch(loadTransactionsAfterLast())
          dispatch(transactionComplete(true))
        } else {
          dispatch(transactionComplete(false, 'Transaction did not complete.'))
        }
      })
      .catch(err => {
        if (err instanceof ApiError && err.type === UNEXPECTED_ERROR && err.json) {
          switch (err.json.code) {
            case 'dailyAmountExceeded':
              dispatch(transactionComplete(false, 'Daily amount has been exceeded.'))
              break
            case 'insufficientBalance':
              dispatch(transactionComplete(false, 'Insufficient balance.'))
              break
          }
        } else {
          dispatch(transactionComplete(false, 'Error on sending transaction.'))
          console.err(err)
        }
      })
  }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'sendMoney/RESET_FORM':
      state = merge(initialState)
      break
    case 'sendMoney/UPDATE_PAYEE':
      state = merge(state, {
        payee: action.payee
      })
      break
    case 'sendMoney/UPDATE_AMOUNT':
      state = merge(state, {
        amount: action.amount
      })
      break
    case 'sendMoney/SET_LOADING':
      state = merge(state, {
        loading: true
      })
      break
    case 'sendMoney/TRANSACTION_COMPLETE':
      state = merge(initialState, {
        success: action.success,
        message: action.message,
      })
      break
  }
  return state
}

export default reducer

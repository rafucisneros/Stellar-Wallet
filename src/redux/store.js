import { createStore } from 'redux';
// import { reducer } from './reducer'

function accountReducer(state = {}, action){
  switch (action.type){
    case ("LOAD_ACCOUNT"): {
      return {... state, ...action.payload};
    }
    case ("LOAD_TRANSACTIONS"): {
      return {... state, ...action.payload}
    }
    default:
      return state
  }
}

const store = 
  createStore(
    accountReducer, 
    {accountId: "GAL2KXOLC4ZW4HBHYHVKTQXYI6LNQZMH6I4MM7NGTVNQFU4P7ISC4WDF"}
  )

export default store;

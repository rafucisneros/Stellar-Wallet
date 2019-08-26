import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
// import { reducer } from './reducer'

function accountReducer(state = {}, action){
  console.log(state)
  console.log(action)
  switch (action.type){
    case ("LOAD_ACCOUNT"): {
      return {... state, ...action.payload};
    }
    case ("LOAD_TRANSACTIONS"): {
      return {... state, ...action.payload};
    }
    default:
      return state;
  }
}

const persistCongif = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistCongif, accountReducer);

const store = 
  createStore(persistedReducer,
    {accountId: "GAL2KXOLC4ZW4HBHYHVKTQXYI6LNQZMH6I4MM7NGTVNQFU4P7ISC4WDF"}
  );
const persistor = persistStore(store);

export { store, persistor };
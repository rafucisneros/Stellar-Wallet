import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

function accountReducer(state = {}, action){
  switch (action.type){
    case ("LOAD_ACCOUNT"): {
      return {... state, ...action.payload};
    }
    case ("LOAD_OPERATIONS"): {
      return {... state, ...action.payload};
    }
    default:
      return state;
  }
}

const persistCongif = {
  key: 'root',
  storage,
  blacklist: ['transactionResult', 'dialogVisible', 
  'showPassword', 'sendingTransaction', 'fee',' refreshing',
  'copied' ]
};

const reducer = combineReducers({
  accountReducer
})

const persistedReducer = persistReducer(persistCongif, reducer);

const store = 
  createStore(persistedReducer, {
    accountReducer: {
      // account: {
        publicKey: "GAJ6S2PB6BSGBH526EI34E7E2PBIE435MYURLDS6TW5NG5DVGZWOTOXN",
        secretKey: "SABAPCGBLUHAFXBRA3L4HAZFYMNB632OWVJ3G6BPLXJTPQAXWPJ35CD5"
      // }
    }
  } // test network
    // {accountReducer: {accountId: "GDIST7XTJR3QZ2B7QZTBI3SKFR4JP6RFQTDUOKCFEMGVLHLYRAPLYMDN"}}     // real network
  );
  const persistor = persistStore(store);

export { store, persistor };
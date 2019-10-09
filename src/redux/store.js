import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

function accountReducer(state = {}, action){
  switch (action.type){
    case ("LOAD_ACCOUNT"): {
      return {... state, ...action.payload};
    }
    case ("LOAD_OPERATIONS"): {
      return {... state, operations: action.payload.operations};
    }
    case ("SET_KEYS"): {
      // Leave only the new keys at the store
      return {...action.payload};
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
  createStore(
    persistedReducer, {
      accountReducer: {}
    }
  );
  const persistor = persistStore(store);

export { store, persistor };
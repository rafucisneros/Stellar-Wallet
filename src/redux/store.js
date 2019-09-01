import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

function accountReducer(state = {}, action){
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

const reducer = combineReducers({
  accountReducer
})

const persistedReducer = persistReducer(persistCongif, reducer);

const store = 
  createStore(persistedReducer,
    {accountReducer: {accountId: "GAL2KXOLC4ZW4HBHYHVKTQXYI6LNQZMH6I4MM7NGTVNQFU4P7ISC4WDF"}}
  );
  const persistor = persistStore(store);

export { store, persistor };
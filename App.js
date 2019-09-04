import React, {Component} from 'react';
import LoadingState from './src/utils/LoadingState';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';

import NavigationService from './src/utils/NavigationService';
import Main from './src/Main';

export default class App extends Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Provider
        store={store}
      >
        <PersistGate
          loading={<LoadingState />}
          persistor={persistor}
        >
          <Main 
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </PersistGate>
      </Provider>
    )
  }
}
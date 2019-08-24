import React, {Fragment, Component} from 'react';
import { 
  createStackNavigator, createAppContainer, createDrawerNavigator 
} from "react-navigation";
import { View } from 'react-native';

import Account from './src/account';
import Transactions from './src/transactions';
import Header from './src/header';
import Home from './src/home';

const DrawerNavigator = createDrawerNavigator(
  {
    Home: Home,
    Settings: Account,
  },
  {
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: '#6b52ae',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
  }
);
const AppContainer = createAppContainer(DrawerNavigator);

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <AppContainer />
      </Fragment>
    );
  }
}
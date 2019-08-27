import React, {Component} from 'react';
import { 
  createAppContainer, createDrawerNavigator,
  DrawerItems, SafeAreaView, Text, ScrollView, ActivityIndicator 
} from "react-navigation";

import Home from './src/home/home';
import SetInflation from './src/setInflation/setInflation';
import RemoveAccount from './src/removeAccount/removeAccount';
import Trustlines from './src/trustlines/trustlines';
import AddFriends from './src/addFriends/addFriends';
import LoadingState from './src/utils/LoadingState';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';

const CustomDrawerContentComponent = props => {
  return (
    <ScrollView>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', horizontal: 'never' }}>
        <Text>Hello Moto</Text>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  )
};

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "Home",
        drawerIcon: ({ tintColor }) => (  
          <Icon style={[{color: tintColor}]} size={25} name={'home'}/>
    )
      }
    },
    AddFriends: {
      screen: AddFriends,
      navigationOptions: {
        title: "Add Friends",
        drawerIcon: ({ tintColor }) => (  
              <Icon style={[{color: tintColor}]} size={25} name={'person-add'}/>
        )
        // <Icon style={[{color: "#fff"}]} size={25} name={'person-add'}/>
      }
    },
    SetInflation: {
      screen: SetInflation,
      navigationOptions: {
        title: "Set Inflation",
        drawerIcon: ({ tintColor }) => (  
              <Icon style={[{color: tintColor}]} size={25} name={'trending-up'}/>
        )
        // <Icon style={[{color: "#fff"}]} size={25} name={'person-add'}/>
      }
    },
    Trustlines: {
      screen: Trustlines,
      navigationOptions: {
        title: "Trustlines",
        drawerIcon: ({ tintColor }) => (  
              <Icon style={[{color: tintColor}]} size={25} name={'check'}/>
        )
        // <Icon style={[{color: "#fff"}]} size={25} name={'person-add'}/>
      }
    },
    RemoveAccount: {
      screen: RemoveAccount,
      navigationOptions: {
        title: "Remove Account",
        drawerIcon: ({ tintColor }) => (  
              <Icon style={[{color: tintColor}]} size={25} name={'clear'}/>
        )
        // <Icon style={[{color: "#fff"}]} size={25} name={'person-add'}/>
      }
    }
  },
  {
    drawerWidth: 200,
    // contentComponent: CustomDrawerContentComponent, 
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: '#B2EBF2',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#0097A7',
    }
  }
);
const AppContainer = createAppContainer(DrawerNavigator);
export default class App extends Component {
  render() {
    return (
      <Provider
        store={store}
      >
        <PersistGate
          loading={<LoadingState />}
          persistor={persistor}
        >
          <AppContainer />
        </PersistGate>
      </Provider>
    )
  }
}
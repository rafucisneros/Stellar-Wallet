import React, {Component} from 'react';
import { 
  createAppContainer, createDrawerNavigator,
  DrawerItems, SafeAreaView, Text, ScrollView, ActivityIndicator 
} from "react-navigation";
import Home from './src/home/home';
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
    Friends: {
      screen: Home,
      navigationOptions: {
        title: "Add Friends",
        drawerIcon: ({ tintColor }) => (  
              <Icon style={[{color: tintColor}]} size={25} name={'person-add'}/>
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
          // loading={<ActivityIndicator size="large" color="#000" />}
          persistor={persistor}
        >
          <AppContainer />
        </PersistGate>
      </Provider>
    )
  }
}
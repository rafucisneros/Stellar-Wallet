import React, {Fragment, Component} from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { View } from 'react-native';

import Home from './src/home';
import Account from './src/account';
import Transactions from './src/transactions';
import Header from './src//header';


import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions:{
        title: "Home",
        headerStyle: {
          backgroundColor: "#B2EBF2"
        }
      }
    },
    Account: {
      screen: Account,
      navigationOptions:{
        title: "Account",
        headerStyle: {
          backgroundColor: "#B2EBF2"
        }
      }
    },
    Transactions: {
      screen: Transactions,
      navigationOptions:{
        title: "Transactions",
        headerStyle: {
          backgroundColor: "#B2EBF2"
        }
      }
    }
  },
  {
    initialRouteName: "Transactions",
    navigationOptions: {
      gesturesEnabled: true
    }
    
  }
);

// const AppContainer = createAppContainer(AppNavigator);

const tabNavigator = createMaterialBottomTabNavigator({
  Account: { screen: Account,  
    navigationOptions:{  
        tabBarLabel:'Account',  
        tabBarIcon: ({ tintColor }) => (  
            <View>  
                <Icon style={[{color: tintColor}]} size={25} name={'account-balance-wallet'}/>  
            </View>),  
    }  
  },
  Transactions: { screen: Transactions,  
    navigationOptions:{  
        tabBarLabel:'Transactions',  
        tabBarIcon: ({ tintColor }) => (  
            <View>  
                <Icon style={[{color: tintColor}]} size={25} name={'library-books'}/>  
            </View>),  
    }  
  },
  sendTransaction: { screen: Transactions,  
    navigationOptions:{  
        tabBarLabel:'Send Transaction',  
        tabBarIcon: ({ tintColor }) => (  
            <View>  
                <Icon style={[{color: tintColor}]} size={25} name={'receipt'}/>  
            </View>),  
    }  
  },
  qr: { screen: Transactions,  
    navigationOptions:{  
        tabBarLabel:'QR',  
        tabBarIcon: ({ tintColor }) => (  
            <View>  
                <Icon style={[{color: tintColor}]} size={25} name={'fingerprint'}/>  
            </View>),  
    }  
  }
}, {
  initialRouteName: 'Account',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#0097A7' },
});
const AppContainer = createAppContainer(tabNavigator);

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <AppContainer />
      </Fragment>
    );
  }
}
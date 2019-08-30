import React from 'react';
import { 
  createAppContainer, createDrawerNavigator
} from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialIcons';

import Home from './home/home';
import SetInflation from './setInflation/setInflation';
import RemoveAccount from './removeAccount/removeAccount';
import Trustlines from './trustlines/trustlines';
import AddAccount from './addAccount/addAccount';
import Contacts from './contacts/contacts';
import About from './about/about';

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
    AddAccount: {
      screen: AddAccount,
      navigationOptions: {
        title: "Add Account",
        drawerIcon: ({ tintColor }) => (  
              <Icon style={[{color: tintColor}]} size={25} name={'add'}/>
        )
        // <Icon style={[{color: "#fff"}]} size={25} name={'person-add'}/>
      }
    },
    Contacts: {
      screen: Contacts,
      navigationOptions: {
        title: "Contacts",
        drawerIcon: ({ tintColor }) => (  
              <Icon style={[{color: tintColor}]} size={25} name={'contacts'}/>
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
    },
    About: {
      screen: About,
      navigationOptions: {
        title: "About Us",
        drawerIcon: ({ tintColor }) => (  
              <Icon style={[{color: tintColor}]} size={25} name={'people-outline'}/>
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
const Main = createAppContainer(DrawerNavigator);
export default Main;
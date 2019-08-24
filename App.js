import React, {Component} from 'react';
import { 
  createAppContainer, createDrawerNavigator,
  DrawerItems, SafeAreaView, Text, ScrollView 
} from "react-navigation";
import Home from './src/home/home';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    return <AppContainer />
  }
}
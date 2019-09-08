import React, {Fragment, Component} from 'react';
import { createAppContainer } from "react-navigation";
import { View } from 'react-native';

import Account from './account';
import Operations from './operations';
import AccountIdentification from './accountIdentification';
import SendPayment from './sendPayment';
import MenuTop from '../utils/MenuTop';

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";;
import Icon from 'react-native-vector-icons/MaterialIcons';

const tabNavigator = createMaterialBottomTabNavigator(
  {
    Account: { screen: Account,  
      navigationOptions:{  
        tabBarLabel:'Account',  
        tabBarIcon: ({ tintColor }) => (  
            <View>  
                <Icon style={[{color: tintColor}]} size={25} name={'account-balance-wallet'}/>  
            </View>
        ),  
      }  
    },
    Operations: { screen: Operations,  
      navigationOptions:{  
        tabBarLabel:'Operations',  
        tabBarIcon: ({ tintColor }) => (  
          <View>  
              <Icon style={[{color: tintColor}]} size={25} name={'library-books'}/>  
          </View>
        ),  
      }  
    },
    SendPayment: { screen: SendPayment,  
      navigationOptions:{  
        tabBarLabel:'Send',  
        tabBarIcon: ({ tintColor }) => (  
          <View>  
              <Icon style={[{color: tintColor}]} size={25} name={'send'}/>  
          </View>
        ),  
      }  
    },
    AccountIdentification: { screen: AccountIdentification,  
      navigationOptions:{  
        tabBarLabel:'Identification',  
        tabBarIcon: ({ tintColor }) => (  
          <View>  
              <Icon style={[{color: tintColor}]} size={25} name={'fingerprint'}/>  
          </View>
        ),  
      }  
    }
  }, {
    initialRouteName: 'SendPayment',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#0097A7' },
  }
);
const AppContainer = createAppContainer(tabNavigator);

class Home extends Component {
  render() {
    return (
      <Fragment>
        <MenuTop navigation={this.props.navigation}/>
        <AppContainer />
      </Fragment>
    );
  }
}

export default Home;
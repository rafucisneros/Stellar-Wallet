import React, {Component, Fragment} from 'react';
import {Text, StatusBar} from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import styles from '../utils/Styles';

class MenuTop extends Component {
  openMenu = () => { 
    this.props.navigation.openDrawer(); 
  }
  render(){
    return (
      <Fragment>
        <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
        <Toolbar
          leftElement="menu"
          centerElement="Stellar"
          // rightElement={
          // <Text 
          //   style={styles.stellarTitle}>
          //   Stellar
          //   </Text>}
          onLeftElementPress={this.openMenu}
        />
      </Fragment>
    )
  }
}

export default MenuTop;
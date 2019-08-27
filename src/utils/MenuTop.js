import React, {Component} from 'react';
import {Text} from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import styles from '../utils/Styles';

class MenuTop extends Component {
  openMenu = () => { 
    this.props.navigation.openDrawer(); 
  }
  render(){
    return (
      <Toolbar
        leftElement="menu"
        // centerElement="Stellar"
        rightElement={
        <Text 
          style={styles.stellarTitle}>
          Stellar
          </Text>}
        onLeftElementPress={this.openMenu}
      />
    )
  }
}

export default MenuTop;
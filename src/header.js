import React, {Component} from 'react';
  import{
  Text,
  View,
  StyleSheet
} from 'react-native';
import Styles from './utils/Styles';

class Header extends Component{
  render(){
    return (
      <View style={Styles.styles.header}>
        <Text>
          Stellar Wallet
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header:{
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: "#0097A7",
    color: "#FF000F"
  }
})

export default Header;
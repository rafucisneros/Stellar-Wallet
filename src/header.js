import React, {Component} from 'react';
  import{
  Text,
  View,
  StyleSheet
} from 'react-native';

class Header extends Component{
  render(){
    return (
      <View style={styles.header}>
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
    color: "#FF000F",
    marginBottom: 5
  }
})

export default Header;
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

function LoadingState(props) {
  return (
    <View style={styles.container}>
      <Text style={{alignSelf: "center"}}>Loading, Please Wait...</Text>
      <ActivityIndicator size="large" color="#000" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  }
})

export default LoadingState;
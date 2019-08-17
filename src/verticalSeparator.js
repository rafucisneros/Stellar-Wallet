import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

function VerticalSeparator(props) {
  return (
    <View style={[
      styles.separator,
      {
        borderTopColor: (props.color) ? props.color : '#000'
      }
    ]}>
    </View>
  )
}

const styles = StyleSheet.create({
  separator: {
    borderTopWidth: 1,
    margin: 2
  }
})

export default VerticalSeparator;
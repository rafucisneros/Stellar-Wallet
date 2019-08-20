import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

function VerticalSeparator(props) {
  return (
    <View style={[
      styles.verticalSeparator,
      {
        borderTopColor: (props.color) ? props.color : '#000'
      }
    ]}>
    </View>
  )
}

class Separators{
  verticalSeparator = () => <VerticalSeparator />
}


const styles = StyleSheet.create({
  verticalSeparator: {
    borderTopWidth: 1,
    margin: 2
  }
})

export default Separators;
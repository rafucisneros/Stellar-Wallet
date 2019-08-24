import React from 'react';
import {
  View,
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

function HorizontalSeparator(props) {
  return (
     <View
      style={[
        styles.horizontalSeparator,
        {
          borderColor: (props.color) ? props.color : '#000'
        }      
      ]}
     />
  )
}

class Separators{
  static verticalSeparator = () => <VerticalSeparator />
  static horizontalSeparator = () => <HorizontalSeparator />
}


const styles = StyleSheet.create({
  verticalSeparator: {
    borderTopWidth: 1,
    margin: 2
  },
  horizontalSeparator: {
    flex: 1,
    marginHorizontal: 5,
  }
})

export default Separators;
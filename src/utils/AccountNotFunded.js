import React, { Component, Fragment } from 'react'
import { View, Text } from 'react-native'
import styles from './Styles'

class AccountNotFunded extends Component{
  render(){
    return (
      <Fragment>
        <View style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <Text style={[styles.sectionTitle]}>Account not funded</Text>
        </View>
        <View style={{display: "flex", flexDirection: "row"}}>
          <Text>This account is not funded yet. You need to receive at least 1 XLM in a "Create Account" operation in order to fund your account.</Text>
        </View>
      </Fragment>
    )
  }
}

export default AccountNotFunded
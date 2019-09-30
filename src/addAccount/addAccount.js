import React, { Component }  from 'react'
import { Text, View, Button } from 'react-native'
import NavigationService from '../utils/NavigationService'
import styles from '../utils/Styles'



class AddAccount extends Component{

  render(){
    return (
    <View style={styles.container}>
      <View style={[styles.section, {flex:1, justifyContent: "space-around"}]}>
        <View>
          <Text style={styles.pageTitle}>Welcome!</Text>
        </View>
        <View style={{marginBottom:20}}>
          <Button
            title="Create new account"
            onPress={()=>{NavigationService.navigate("CreateAccount")}}
          />
        </View>
        <View>
          <Button
            title="Import exisiting account"
            onPress={()=>{NavigationService.navigate("ImportAccount")}}
          />
        </View>            
      </View>
    </View>
    )
  }
}
export default AddAccount
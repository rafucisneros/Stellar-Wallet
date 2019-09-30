import React, { Fragment, Component }  from 'react'
import { Text, View, TextInput, TouchableOpacity,
  Button, Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from '../utils/Styles'
import Encryption from '../utils/Encryption'

class SetPassword extends Component{
  constructor(props){
    super(props)
    this.state = {showPassword: false}
    this.password = ""
    this.confirmPassword = ""
  }

  encrypt = async () => {
    if (this.password.length < 8){
      Alert.alert("Password too short!", "Password must be 8 to 20 characters long.")
    } else if (this.password != this.confirmPassword){
      Alert.alert("Passwords don't match!", "Type the same password provided in the first input on the confirm password input.")
    } else {
      try{
        encryptionResult = await Encryption.encryptText(this.props.navigation.state.params.seed, this.password)
        console.log(encryptionResult)
      } catch (error) {
        console.log(error) 
        Alert.alert("Error encrypting", "An error ocurred encrypting your seed. Try again.")
      }
    }
  }

  render(){
    return (
      <Fragment>
        <View style={styles.container}>
          <View style={[styles.section, {flex: 1}]}>
            <View style={{marginBottom: 25}}>
              <Text>* This allows us to safely store your seed on your device.</Text>
              <Text>* You will need to enter this passphrase before completing any transactions.</Text>
              <Text>* Forgetting this is not an issue! You can always recover your account with the account seed.</Text>
              <Text>* We will never store your passphrase on the device.</Text>
              <Text>* This particular passphrase you enter will be tied specifically to the account seed imported or generated in the previous step.</Text>
              <Text>* Your passphrase must be 8 to 20 characters long. It is case-sensitive.</Text>
            </View>
            <View style={{flexDirection:"row", marginBottom: 25, justifyContent: "space-between"}}>
              <View style={{width:"90%"}}>
                <TextInput
                  style={styles.input}
                  onChangeText={text => this.password = text}
                  placeholder="Enter Password"
                  textContentType="password"
                  secureTextEntry={!this.state.showPassword}
                  maxLength={20}
                  
                />
              </View>
              <View style={{width:"10%", justifyContent: "center"}}>
                  <TouchableOpacity
                    onPress = { ()=>{this.setState({showPassword: !this.state.showPassword})} }
                  >
                    { this.state.showPassword ? <Icon size={25} name={'eye-off-outline'}/> : <Icon size={25} name={'eye-outline'}/>}
                  </TouchableOpacity>                
                </View>
            </View>
            <View style={{marginBottom: 25}}>
              <TextInput
                style={styles.input}
                onChangeText={text => this.confirmPassword = text}
                textContentType="password"
                secureTextEntry={true}
                placeholder="Confirm Password"
              />
            </View>
            <View style={{marginBottom:20}}>
              <Button
                title="Finish"
                onPress={this.encrypt}
              />
            </View>
          </View>
        </View>
      </Fragment>
    )
  }
}

export default SetPassword
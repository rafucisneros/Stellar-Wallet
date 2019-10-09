import React, { Fragment, Component }  from 'react'
import { Text, View, TextInput, TouchableOpacity,
  Alert
} from 'react-native'
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from '../utils/Styles'
import Encryption from '../utils/Encryption'
import Stellar from '../utils/Stellar'
import { store } from '../redux/store'
import NavigationService from '../utils/NavigationService';
import { NavigationActions } from 'react-navigation';

class SetPassword extends Component{
  constructor(props){
    super(props)
    this.state = {
      showPassword: false,
      encrypting: false
    }
    this.password = ""
    this.confirmPassword = ""
  }

  encrypt = async () => {
    this.setState({encrypting: true})
    if (this.password.length < 8){
      Alert.alert("Password too short!", "Password must be 8 to 20 characters long.")
    } else if (this.password != this.confirmPassword){
      Alert.alert("Passwords don't match!", "Type the same password provided in the first input on the confirm password input.")
    } else {
      try{
        var secretKey = Encryption.encryptText(this.props.navigation.state.params.seed, this.password)
      } catch (error) {
        Alert.alert("Error encrypting", "An error ocurred encrypting your seed. Try again.")
      }
      if (secretKey){
        try{
          var publicKey = Stellar.getPublicKeyFromSeed(this.props.navigation.state.params.seed)
          accountExists = await Stellar.accountExists(publicKey)
          store.dispatch({
            type: "SET_KEYS",
            payload: {
              publicKey,
              secretKey,
              accountFunded: true
            }
          })
          let goToAccountIdentification = NavigationActions.navigate({
            routeName: "AccountIdentification",
            params: {},
            action: {}
          })
          let goToHome = NavigationActions.navigate({ 
                                            routeName: "Home",  
                                            params: {}, 
                                            action: goToAccountIdentification
                                          })
          NavigationService.navigate("DrawerHome", {}, goToHome)          
        } catch(error) {
          if (error.message == "Request failed with status code 404") { 
            Alert.alert("This account is not funded yet.",`The account provided is not created yet. You need to receive at least 1 XLM in a "Create Account" operation in order to fund your account.`)
            store.dispatch({
              type: "SET_KEYS",
              payload: {
                publicKey,
                secretKey,
                accountFunded: false
              }
            })
            let goToAccountIdentification = NavigationActions.navigate({
              routeName: "AccountIdentification",
              params: {},
              action: {}
            })
            let goToHome = NavigationActions.navigate({ 
                                              routeName: "Home",  
                                              params: {}, 
                                              action: goToAccountIdentification
                                            })
            NavigationService.navigate("DrawerHome", {}, goToHome)
          } else {
            Alert.alert("Network issue detected.", "We couldn't reach the server. Check your internet connection.")
          }
        }
      }
    }
    this.setState({encrypting: false})
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
                onPress={ this.encrypt }
                color="#0097A7"
                mode="contained"
                loading={this.state.encrypting}
                disabled={this.state.encrypting}
                style={{ marginTop: 16 }}>  
                Finish
              </Button>
            </View>
          </View>
        </View>
      </Fragment>
    )
  }
}

export default SetPassword
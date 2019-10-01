import React, { Fragment, Component }  from 'react';
import { Text, View, Button, Clipboard, TextInput, 
TouchableOpacity} from 'react-native';
import styles from '../utils/Styles';
import Stellar from '../utils/Stellar';
import NavigationService from '../utils/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome';


class CreateAccount extends Component{
  constructor(props){
    super(props)
    this.state = {
      seed: ""
    }
  }

  goNext = async ( )=> { 
    let seed = this.state.seed
    try{
      accountExists = await Stellar.getPublicKeyFromSeed(seed)
      NavigationService.navigate("SetPassword", {seed}) 
    } catch (error){
      console.log(error)
      if (error.message == "Request failed with status code 404") {
        NavigationService.navigate("SetPassword", {seed}) 
      } else if (error.message == "Network Error"){
        Alert.alert("Network issue detected.", "We couldn't reach the server. Check your internet connection.")
      } else {
        Alert.alert("Key Error", "The key provided is not a valid Stellar Key.")
      }
    }
  }
  
  render(){
    return (
      <Fragment>
        <View style={styles.container}>
          <View style={[styles.section, {flex: 1}]}>
            <View style={{marginBottom: 25}}>
              <Text>
                This is your account "seed" or "secret key". For all intents and purposes,
                your seed represents the entirety of your Stellar account.
              </Text>
            </View>
            <View style={{marginBottom: 25}}>
              <Text style={styles.warning}>Warning!!</Text>
              <Text>* Do not share your seed with anyone.</Text>
              <Text>* View and copy this seed somewhere very safe. Avoid a phone or computer with internet access</Text>
              <Text>* We make no guarantee of keeping this for you under any circumstances. If you do not retain your seed, you risk losing access to your account and funds.</Text>
              <Text>* We will encrypt this seed using a passphrase you will provide in the next step.</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom:20}}>
              <View style={{width:"80%"}}>
                <TextInput
                  onChangeText={text => this.setState({seed: text})}
                  placeholder="Account Seed"
                  style={styles.input}
                  value={this.seed}
                  maxLength={56}
                />
              </View>
              <View style={{width:"10%", justifyContent: "center"}}>
                <TouchableOpacity
                  onPress = { async ()=>{
                    this.setState({seed: await Clipboard.getString()}) 
                  } }
                >
                  <Icon size={25} name={'clipboard'}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginBottom:20}}>
              <Button
                title="Continue"
                onPress={this.goNext}
              />
            </View>
          </View>
        </View>
      </Fragment>
    )
  }
}
export default CreateAccount;
import React, { Fragment, Component }  from 'react';
import { Text, View, Button, Clipboard } from 'react-native';
import Stellar from '../utils/Stellar';
import styles from '../utils/Styles';
import NavigationService from '../utils/NavigationService';


class CreateAccount extends Component{
  constructor(props){
    super(props)
    this.state = {
      seed: false,
      publicKey: false,
      copied: false
    }
  }

  copyToClipboard = async () => {
    await Clipboard.setString(this.state.seed);
    this.setState({copied: true});
    setTimeout(() => {
      this.setState({copied: false})
    }, 1500);
  }

  generateSeed = () => {
    let keypair = Stellar.generateSeed()
    this.setState({
      seed: keypair.secret(),      
      publicKey: keypair.publicKey()      
    })
  }

  goNext = ( )=> { 
    let seed = this.state.seed
    NavigationService.navigate("SetPassword", {seed}) 
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
            {this.state.seed ? 
            <View>
              <View style={{marginBottom: 15}}>
                <Text>
                  {this.state.seed}
                </Text>
              </View>
              <View style={{marginBottom:20}}>
                <Button
                  title="Copy seed"
                  onPress={this.copyToClipboard}
                />
              </View>
              <View style={{marginBottom:20}}>
                <Button
                  title="Generate different seed"
                  onPress={this.generateSeed}
                />
              </View>
              <View style={{marginBottom:20}}>
                <Button
                  title="Continue"
                  onPress={this.goNext}
                />
              </View>
            </View>
            : 
            <View style={{marginBottom:20}}>
              <Button
                title="Generate seed"
                onPress={this.generateSeed}
              />
            </View>
            }
          </View>
        </View>
        {this.state.copied && <Text style={[styles.copied, {position: "absolute", bottom: 0}]}>Copied to Clipboard!</Text>}
      </Fragment>
    )
  }
}
export default CreateAccount;
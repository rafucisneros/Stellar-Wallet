import React, { Fragment, Component }  from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import Container from '../utils/Container'
import { connect } from 'react-redux';

import styles from '../utils/Styles';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import Stellar from '../utils/Stellar';
import NavigationService from '../utils/NavigationService';

class ConfirmPayment extends Component{
  constructor(props){
    super(props)
    this.state = {
      showPassword: false,
      sendingTransaction: false,
      fee: 0.00001
    }  
    this.props.password = "";
  }
  
  async componentDidMount(){
    let fee = await Stellar.getBaseFee()
    this.setState({fee})
  }

  sendTransaction = async () => {
    let values = this.props.navigation.state.params.values
    this.setState({sendingTransaction: true})
    let result = await Stellar.submitTransaction(this.props.account.id, 
      values.recipient, values.amount, values.currency, 
      this.state.fee, "SABAPCGBLUHAFXBRA3L4HAZFYMNB632OWVJ3G6BPLXJTPQAXWPJ35CD5",
      values.memo ? values.memo : null)
    console.log(result)
    this.setState({sendingTransaction: false})
  }

  render(){
    let values = this.props.navigation.state.params.values
    let actualXLMBalance = this.props.account.balances.find((balance)=>balance.asset_type==="native").balance
    if (values.currency === "native"){
      var remainingXLM = ((actualXLMBalance * 10000000) - (values.amount * 10000000) - this.state.fee ) 
      remainingXLM = Math.round(remainingXLM) / 10000000 
      if (remainingXLM < 0){
        Alert.alert(`You need at least to ${this.state.fee / 10000000} XLM to pay transaction fee.`)
        NavigationService.navigate("DrawerHome")
      }
    } else {
      var remainingXLM = actualXLMBalance - this.state.fee
      let actualBalance = this.props.account.balances.find((balance)=>balance.asset_type===values.currency).balance
      var remainingBalance = ((actualBalance * 10000000) - (values.amount * 10000000)) 
      remainingBalance =Math.round(remainingBalance) / 10000000
    }
    return (
      <Fragment>
        <Container>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ConfirmPayment</Text>
            <View style={{flexDirection: "row"}}>
              <Text style={[styles.title, {width: "40%"}]}>Sending From:</Text>    
              <Text style={[styles.title, {width: "60%"}]}> {this.props.publicKey}</Text>
            </View>
            <View style={{flexDirection: "row"}}>
              <Text style={[styles.title, {width: "40%"}]}>Sending To:</Text>    
              <Text style={[styles.title, {width: "60%"}]}> {values.recipient}</Text>
            </View>
            <View style={{flexDirection: "row"}}>
              <Text style={[styles.title, {width: "40%"}]}>Amount:</Text>    
              <Text style={[styles.title, {width: "60%"}]}> {values.amount} {values.currency ? "XLM" : values.currency}</Text>
            </View>
            <View style={{flexDirection: "row"}}>
              <Text style={[styles.title, {width: "40%"}]}>Transaction Fee:</Text>    
              <Text style={[styles.title, {width: "60%"}]}> {this.state.fee / 10000000} XLM</Text>
            </View>
            <View style={{flexDirection: "row"}}>
              <Text style={[styles.title, {width: "40%"}]}>Remaining Balance:</Text>    
              <Text style={[styles.title, {width: "60%"}]}> {remainingXLM} XLM</Text>
            </View>
            { values.currency !== "native" ? 
              <View style={{flexDirection: "row"}}>   
                <Text style={[styles.title, {width: "60%"}]}> {remainingBalance} {values.currency}</Text>
              </View> : null
            }
            <View style={{flexDirection: "row"}}>
              <Text style={[styles.title, {width: "40%"}]}>Memo:</Text>    
              <Text style={[styles.title, {width: "60%"}]}> 
                {values.memo ? values.memo : "No memo"}
              </Text>
            </View>
            <View style={{marginVertical: 5}}>
              <Text>Password: </Text>
              <View style={[{flexDirection: "row", justifyContent: "space-between"}]}>
                <View style={{width:"80%"}}>
                  <TextInput
                    textContentType="password"
                    placeholder="Enter password"
                    style={styles.input}
                    onChangeText ={text => { this.password = text} }
                    secureTextEntry={!this.state.showPassword}
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
            </View>
            <View>
              <Button
                onPress={ this.sendTransaction }
                color="#0097A7"
                mode="contained"
                loading={this.state.sendingTransaction}
                disabled={this.state.sendingTransaction}
                style={{ marginTop: 16 }}>  
                Send Transaction
              </Button>
            </View>
          </View>
        </Container>
      </Fragment>
    )
  }
}


function mapStateToProps(state){
  return {
    account: state.accountReducer.account,
    publicKey: state.accountReducer.publicKey
  };
}
export default connect(mapStateToProps)(ConfirmPayment);
import React, { Fragment, Component }  from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Container from '../utils/Container'
import { connect } from 'react-redux';

import styles from '../utils/Styles';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';

class ConfirmPayment extends Component{
  constructor(props){
    super(props)
    this.state = {
      showPassword: false,
     sendingTransaction: false
    }  
  }

  render(){
    console.log(this.props)
    let values = this.props.navigation.state.params.values
    let actualXLMBalance = this.props.account.balances.find((balance)=>balance.asset_type==="native").balance
    let fee = 0.00001
    if (values.currency === "native"){
      var remainingXLM = actualXLMBalance - values.amount - fee
    } else {
      var remainingXLM = actualXLMBalance - fee
      let actualBalance = this.props.account.balances.find((balance)=>balance.asset_type===values.currency).balance
      var remainingBalance = actualBalance - values.amount
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
              <Text style={[styles.title, {width: "60%"}]}> {fee} XLM</Text>
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
                onPress={()=>{}}
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
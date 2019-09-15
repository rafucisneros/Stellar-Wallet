import React, { Fragment, Component }  from 'react'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import Container from '../utils/Container'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation'

import styles from '../utils/Styles'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button } from 'react-native-paper'
import Stellar from '../utils/Stellar'
import NavigationService from '../utils/NavigationService'
import { MaterialDialog } from 'react-native-material-dialog'

class ConfirmPayment extends Component{
  constructor(props){
    super(props)
    this.state = {
      showPassword: false,
      sendingTransaction: false,
      fee: 0.00001,
      dialogVisible: false,
      transactionResult: false
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
    let result = await Stellar.submitTransaction(this.props.publicKey, 
      values.recipient, values.amount, values.currency, 
      this.state.fee, this.props.secretKey,
      values.memo ? values.memo : null)
    if (result){
      try{
        const transactionDetails = await fetch(result._links.transaction.href)
        const transactionResultData = await transactionDetails.json()
        console.log(transactionResultData)
        this.setState({sendingTransaction: false, dialogVisible: true,
          transactionResult: transactionResultData})
      } catch(error){
        Alert.alert("Error","Transaction submitted successfully, but error loading details.")
        console.log(error)
        this.setState({sendingTransaction: false})
        this.props.navigation.dispatch(StackActions.pop({
          n: 1,
        }))
      }
    }
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
        {this.state.transactionResult ? 
          <MaterialDialog
            titleColor={this.state.transactionResult.successful ? "green" : "red"}
            title={this.state.transactionResult.successful ? "Transaction Successful!" : "Transaction Failed!"} 
            visible={this.state.dialogVisible}
            onOk={() => {
                this.setState({ dialogVisible: false })
                this.props.navigation.dispatch(StackActions.pop({
                  n: 1,
                }))
              }
            }
            >
            <Fragment>

              <Text>Your transaction was successfully submitted into the ledger #{this.state.transactionResult.ledger}.</Text>
              <View style={[{flexDirection: "row", justifyContent: "space-between"}]}>
                <View style={{width:"80%"}}>
                  <Text>
                    The maximun fee allowed was {this.state.transactionResult.max_fee}. You actually paid {this.state.transactionResult.fee_paid} Troops.
                  </Text>
                </View>
                <View style={{width:"10%", justifyContent: "center"}}>
                  <TouchableOpacity
                    onPress = { ()=>{Alert.alert("Troops", "1 XLM is equivalent to 10.000.000 Troops.")} }
                  >
                    <Icon size={25} name={'information-outline'}/>
                  </TouchableOpacity>                
                </View>
              </View>
            </Fragment>
          </MaterialDialog>
        : null}
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
              <Text style={[styles.title, {width: "40%"}]}>Maximun Fee Allowed:</Text>    
              <Text style={[styles.title, {width: "40%"}]}>{this.state.fee / 10000000} XLM</Text>
              <View style={[{width: "20%"}]}>
                <TouchableOpacity
                  onPress = { ()=>{Alert.alert("Maximun Fee Allowed", "This is the maximum base fee you’re willing to pay per operation. You’re actually charged the lowest possible fee based on network activity. When network activity is below capacity, you pay the network minimum, which is currently 100 stroops (0.00001 XLM) per operation.")}}
                >
                  <Icon size={25} name={'information-outline'}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexDirection: "row"}}>
              <Text style={[styles.title, {width: "40%"}]}>Timeout:</Text>    
              <Text style={[styles.title, {width: "40%"}]}>60 seconds.</Text>
              <View style={[{width: "20%"}]}>
                <TouchableOpacity
                  onPress = { ()=>{Alert.alert("Timeout", "We will try to submit the transaction for 60 seconds. After this time we will cancel the transaction and it will have to be submitted again. By doing this we can give you certainty about the transaction result in a short time.")} }
                >
                  <Icon size={25} name={'information-outline'}/>
                </TouchableOpacity>
              </View>
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
    publicKey: state.accountReducer.publicKey,
    secretKey: state.accountReducer.secretKey
  };
}
export default connect(mapStateToProps)(ConfirmPayment);
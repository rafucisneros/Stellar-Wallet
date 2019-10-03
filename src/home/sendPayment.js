import React, { Component }  from 'react'
import { Text, View, TextInput, 
  Picker, Alert, TouchableOpacity, Clipboard,
  ActivityIndicator
} from 'react-native'
import Container from '../utils/Container'
import Stellar from '../utils/Stellar'
import AccountNotFunded from '../utils/AccountNotFunded'

import { store } from '../redux/store'
import { connect } from 'react-redux'
import { Button } from 'react-native-paper'
import { Formik } from 'formik'
import * as Yup from 'yup'

import NavigationService from '../utils/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from '../utils/Styles'

class SendPayment extends Component{
  constructor(props){
    super(props)
    currency = "native"
    if(this.props.account){
      balance = this.props.account.balances.filter(
        ({asset_type})=> asset_type == currency
      )[0].balance
      this.state = {currency, balance, refreshig: false}
    }
  }

  submitPayment = async (values, formikActions) => {
    try{
      accountExists = await Stellar.accountExists(values.recipient)
      formikActions.setSubmitting(false)
      NavigationService.navigate("ConfirmPayment", {values})

    } catch (error){
      if (error.message == "Request failed with status code 404") {
        formikActions.setSubmitting(false)   
        Alert.alert("Destination account not funded.",`The account provided is not created yet. You need to make a "Create Account" operation in order to create it`)
      } else if (error.message == "Network Error"){
        Alert.alert("Network issue detected.", "We couldn't reach the server. Check your internet connection.")
      } else {
        formikActions.setSubmitting(false)   
        Alert.alert("Key Error", "The key provided is not a valid Stellar Key.")
      }
    } finally {
      formikActions.setSubmitting(false)
    }
  }

  refreshPage = async () => {
    this.setState({refreshing: true})
    try{
      account = await Stellar.getAccount(this.props.publicKey)
      store.dispatch({
        type: "LOAD_ACCOUNT",
        payload: {
          account
        }
      })
      balance = this.props.account.balances.filter(
        ({asset_type})=> asset_type == currency
      )[0].balance;
      this.setState({balance})
    } catch (error) {
      if (error.message == "Request failed with status code 404") { 
        Alert.alert("This account is not funded yet.",`The account provided is not created yet. You need to receive at least 1 XLM in a "Create Account" operation in order to fund your account.`)
      } else {
        Alert.alert("Network issue detected.", "We couldn't reach the server. Check your internet connection.")
      }
    } finally {
      this.setState({refreshing: false})
    }
  }

  render(){
    if (this.props.account){
      return (
        <Container refreshing={ this.state.refreshing } onRefresh={ this.refreshPage }>
          <View style={styles.section}>
            <View style={{flexDirection: "row"}}>
              <Text style={[styles.sectionTitle, {width: "80%"}]}>
                Send Payment
              </Text>
              <View style={{width: "20%"}}>
                <TouchableOpacity onPress = { this.refreshPage }>
                  <MaterialIcon size={25} name={'refresh'}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.container}>
              <Formik
                initialValues={{ 
                  recipient: '', amount: '',
                  currency: 'native', memo: ''
                }}
                validationSchema={Yup.object({
                  recipient: Yup.string()
                    .length(56, "Stellar addresses must have exactly 56 characters.")              
                    .required('Required'),
                  amount: Yup.number()
                    .required('Required')
                    .max(this.state.balance),
                  currency: Yup.string()
                    .required("Required"),
                  memo: Yup.string()
                    .max(28, "Memos can only have 28 characters (Special characters like \"ñ\" may count as 2).")
                })}
                onSubmit={ this.submitPayment }>
                {props => (
                  <View>
                    <Text>Recipient Address</Text>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                      <View style={{width:"80%"}}>
                        <TextInput
                          onChangeText={props.handleChange('recipient')}
                          onBlur={props.handleBlur('recipient')}
                          value={props.values.recipient}
                          placeholder="Recipient Address"
                          style={styles.input}
                          label='recipient'
                        />
                        {props.touched.recipient && props.errors.recipient ? (
                          <Text style={styles.error}>{props.errors.recipient}</Text>
                        ) : null}
                      </View>
                      <View style={{width:"10%", justifyContent: "center"}}>
                        <TouchableOpacity
                          onPress = { async ()=>{
                            let text = await Clipboard.getString();
                            props.setFieldValue("recipient", text);
                          } }
                        >
                          <Icon size={25} name={'clipboard'}/>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={[{flexDirection: "row", justifyContent: "space-between"}]}>
                      <View style={[{width: "40%"}]}>
                        <Text>Currency</Text>
                        <Picker
                          selectedValue={this.state.currency}
                          style={{height: 50}}
                          onValueChange={(itemValue, itemIndex) => {
                            props.setFieldValue('currency', itemValue);
                            if (itemValue === "native") { 
                              balance = this.props.account.balances.filter(
                                ({asset_type}) => asset_type == itemValue
                                )[0].balance 
                            } else { 
                              balance = this.props.account.balances.filter(
                                ({asset_code}) => asset_code == itemValue
                                )[0].balance
                            }
                            this.setState({currency: itemValue, balance})
                          }
                          }>
                          {this.props.account.balances.map((balance, index)=>( balance.asset_type === "native" ?
                            <Picker.Item label="XLM" value={balance.asset_type} key={index} />
                            : <Picker.Item label={balance.asset_code} value={balance.asset_code} key={index} />
                          ))}
                        </Picker>
                      </View>  
                      <View style={{width: "60%"}}>
                        <Text>Amount</Text>
                        <TextInput
                          onChangeText={props.handleChange('amount')}
                          onBlur={props.handleBlur('amount')}
                          value={props.values.amount}
                          placeholder="0.00000"
                          style={styles.input}
                          ref={el => this.amountInput = el}
                          onSubmitEditing={() => {
                            this.memoInput.focus()
                          }}
                        />
                        {props.touched.amount && props.errors.amount ? (
                          <Text style={styles.error}>{props.errors.amount}</Text>
                        ) : null}
                        <Text>
                          Available Amount: {this.state.balance} {this.state.currency == "native" ? "XML" : this.state.currency}
                        </Text>
                      </View>              
                    </View>
                    <Text>Memo (optional)</Text>
                    <TextInput
                      onChangeText={props.handleChange('memo')}
                      onBlur={props.handleBlur('memo')}
                      value={props.values.memo}
                      placeholder="memo"
                      style={styles.input}
                      ref={el => this.memoInput = el}
                    />
                    {props.touched.memo && props.errors.memo ? (
                      <Text style={styles.error}>{props.errors.memo}</Text>
                    ) : null}
                    <Button
                      onPress={props.handleSubmit}
                      color="#0097A7"
                      mode="contained"
                      loading={props.isSubmitting}
                      disabled={props.isSubmitting}
                      style={{ marginTop: 16 }}>
                      Submit
                    </Button>
                    <Button
                      onPress={props.handleReset}
                      color="black"
                      mode="outlined"
                      disabled={props.isSubmitting}
                      style={{ marginTop: 16 }}>
                      Reset
                    </Button>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </Container>
      )
    } else if (!this.props.accountFunded) {
      return (
        <Container>
          <AccountNotFunded />
        </Container>
      )
    }
    return (
      <Container>
        <Text style={{alignSelf: "center"}}>Loading Account...</Text>
        <ActivityIndicator size="large" color="#000" />
      </Container>
    )
  }
}

function mapStateToProps(state){
  return {
    account: state.accountReducer.account,
    publicKey: state.accountReducer.publicKey,
    accountFunded: state.accountReducer.accountFunded
  };
}
export default connect(mapStateToProps)(SendPayment)
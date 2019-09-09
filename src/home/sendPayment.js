import React, { Component }  from 'react';
import { Text, View, StyleSheet, TextInput, 
  Picker, Alert, TouchableOpacity, Clipboard
} from 'react-native';
import Container from '../utils/Container'
import Stellar from '../utils/Stellar';

import { connect } from 'react-redux';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

import NavigationService from '../utils/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../utils/Styles';


class Form extends React.Component {
  constructor(props){
    super(props);
    currency = "native";
    balance = this.props.account.balances.filter(
      ({asset_type})=> asset_type == "native"
    )[0].balance;
    this.state = {currency, balance};
  }

  submitPayment = async (values, formikActions) => {
    accountExists = await Stellar.accountExists(values.recipient);
    if (accountExists === true) {
      formikActions.setSubmitting(false);
      NavigationService.navigate("ConfirmPayment", {values});
    } else if (accountExists.message == "Request failed with status code 404") {
      formikActions.setSubmitting(false);    
      Alert.alert(`The account provided is not created yet. 
      You need to make a "Create Account" operation in order to create it`)
    } else{
      formikActions.setSubmitting(false);    
      Alert.alert("The key provided is not a valid Stellar Key.")
    }
  }

  render() {
    if (this.props.account){
      return (
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
                    autoFocus
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
      );
    }
    return (
      <Container>
        <Text style={{alignSelf: "center"}}>Loading Account...</Text>
        <ActivityIndicator size="large" color="#000" />
      </Container>
    )
  }
}

class SendPayment extends Component{
  render(){
    return (
      <Container>
        <View style={styles.section}>
          <Form account={this.props.account} navigation={this.props.navigation}/>
        </View>
      </Container>
    )
  }
}

function mapStateToProps(state){
  return {
    account: state.accountReducer.account
  };
}
export default connect(mapStateToProps)(SendPayment);
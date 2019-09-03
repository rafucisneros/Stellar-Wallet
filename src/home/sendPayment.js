import React, { Component }  from 'react';
import { Text, View, StyleSheet, TextInput, 
  Picker 
} from 'react-native';
import Container from '../utils/Container'

import { connect } from 'react-redux';

import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

class Form extends React.Component {
  constructor(props){
    super(props);
    currency = "native";
    balance = this.props.account.balances.filter(
      ({balance, asset_type})=> asset_type == "native"
    )[0].balance;
    this.state = {currency, balance};
    console.log(this.props.account.balances)
  }
  emailInput = null;
  render() {
    var options =["Home","Savings","Car","GirlFriend"]
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
          onSubmit={(values, formikActions) => {
            console.log(values)
            console.log(formikActions)
            setTimeout(() => {
              formikActions.setSubmitting(false);
            }, 500);
          }}>
          {props => (
            <View>
             <Text>Recipient Address</Text>
             <TextInput
                onChangeText={props.handleChange('recipient')}
                onBlur={props.handleBlur('recipient')}
                value={props.values.recipient}
                autoFocus
                placeholder="Recipient Address"
                style={styles.input}
                onSubmitEditing={() => {
                  this.currencyInput.focus()
                }}
              />
              {props.touched.recipient && props.errors.recipient ? (
                <Text style={styles.error}>{props.errors.recipient}</Text>
              ) : null}
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
                    {/* <Picker.Item label="XLM" value="native" /> */}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    margin: 8,
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    paddingHorizontal: 8,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
});

class SendPayment extends Component{
  render(){
    return (
      <Container>
        <Form account={this.props.account}/>
      </Container>
    )
  }
}

function mapStateToProps(state){
  return {
    account: state.accountReducer.account,
    accountId: state.accountReducer.accountId
  };
}
export default connect(mapStateToProps)(SendPayment);
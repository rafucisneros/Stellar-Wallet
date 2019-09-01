import React, { Fragment, Component }  from 'react';
import { Text, TextInput } from 'react-native';
import Container from '../utils/Container'

import { connect } from 'react-redux';
import { store } from '../redux/store';

class SendPayment extends Component{
  render(){
    return (
      <Container>
        <Text style={{alignSelf: "center"}}>Recipient Address</Text>
      </Container>
    )
  }
}

function mapStateToProps(state){
  return {
    account: state.account,
    accountId: state.accountId
  };
}
export default connect(mapStateToProps)(SendPayment);
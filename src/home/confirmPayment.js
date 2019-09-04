import React, { Fragment, Component }  from 'react';
import { Text, View } from 'react-native';
import MenuTop from '../utils/MenuTop';
import Container from '../utils/Container'

import { connect } from 'react-redux';
import { store } from '../redux/store';

class ConfirmPayment extends Component{
  render(){
    return (
      <Fragment>
        <Container>
          <View>
            <Text>ConfirmPayment</Text>
          </View>
        </Container>
      </Fragment>
    )
  }
}


function mapStateToProps(state){
  return {
    account: state.account,
    accountId: state.accountId
  };
}
export default connect(mapStateToProps)(ConfirmPayment);
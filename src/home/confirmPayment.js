import React, { Fragment, Component }  from 'react';
import { Text, View } from 'react-native';
import Container from '../utils/Container'
import { connect } from 'react-redux';

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
    publicKey: state.publicKey
  };
}
export default connect(mapStateToProps)(ConfirmPayment);
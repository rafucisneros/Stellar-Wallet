import React, { Fragment, Component }  from 'react';
import { Text, View } from 'react-native';
import Container from '../utils/Container'

import { connect } from 'react-redux';

class ImportAccount extends Component{
  render(){
    return (
      <Fragment>
        <Container>
          <View>
            <Text>Import Account</Text>
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
export default connect(mapStateToProps)(ImportAccount);
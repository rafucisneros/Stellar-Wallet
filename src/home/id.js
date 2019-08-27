import React, { Fragment, Component }  from 'react';
import { Text, View } from 'react-native';
import Container from '../utils/Container'

import { connect } from 'react-redux';
import { store } from '../redux/store';

class ID extends Component{
  render(){
    return (
      <Container>
        <Text style={{alignSelf: "center"}}>ID</Text>
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
export default connect(mapStateToProps)(ID);
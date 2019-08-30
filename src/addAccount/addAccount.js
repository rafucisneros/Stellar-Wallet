import React, { Fragment, Component }  from 'react';
import { Text, View } from 'react-native';

import MenuTop from '../utils/MenuTop';
import Container from '../utils/Container'

import { connect } from 'react-redux';

class AddAccount extends Component{
  render(){
    return (
      <Fragment>
        <MenuTop navigation={this.props.navigation}/>
        <Container>
          <View>
            <Text>Add Account</Text>
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
export default connect(mapStateToProps)(AddAccount);
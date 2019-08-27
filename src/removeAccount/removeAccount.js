import React, { Fragment, Component }  from 'react';
import { Text, View } from 'react-native';
import MenuTop from '../utils/MenuTop';
import Container from '../utils/Container'

import { connect } from 'react-redux';
import { store } from '../redux/store';

class RemoveAccount extends Component{
  render(){
    return (
      <Fragment>
        <MenuTop navigation={this.props.navigation}/>
        <Container>
          <View>
            <Text>Remove Account</Text>
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
export default connect(mapStateToProps)(RemoveAccount);

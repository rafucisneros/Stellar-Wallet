import React, { Component } from 'react'
import {
    Text, View, FlatList, ActivityIndicator
} from 'react-native'
import Separators from '../utils/Separators'
import Stellar from '../utils/Stellar'
import styles from '../utils/Styles'
import Container from '../utils/Container'

import { connect } from 'react-redux'
import { store } from '../redux/store'

class Balance extends Component{
  render(){
    return (
      <View style={{margin: 5}}>
        <View>
          <View style={{flexDirection: "row"}}>
            <Text style={[{width: "50%"}]}>
              {this.props.balance.item.asset_type  === "native" ? "XLM" : 
               this.props.balance.item.asset_code}
            </Text>    
            <Text style={[{width: "50%"}]}>{this.props.balance.item.balance}</Text>
          </View>   
        </View>
      </View>
    )
  }
}

class Account extends Component {

  async componentDidMount(){
    account = await Stellar.getAccount(this.props.publicKey)
    store.dispatch({
      type: "LOAD_ACCOUNT",
      payload: {
        account
      }
    })
  }

  renderBalance = balance => {
    return (
      <Balance balance={balance} />
    )
  }

  render() {
    if (this.props.account){
      return (
        <Container>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Public Key
            </Text>
            <Text>{this.props.publicKey}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Balances
            </Text>
            <View style={{flexDirection: "row"}}>
              <Text style={[styles.title, {width: "50%"}]}>Asset Type:</Text>    
              <Text style={[styles.title, {width: "50%"}]}>Balances:</Text>
            </View>
            <FlatList 
              data = { this.props.account.balances }
              renderItem = { this.renderBalance }
              ItemSeparatorComponent = { Separators.verticalSeparator }
              keyExtractor = {(item, index) => index.toString()}
            />
          </View>
        </Container>
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

function mapStateToProps(state){
  return {
    account: state.accountReducer.account,
    publicKey: state.accountReducer.publicKey
  }
}
export default connect(mapStateToProps)(Account)
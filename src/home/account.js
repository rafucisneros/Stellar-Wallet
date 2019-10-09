import React, { Component } from 'react'
import {
    Text, View, FlatList, ActivityIndicator,
    TouchableOpacity, Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

import Separators from '../utils/Separators'
import Stellar from '../utils/Stellar'
import styles from '../utils/Styles'
import Container from '../utils/Container'
import AccountNotFunded from '../utils/AccountNotFunded'

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
  constructor(props){
    super(props)
    this.state = {refreshing: false}
  }
  
  async loadAccount(){
    try{
      account = await Stellar.getAccount(this.props.publicKey)
      store.dispatch({
        type: "LOAD_ACCOUNT",
        payload: {
          account
        }
      })
    } catch (error) {
      if (error.message == "Request failed with status code 404") { 
        Alert.alert("This account is not funded yet.",`The account provided is not created yet. You need to receive at least 1 XLM in a "Create Account" operation in order to fund your account.`)
      } else {
        Alert.alert("Network issue detected.", "We couldn't reach the server. Check your internet connection.")
      }
    }
  }

  async componentDidMount(){
    await this.loadAccount()
  }

  renderBalance = balance => {
    return (
      <Balance balance={balance} />
    )
  }

  refreshPage = async () => {
    this.setState({refreshing: true})
    await this.loadAccount()
    this.setState({refreshing: false})
  }

  render() {
    debugger
    if (this.props.account && this.props.accountFunded){
      return (
        <Container refreshing={ this.state.refreshing } onRefresh={ this.refreshPage }>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Public Key
            </Text>
            <Text>{this.props.publicKey}</Text>
          </View>
          <View style={styles.section}>
            <View style={{flexDirection: "row"}}>
              <Text style={[styles.sectionTitle, {width: "80%"}]}>
                Balances
              </Text>
              <View style={{width: "20%"}}>
                <TouchableOpacity onPress = { this.refreshPage }>
                  <Icon size={25} name={'refresh'}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexDirection: "row", alignItems: "space-around"}}>
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
    } else if (!this.props.accountFunded) {
      return (
        <Container>
          <AccountNotFunded />
        </Container>
      )
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
    publicKey: state.accountReducer.publicKey,
    accountFunded: state.accountReducer.accountFunded
  }
}
export default connect(mapStateToProps)(Account)
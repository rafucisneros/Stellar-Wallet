import React, {Component} from 'react';
import {
  Text, View, FlatList,
  ActivityIndicator, Button
} from 'react-native';
import Stellar from '../utils/Stellar';
import Separators from '../utils/Separators';
import styles from '../utils/Styles';
import Container from '../utils/Container';

import { store } from '../redux/store';
import { connect } from 'react-redux';

class Transaction extends Component{
  constructor(props){
    super(props)
  }  
  render(){
    return (
      <View>
        <View>
          <Text style={styles.title}>Memo Type:</Text>    
          <Text>{this.props.transaction.item.memo_type}</Text>    
        </View>
        <View>
          <Text style={styles.title}>Date:</Text>  
          <Text>{this.props.transaction.item.created_at}</Text>  
        </View>
      </View>
    )
  }
}


class Transactions extends Component{
  constructor(props){
    super(props);
  }  
  async componentDidMount(){
    transactions = await Stellar.loadTransactionsForAccount(this.props.accountId);
    store.dispatch({
      type: "LOAD_TRANSACTIONS",
      payload: {
        transactions
      }
    })
  }

  renderTransaction = transaction => {
    return (
      <Transaction transaction={transaction} />
    )
  }

  handlePress = () => {
    console.log(this.props.navigation);
    this.props.navigation.navigate('Account')
  }

  render(){
    if (this.props.transactions){
      return (
        <Container style={styles.section}>
          <Button
            title="hola"
            onPress={this.handlePress}
          />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Transactions
            </Text>
            <FlatList 
              data = { this.props.transactions.records }
              renderItem = { this.renderTransaction }
              ItemSeparatorComponent = { Separators.verticalSeparator }
              keyExtractor = {(item, index) => index.toString()}
            />
          </View>
        </Container>
      )
    }
    return (
      <Container>
        <Text style={styles.loadingTitle}>Loading Transacions...</Text>
        <ActivityIndicator size="large" color="#000" />
      </Container>
    )
  }
  
}

function mapStateToProps(state){
  return {
    transactions: state.transactions,
    accountId: state.accountId
  }
}
export default connect(mapStateToProps)(Transactions);
import React, {Component} from 'react';
import {
  Text, View, StyleSheet, FlatList
} from 'react-native';
import Stellar from './utils/Stellar';
import Separators from './utils/Separators.js'

class Transaction extends Component{
  constructor(props){
    super(props)
    // console.log(props)
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
    this.state = {transactions: false};
    this.accountID = "GAL2KXOLC4ZW4HBHYHVKTQXYI6LNQZMH6I4MM7NGTVNQFU4P7ISC4WDF";
  }  

  componentDidMount(){
    Stellar.loadTransactionsForAccount(this.accountID, this);
  }

  renderTransaction = transaction => {
    return (
      <Transaction transaction={transaction} />
    )
  }

  render(){
    if (this.state.transactions){
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Transactions
          </Text>
          <FlatList 
              data = { this.state.transactions.records }
              renderItem = { this.renderTransaction }
              ItemSeparatorComponent = { Separators.verticalSeparator }
              keyExtractor = {(item, index) => index}
            />
        </View>
      )
    }
    return <Text>Loading Transactions...</Text>
  }
  
}

const styles = StyleSheet.create({
  separator:{
    borderTopWidth: 1
  },
  section:{
    backgroundColor: "#B2EBF2",
    paddingHorizontal: 3,
    paddingVertical: 3,
    margin: 3
  },
  title:{
    fontWeight: "bold",
    fontSize: 15
  },
  sectionTitle:{
    fontWeight: "bold",
    fontSize: 18   
  }
});

export default Transactions;
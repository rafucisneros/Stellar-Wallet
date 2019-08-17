import React, {
  Component
} from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import { Server } from 'stellar-sdk';
import VerticalSeparator from './verticalSeparator.js';

class Balance extends Component{
  constructor(props){
    super(props)
    console.log(props)
  }  
  render(){
    return (
      <View>
        <View>
          <Text style={styles.title}>Asset Type:</Text>    
          <Text>{this.props.balance.item.asset_type}</Text>    
        </View>
        <View>
          <Text style={styles.title}>Balance:</Text>  
          <Text>{this.props.balance.item.balance}</Text>  
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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

class Account extends Component {
  constructor(props){
    super(props);
    this.state = { account: false };
    this.server = new Server('https://horizon-testnet.stellar.org');
  }

  async loadAccount(accoundId){
    try{
      const account = await this.server.accounts()
        .accountId(accoundId).call();
      console.log(account);
      this.setState({account: account})
    } catch {
      console.log("An error ocurred trying to load account.");      
    }
  }

  componentDidMount(){
    this.loadAccount("GAL2KXOLC4ZW4HBHYHVKTQXYI6LNQZMH6I4MM7NGTVNQFU4P7ISC4WDF");
  }

  renderBalance = balance => {
    return (
      <Balance balance={balance} />
    )
  }

  separator = () => <VerticalSeparator />

  render() {
    if (this.state.account){
      return (
        <View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Account ID
            </Text>
            <Text>{this.state.account.id}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Balances
            </Text>
            <FlatList 
              data = { this.state.account.balances }
              renderItem = { this.renderBalance }
              ItemSeparatorComponent = { this.separator }
            />
          </View>
        </View>
      );
    }
    return <Text>Cargando...</Text>
  }
}

export default Account;
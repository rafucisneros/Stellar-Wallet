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

class Account extends Component {
  constructor(props){
    super(props);
    this.state = { account: false };
    this.server = new Server('https://horizon-testnet.stellar.org');
  }

  async loadAccount(accoundId){
    try{
      const account = await this.server.accounts()
                      .accountId(accoundId)
                      .call();
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

  render() {
    if (this.state.account){
      return (
        <View>
          <Text>
            Account ID:
          </Text>
          <Text>{this.state.account.id}</Text>
          <Text>
            Balances:
          </Text>
          <FlatList 
            data = {this.state.account.balances}
            renderItem ={ this.renderBalance }
          />
        </View>
      );
    }
    return <Text>Cargando...</Text>
  }
}

class Balance extends Component{
  constructor(props){
    super(props)
    console.log(props)
  }  
  render(){
    return (
      <View>
        <View>
          <Text>Asset Type:</Text>    
          <Text>{this.props.balance.item.asset_type}</Text>    
        </View>
        <View>
          <Text>Balance:</Text>  
          <Text>{this.props.balance.item.balance}</Text>  
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

});

export default Account;
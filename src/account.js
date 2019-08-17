import React, {
  Component
} from 'react';
import {
    Text,
    View,
    StyleSheet
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

  render() {
    if (this.state.account){
      return (
        <View>
          <Text>
            Account ID:
          </Text>
          <Text>{this.state.account.id}</Text>
        </View>
      );
    }
    return <Text>Cargando...</Text>
  }
}

const styles = StyleSheet.create({

});

export default Account;
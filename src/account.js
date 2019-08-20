import React, {
  Component
} from 'react';
import {
    Text, View, StyleSheet, FlatList, ActivityIndicator
} from 'react-native';
import Separators from './utils/Separators';
import Stellar from './utils/Stellar';
import Styles from './utils/Styles';

class Balance extends Component{
  constructor(props){
    super(props)
    console.log(props)
  }  
  render(){
    return (
      <View>
        <View>
          <Text style={Styles.styles.title}>Asset Type:</Text>    
          <Text>{this.props.balance.item.asset_type}</Text>    
        </View>
        <View>
          <Text style={Styles.styles.title}>Balance:</Text>  
          <Text>{this.props.balance.item.balance}</Text>  
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

});

class Account extends Component {
  constructor(props){
    super(props);
    this.state = { account: false };
  }

  componentDidMount(){
    Stellar.loadAccount("GAL2KXOLC4ZW4HBHYHVKTQXYI6LNQZMH6I4MM7NGTVNQFU4P7ISC4WDF", this);
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
          <View style={Styles.styles.section}>
            <Text style={Styles.styles.sectionTitle}>
              Account ID
            </Text>
            <Text>{this.state.account.id}</Text>
          </View>
          <View style={Styles.styles.section}>
            <Text style={Styles.styles.sectionTitle}>
              Balances
            </Text>
            <FlatList 
              data = { this.state.account.balances }
              renderItem = { this.renderBalance }
              ItemSeparatorComponent = { Separators.verticalSeparator }
              keyExtractor = {(item, index) => index.toString()}
            />
          </View>
        </View>
      );
    }
    return (
      <View>
        <Text style={{alignSelf: "center"}}>Loading Account...</Text>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }
}

export default Account;
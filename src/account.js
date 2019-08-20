import React, {
  Component
} from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import Separators from './utils/Separators';
import Stellar from './utils/Stellar';

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
              ItemSeparatorComponent = { Separators.verticalSeparator }
              keyExtractor = {(item, index) => index}
            />
          </View>
        </View>
      );
    }
    return <Text>Cargando...</Text>
  }
}

export default Account;
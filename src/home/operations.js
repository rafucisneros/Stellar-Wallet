import React, {Component} from 'react';
import {
  Text, View, FlatList,
  ActivityIndicator
} from 'react-native';
import Stellar from '../utils/Stellar';
import Separators from '../utils/Separators';
import styles from '../utils/Styles';
import Container from '../utils/Container';

import { store } from '../redux/store';
import { connect } from 'react-redux';

class Operation extends Component{
  constructor(props){
    super(props)
    this.state = {memo: false}
    console.log(this.props.operation.item.type)
  }  

  async componentDidMount(){
    transaction = await Stellar.getTransactionByHash(this.props.operation.item.transaction_hash);
    if (transaction.memo_type !== "none"){
      this.setState({memo: transaction.memo})
    }
  }

  render(){
    switch (this.props.operation.item.type){
      case "payment":
        return(
          <View>
            <View style={[{flexDirection: "row"}]}>
              <Text style={[styles.title, {width: "40%"}]}>Amount:</Text>    
              <Text style={[{width: "60%", color: this.props.operation.item.to === this.props.accountId ? "green": "red"}]}>
                {this.props.operation.item.amount} {this.props.operation.item.asset_code}
              </Text>    
            </View>
            <View style={[{flexDirection: "row"}]}>
              <Text style={[styles.title, {width: "40%"}]}>Action Performed:</Text>    
              <Text style={[{width: "60%"}]}>{this.props.operation.item.type}</Text>    
            </View>
            <View style={[{flexDirection: "row"}]}>
              <Text style={[styles.title, {width: "40%"}]}>Date:</Text>    
              <Text style={[{width: "60%"}]}>{this.props.operation.item.created_at}</Text>    
            </View>
            { this.props.operation.item.to !== this.props.accountId ?
              <View style={[{flexDirection: "row"}]}>
                <Text style={[styles.title, {width: "40%"}]}>Sent to:</Text>    
                <Text style={[{width: "60%"}]}>{this.props.operation.item.to}</Text>    
              </View> :
              <View style={[{flexDirection: "row"}]}>
                <Text style={[styles.title, {width: "40%"}]}>Received from:</Text>    
                <Text style={[{width: "60%"}]}>{this.props.operation.item.from}</Text>    
              </View>
            }
            <View style={[{flexDirection: "row"}]}>
              <Text style={[styles.title, {width: "40%"}]}>Action Performed:</Text>    
              <Text style={[{width: "60%"}]}>{this.props.operation.item.type}</Text>    
            </View>
            { this.state.memo ?
              <View style={[{flexDirection: "row"}]}>
                <Text style={[styles.title, {width: "40%"}]}>Memo:</Text>    
                <Text style={[{width: "60%"}]}>{this.state.memo}</Text>    
              </View> : null           
            }
          </View>  
          )    
      default:
        return (
          <View>
            <View>
              <Text style={styles.title}>Memo Type:</Text>    
              <Text>{this.props.operation.item.memo_type}</Text>    
            </View>
            <View>
              <Text style={styles.title}>Date:</Text>  
              <Text>{this.props.operation.item.created_at}</Text>  
            </View>
          </View>
        )
    }

  }
}

class Operations extends Component{
  constructor(props){
    super(props);
  }  
  async componentDidMount(){
    operations = await Stellar.loadOperationsForAccount(this.props.accountId);
    store.dispatch({
      type: "LOAD_OPERATIONS",
      payload: {
        operations
      }
    })
  }

  renderOperation = operation => {
    return (
      <Operation operation={operation} accountId={this.props.accountId}/>
    )
  }

  render(){
    if (this.props.operations){
      return (
        <Container style={styles.section}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Operations
            </Text>
            <FlatList 
              data = { this.props.operations.records }
              renderItem = { this.renderOperation }
              ItemSeparatorComponent = { Separators.verticalSeparator }
              keyExtractor = {(item, index) => index.toString()}
            />
          </View>
        </Container>
      )
    }
    return (
      <Container>
        <Text style={styles.loadingTitle}>Loading Operations...</Text>
        <ActivityIndicator size="large" color="#000" />
      </Container>
    )
  }
  
}

function mapStateToProps(state){
  return {
    operations: state.accountReducer.operations,
    accountId: state.accountReducer.accountId
  }
}
export default connect(mapStateToProps)(Operations);
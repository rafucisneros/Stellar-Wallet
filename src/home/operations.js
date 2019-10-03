import React, {Component, Fragment} from 'react'
import {
  Text, View, FlatList, TouchableOpacity, 
  ActivityIndicator, Button, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Stellar from '../utils/Stellar'
import Separators from '../utils/Separators'
import styles from '../utils/Styles';
import Container from '../utils/Container'
import AccountNotFunded from '../utils/AccountNotFunded'

import { store } from '../redux/store'
import { connect } from 'react-redux'

class Operation extends Component{
  render(){
    let actionPerformed = 
      <View style={[{flexDirection: "row"}]}>
        <Text style={[styles.title, {width: "40%"}]}>Action Performed:</Text>    
        <Text style={[{width: "60%", textTransform: "capitalize"}]}>{this.props.operation.item.type}</Text>    
      </View>
    let date =
    <View style={[{flexDirection: "row"}]}>
      <Text style={[styles.title, {width: "40%"}]}>Date:</Text>    
      <Text style={[{width: "60%"}]}>{this.props.operation.item.created_at}</Text>    
    </View>
    let fields = [actionPerformed, date]

    switch (this.props.operation.item.type){
      case "payment":
        let operationColor = "green";
        if (this.props.operation.item.to === this.props.publicKey &&
          this.props.operation.item.from === this.props.publicKey){
            operationColor = "blue"
          } else if (this.props.operation.item.to !== this.props.publicKey &&
            this.props.operation.item.from === this.props.publicKey){
              operationColor = "red"
          }
        let amount =
          <View style={[{flexDirection: "row"}]}>
            <Text style={[styles.title, {width: "40%"}]}>Amount:</Text>    
            <Text style={[{width: "60%", color: operationColor}]}>
              {this.props.operation.item.amount} {this.props.operation.item.asset_code}
            </Text>    
          </View>
        let source;
        if (this.props.operation.item.to !== this.props.publicKey && this.props.operation.item.from === this.props.publicKey){
          source = 
            <View style={[{flexDirection: "row"}]}>
              <Text style={[styles.title, {width: "40%"}]}>Sent to:</Text>    
              <Text style={[{width: "60%"}]}>{this.props.operation.item.to}</Text>    
            </View>
        } else if (this.props.operation.item.to === this.props.publicKey && this.props.operation.item.from !== this.props.publicKey) {
          source = 
            <View style={[{flexDirection: "row"}]}>
              <Text style={[styles.title, {width: "40%"}]}>Received from:</Text>    
              <Text style={[{width: "60%"}]}>{this.props.operation.item.from}</Text>    
            </View>
        } else if (this.props.operation.item.to === this.props.publicKey && this.props.operation.item.from === this.props.publicKey){
          source = 
            <Fragment>
              <View style={[{flexDirection: "row"}]}>
                <Text style={[styles.title, {width: "40%"}]}>Received from:</Text>    
                <Text style={[{width: "60%"}]}>Me</Text>    
              </View>
              <View style={[{flexDirection: "row"}]}>
                <Text style={[styles.title, {width: "40%"}]}>Sent to:</Text>    
                <Text style={[{width: "60%"}]}>Me</Text>    
              </View>
            </Fragment>
        }
        fields.push(amount, source)
        break
      case "change_trust":
        fields.push(
          <Fragment>            
            <View style={[{flexDirection: "row"}]}>
              <Text style={[styles.title, {width: "40%"}]}>Limit:</Text>    
              <Text style={[{width: "60%", color: "blue"}]}>
                {this.props.operation.item.amount} {this.props.operation.item.limit}
              </Text>    
            </View>
            <View style={[{flexDirection: "row"}]}>
              <Text style={[styles.title, {width: "40%"}]}>Date:</Text>    
              <Text style={[{width: "60%"}]}>{this.props.operation.item.created_at}</Text>    
            </View>
            <View style={[{flexDirection: "row"}]}>
              <Text style={[styles.title, {width: "40%"}]}>Trustor:</Text>    
              <Text style={[{width: "60%"}]}>{this.props.operation.item.trustor}</Text>    
            </View> 
            <View style={[{flexDirection: "row"}]}>
              <Text style={[styles.title, {width: "40%"}]}>Trustee:</Text>    
              <Text style={[{width: "60%"}]}>{this.props.operation.item.trustee}</Text>    
            </View>            
          </Fragment>  
        )
        break
      case "create_account":
        fields.push(
          <Fragment>
            <View style={[{flexDirection: "row"}]}>
              <Text style={[styles.title, {width: "40%"}]}>Starting Balance:</Text>    
              <Text style={[{width: "60%", color: this.props.operation.item.account === this.props.publicKey ? "green": "red"}]}>
                {this.props.operation.item.amount} {this.props.operation.item.starting_balance}
              </Text>    
            </View>        
            { this.props.operation.item.account !== this.props.publicKey ?
              <View style={[{flexDirection: "row"}]}>
                <Text style={[styles.title, {width: "40%"}]}>Sent to:</Text>    
                <Text style={[{width: "60%"}]}>{this.props.operation.item.to}</Text>    
              </View> :
              <View style={[{flexDirection: "row"}]}>
                <Text style={[styles.title, {width: "40%"}]}>Received from:</Text>    
                <Text style={[{width: "60%"}]}>{this.props.operation.item.funder}</Text>    
              </View>
            }
          </Fragment>
        )
        break
    }
    return (
      <View>
        {
          fields.map((el, index)=><Fragment key={index}>{el}</Fragment> )
        }
        { this.props.operation.item.memo ?
          <View style={[{flexDirection: "row"}]}>
            <Text style={[styles.title, {width: "40%"}]}>Memo:</Text>    
            <Text style={[{width: "60%"}]}>{this.props.operation.item.memo}</Text>    
          </View> : null           
        }
      </View>
    )
  }
}

class Operations extends Component{
  constructor(props){
    super(props);
    this.state = {refreshing: false}
  }  
  async loadOperations(){
    try{
      operations = await Stellar.getOperationsForAccount("GAJ6S2PB6BSGBH526EI34E7E2PBIE435MYURLDS6TW5NG5DVGZWOTOXN").then((data)=>data.records)
      let operationsWithMemo = operations.map(async op=>{
        return op.transaction()
      })    
      Promise.all(operationsWithMemo).then(data=>{
        data.map(transaction=>{
          if (transaction.memo) {
            operations.find(operation=>operation.transaction_hash === transaction.hash).memo = transaction.memo    
          }
        })
        store.dispatch({
          type: "LOAD_OPERATIONS",
          payload: {
            operations: operations
          }
        })
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
    await this.loadOperations()
  }

  renderOperation = operation => {
    return (
      <Operation operation={operation} publicKey={this.props.publicKey}/>
    )
  }

  refreshPage = async () => {
    this.setState({refreshing: true})
    await this.loadOperations()
    this.setState({refreshing: false})
  }

  render(){   
    if (this.props.operations && this.props.accountFunded){
      return (
        <Container refreshing={ this.state.refreshing } onRefresh={ this.refreshPage }>
          <View style={styles.section}>
            <View style={{flexDirection: "row"}}>
              <Text style={[styles.sectionTitle, {width: "80%"}]}>
                Operations
              </Text>
              <View style={{width: "20%"}}>
                <TouchableOpacity onPress = { this.refreshPage }>
                  <Icon size={25} name={'refresh'}/>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList 
              data = { this.props.operations }
              renderItem = { this.renderOperation }
              ItemSeparatorComponent = { Separators.verticalSeparator }
              keyExtractor = {(item, index) => index.toString()}
            />
            <View style={{margin: 5}}>
              <Button
                title="Load More..."
                disabled
                onPress={() => Alert.alert('Cannot press this one')}                
              />
            </View>
          </View>
        </Container>                
      )
    } else if (!this.props.accountFunded) {
      return (
        <Container>
          <AccountNotFunded />
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
    publicKey: state.accountReducer.publicKey,
    accountFunded: state.accountReducer.accountFunded
  }
}
export default connect(mapStateToProps)(Operations);
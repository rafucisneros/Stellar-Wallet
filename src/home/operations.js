import React, {Component, Fragment} from 'react'
import {
  Text, View, FlatList, TouchableOpacity,
  ActivityIndicator, Button
} from 'react-native';
import Stellar from '../utils/Stellar'
import Separators from '../utils/Separators'
import styles from '../utils/Styles';
import Container from '../utils/Container'

import { store } from '../redux/store'
import { connect } from 'react-redux'

class Operation extends Component{
  constructor(props){
    super(props)
    this.state = {memo: false, loadingMemo: true}
    // console.log(this.props.operation.item)
  }  

  async componentDidMount(){
    transaction = await Stellar.getTransactionByHash(this.props.operation.item.transaction_hash);
    if (transaction.memo_type !== "none"){
      this.setState({memo: transaction.memo, loadingMemo:false})
    } else{
      this.setState({memo: transaction.memo, loadingMemo:false})
    }
  }

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
    if (this.state.loadingMemo){
      return(
      <Container>
        <Text style={{alignSelf: "center"}}>Loading Operation...</Text>
        <ActivityIndicator size="large" color="#000" />
      </Container>
      )
    }
    return (
      <View>
        {
          fields.map((el, index)=><Fragment key={index}>{el}</Fragment> )
        }
        { this.state.memo ?
          <View style={[{flexDirection: "row"}]}>
            <Text style={[styles.title, {width: "40%"}]}>Memo:</Text>    
            <Text style={[{width: "60%"}]}>{this.state.memo}</Text>    
          </View> : null           
        }
      </View>
    )
  }
}

class Operations extends Component{
  constructor(props){
    super(props);
    this.state = {dialogVisible: true}
  }  
  async componentDidMount(){
    operations = await Stellar.getOperationsForAccount(this.props.publicKey);
    store.dispatch({
      type: "LOAD_OPERATIONS",
      payload: {
        operations
      }
    })
  }

  renderOperation = operation => {
    return (
      <Operation operation={operation} publicKey={this.props.publicKey}/>
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
    publicKey: state.accountReducer.publicKey
  }
}
export default connect(mapStateToProps)(Operations);
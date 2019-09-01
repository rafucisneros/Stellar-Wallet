import React, { Fragment, Component }  from 'react';
import { Text, View, Clipboard, TouchableOpacity, 
  Image
} from 'react-native';
import Container from '../utils/Container'
import styles from '../utils/Styles'

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

class ID extends Component{
  constructor(props){
    super(props)
    this.state = {copied: false}
  }

  copyToClipboard = async () => {
    Clipboard.setString(this.props.accountId);
    this.setState({copied: true});
    setTimeout(() => {
      this.setState({copied: false})
    }, 1500);
  }

  render(){
    console.log(this.state)
    return (
      <View style={{flex:1}}>
        <Container>
          <View style={[styles.section]}>
            <Text style={[styles.sectionTitle]}>
              Account ID
            </Text>
            <View style={[{flexDirection: "row", justifyContent: "space-between"}]}>
              <View style={{width:"80%"}}>
                <Text>{this.props.accountId}</Text>
              </View>
              <View style={{width:"10%"}}>
                <TouchableOpacity
                  onPress = { this.copyToClipboard }
                >
                  <Icon size={25} name={'content-copy'}/>
                </TouchableOpacity>                
              </View>
            </View>          
          </View>
          <View>
            <Image 
              style={{height: 256}}             
              source={{uri: "https://chart.googleapis.com/chart?chl=GAL2KXOLC4ZW4HBHYHVKTQXYI6LNQZMH6I4MM7NGTVNQFU4P7ISC4WDF&cht=qr&chs=256x256"}}
            />
          </View>
        </Container>
        {this.state.copied && <Text style={styles.copied}>Copied to Clipboard!</Text>}
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    accountId: state.accountReducer.accountId
  };
}
export default connect(mapStateToProps)(ID);
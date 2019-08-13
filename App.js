/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Server, Network } from 'stellar-sdk';

class Account extends Component {

  componentDidMount(){
    server.accounts().accountId("GAL2KXOLC4ZW4HBHYHVKTQXYI6LNQZMH6I4MM7NGTVNQFU4P7ISC4WDF")
    .call().then((data)=>{
      this.setState({account: data}) ;
      console.log("Then Bueno");
      console.log(data);
    }, (error)=>{
      console.log("Then Error");
      console.log(error);
    }).catch((error)=>{
      console.log("Catch");
      console.log(error);
    }).finally(()=>{
      console.log("Finally");
    }) ;  
  }

  //state object
  state = { account: null };

  render() {
    if (this.state.account){
      return (
        <Text>{this.state.account.id}</Text>
      );
    }
    return <Text>Cargando...</Text>
  }
}

const server = new Server('https://horizon-testnet.stellar.org');
Network.usePublicNetwork();

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    // backgroundColor: Colors.white,
    backgroundColor: Platform.select({
      ios: "red",
      android: Colors.white
    }),
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default class App extends Component{
  render(){
    return (
      <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Account />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
    );
  }
}

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
  Colors
} from 'react-native/Libraries/NewAppScreen';

import Account from './src/account.js'
import Header from './src/header.js'
import Transactions from "./src/transactions.js"

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    // backgroundColor: Colors.white,
    backgroundColor: Platform.select({
      ios: Colors.white,
      android: Colors.white
    }),
  },
  sectionContainer: {
    marginTop: 15,
    paddingHorizontal: 10,
  }
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
              <Transactions />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
    );
  }
}

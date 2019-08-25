import React, {Fragment} from "react";
import {
  ScrollView,
  View,
} from 'react-native';
import styles from "./Styles";

function Container(props){
  return (
    <Fragment>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            {props.children}
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
}

export default Container;
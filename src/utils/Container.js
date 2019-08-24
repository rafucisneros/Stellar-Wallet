import React, {Fragment} from "react";
import {
  ScrollView,
  View,
} from 'react-native';
import Styles from "./Styles";

function Container(props){
  return (
    <Fragment>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={Styles.styles.scrollView}>
        <View style={Styles.styles.body}>
          <View style={Styles.styles.sectionContainer}>
            {props.children}
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
}

export default Container;
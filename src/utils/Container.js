import React, {Fragment} from "react";
import { ScrollView, View } from 'react-native';
import styles from "./Styles";

function Container(props){
  return (
    <Fragment>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.sectionContainer}>
          {props.children}
        </View>
      </ScrollView>
    </Fragment>
  );
}
export default Container;
import React, {Fragment, Component } from "react";
import { ScrollView, View, RefreshControl 
} from 'react-native';
import styles from "./Styles";

class Container extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <Fragment>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          refreshControl={
            <RefreshControl 
              refreshing = { this.props.refreshing ? this.props.refreshing: null } 
              onRefresh = { this.props.onRefresh ? this.props.onRefresh : null} />
          } 
        >
          <View style={styles.sectionContainer}>
            {this.props.children}
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}
export default Container;
import React, {Component} from 'react';
import { Toolbar } from 'react-native-material-ui';

class Header extends Component{

  openMenu = () => { 
    console.log(this)
    // this.props.navigation.toggleDrawer(); 
  }

  render() {
    return (
      <Toolbar
        leftElement="menu"
        centerElement="Stellar"
        rightElement={{
            menu: {
                icon: "more-vert",
                labels: ["Set Inflation", "Trustlines", "Remove Account"]
            }
        }}
        onRightElementPress={ (label) => { console.log(label) }}
        onLeftElementPress={this.openMenu}
      />
    )
  }

}

export default Header;
import React, {Component} from 'react';
import { Toolbar } from 'react-native-material-ui';

class Header extends Component{

  render() {
    return (
      <Toolbar
        leftElement="menu"
        centerElement="Stellar"
        rightElement={{
            menu: {
                icon: "more-vert",
                labels: ["item 1", "item 2"]
            }
        }}
        onRightElementPress={ (label) => { console.log(label) }}
      />
    )
  }

}

export default Header;
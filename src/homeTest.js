import React, {Component} from 'react';

import Account from './account';
import Transactions from './transactions';
import Container from './utils/Container';
import Header from './header';

class HomeTest extends Component{
  render(){
    return (
      <Container>
        <Account />
        <Transactions />
        <Account />
        <Transactions />
        <Account />
        <Transactions />
      </Container>
    );
  }
}

export default HomeTest;
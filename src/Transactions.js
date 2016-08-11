import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

import { getTransactions } from './api';
import TransactionsList from './TransactionsList';

class Transactions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };

    getTransactions()
      .then(transactions => this.setState({
        loading: false,
        transactions
      }));
  }


  render() {
    return this.state.loading
      ? <Text>loading</Text>
      : <TransactionsList transactions={this.state.transactions}/>
  }
}

export default Transactions;

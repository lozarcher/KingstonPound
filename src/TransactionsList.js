import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View,
  Image,
  TextInput,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    backgroundColor: '#eee'
  }
});

import {getTransactions} from './api';


class TransactionsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.transactionNumber !== r2.transactionNumber
    });

    getTransactions()
      .then(transactions => this.setState({
        loading: false,
        page: 1,
        dataSource: this.ds.cloneWithRows(transactions),
        transactions
      }));
  }

  _renderRow(transaction) {
    return (
      <View style={{height: 50, flexDirection: 'row', margin: 5}}>
        { transaction.accountOwner.image ? <Image style={styles.image} source={{uri: transaction.accountOwner.image.url}}/> : <View style={styles.image} /> }
        <Text style={{fontSize: 20, alignSelf: 'center', marginLeft: 10}}>{transaction.accountOwner.name}</Text>
      </View>
    );
  }

  _loadMore() {
    const nextPage = this.state.page + 1;
    getTransactions(nextPage)
      .then(transactions => {
        const mergedTransactions = [...this.state.transactions, ...transactions];
        this.setState({
          loading: false,
          page: nextPage,
          dataSource: this.ds.cloneWithRows(mergedTransactions),
          transactions: mergedTransactions
        });
      });
  }

  _renderFooter() {
    return (
      <TouchableHighlight onPress={() => this._loadMore()}>
        <View>
          <Text>Load more ...</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return this.state.loading
      ? <Text>Loading ...</Text>
      : <ListView
          style={{flex: 1, marginBottom: 20}}
          pageSize={10}
          dataSource={this.state.dataSource}
          renderFooter={this._renderFooter.bind(this)}
          renderRow={this._renderRow.bind(this)}/>
  }
}

export default TransactionsList;

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

import GiftedListView  from 'react-native-gifted-listview';

import {getTransactions} from './api';

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    backgroundColor: '#eee'
  }
});

class TransactionsList extends Component {

  constructor(props) {
    super(props);
  }

  _onFetch(page = 1, callback, options) {
    getTransactions()
      .then(transactions => callback(transactions));
  }

  _renderRowView(transaction) {
    return (
      <View style={{height: 70, flexDirection: 'row'}}>
        { transaction.accountOwner.image ? <Image style={styles.image} source={{uri: transaction.accountOwner.image.url}}/> : <View style={styles.image} /> }
        <Text style={{fontSize: 20}}>{transaction.accountOwner.name}</Text>
      </View>
    );
  }

  render() {
    return (
      <GiftedListView
        rowView={this._renderRowView}
        onFetch={this._onFetch}
        firstLoader={true} // display a loader for the first fetching
        pagination={true} // enable infinite scrolling using touch to load more
        withSections={false} // enable sections
        refreshable={false}
        customStyles={{
          paginationView: {
            backgroundColor: '#eee',
          },
        }}
        refreshableTintColor="blue"
      />
    )
  }
}

export default TransactionsList;

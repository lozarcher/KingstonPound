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

import dateFormat from 'dateformat';

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 10
  }
});

import {getTransactions, getAccount} from './api';

const defaultTextStyle = {
  fontFamily: 'HelveticaNeue-Light',
  fontSize: 18
};

const DefaultText = ({ style, children, ...otherProps }) =>
  <Text style={Object.assign({}, defaultTextStyle, style)} {...otherProps}>
    {children}
  </Text>

const groupTransactions = (transactions) => {
  transactions = transactions.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
  let grouped = {};
  let sectionIdentities = [];
  transactions.forEach((transaction) => {
    const category = dateFormat(new Date(transaction.dateTime), 'mmmm dS, yyyy');
    if (sectionIdentities.indexOf(category) === -1) {
      grouped[category] = [];
      sectionIdentities.push(category);
    }
    grouped[category].push(transaction);
  });
  return {grouped, sectionIdentities};
}

class TransactionsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loadingTransactions: true,
      transaction: {},
      dataSource: new ListView.DataSource({
        rowHasChanged: (a, b) => a.transactionNumber === b.transactionNumber,
        sectionHeaderHasChanged: (a, b) => a == b
      })
    };

    getAccount()
      .then(account => console.log(account));

    getTransactions()
      .then(transactions => {
          const grouped = groupTransactions(transactions);
          this.setState({
            loadingTransactions: false,
            page: 1,
            dataSource: this.state.dataSource.cloneWithRowsAndSections(grouped.grouped, grouped.sectionIdentities),
            transactions
          })
      });
  }

  _renderRow(transaction) {
    const priceComponents = Math.abs(transaction.amount).toFixed(2).split('.');
    const isCredit = transaction.amount > 0;
    const color = isCredit ? '#484' : 'black';
    return (
      <View style={{flexDirection: 'row', margin: 8, alignItems: 'center'}}>
        { transaction.accountOwner.image ? <Image style={styles.image} source={{uri: transaction.accountOwner.image.url}}/> : <View style={styles.image} /> }
        <DefaultText style={{marginLeft: 10}}>{transaction.accountOwner.name}</DefaultText>
        <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
          <DefaultText style={{fontSize: 25, color}}>{(isCredit ? '+' : '') + priceComponents[0]}</DefaultText>
          <DefaultText style={{fontSize: 15, alignSelf: 'flex-end', marginBottom: 3, color}}>.{priceComponents[1]}</DefaultText>
        </View>
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

  _renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={{height: 40, backgroundColor: '#efefef', flexDirection: 'row', borderBottomColor:'#ddd', borderBottomWidth: 1, borderTopColor:'#ddd', borderTopWidth: 1}}>
        <DefaultText style={{fontSize: 15, fontWeight: 'bold', marginLeft: 8, alignSelf:'center'}}>{sectionID}</DefaultText>
      </View>
    )
  }

  _renderSeparator() {
    return <View style={{marginLeft: 8, marginRight: 8, borderBottomColor:'#ddd', borderBottomWidth: 1}}/>
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
    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor: '#1480ba', flexDirection: 'row'}}>
          <View style={{margin: 10, padding: 5, backgroundColor: '#34a0da', flex: 1}}>
            <DefaultText style={{color: 'white', fontSize: 30}}>£23.56</DefaultText>
            <DefaultText style={{color: '#ddd', fontSize: 15}}>Your account</DefaultText>
          </View>
          <View style={{margin: 10, padding: 5, backgroundColor: '#34a0da', flex: 1, alignItems: 'flex-end'}}>
            <DefaultText style={{color: 'white', fontSize: 30}}>£0</DefaultText>
            <DefaultText style={{color: '#ddd', fontSize: 15}}>Spent today</DefaultText>
          </View>
        </View>
        {this.state.loadingTransactions
        ? <Text>Loading ...</Text>
        : <ListView
            style={{flex: 1, marginBottom: 20}}
            pageSize={10}
            dataSource={this.state.dataSource}
            renderSeparator={this._renderSeparator}
            renderSectionHeader={this._renderSectionHeader}
            renderFooter={this._renderFooter.bind(this)}
            renderRow={this._renderRow.bind(this)}/>}
      </View>
    );
  }
}

export default TransactionsList;

import React, { Component } from 'react'
import { StyleSheet, ListView, View, Image, ActivityIndicator, TouchableHighlight } from 'react-native'
import dateFormat from 'dateformat'
import DefaultText from './DefaultText'
import Price from './Price'
import {getTransactions, getAccount} from './api'
import merge from './merge'
import BalanceHeader from './BalanceHeader'

const borderColor = '#ddd'
const marginSize = 8

const styles = {
  image: {
    width: 40,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 10,
    borderColor: borderColor,
    borderWidth: 1
  },
  rowContainer: {
    flexDirection: 'row',
    margin: marginSize,
    alignItems: 'center'
  },
  sectionBorder: {
    borderBottomColor: borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: borderColor,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  section: {
    height: 40,
    backgroundColor: '#efefef',
    flexDirection: 'row'
  },
  separator: {
    marginLeft: marginSize,
    marginRight: marginSize,
    borderBottomColor: borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 8,
    alignSelf:'center'
  }
}

const groupTransactions = (transactions) => {
  transactions = transactions.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
  let grouped = {}
  let sectionIdentities = []
  transactions.forEach((transaction) => {
    const category = dateFormat(new Date(transaction.dateTime), 'mmmm dS, yyyy')
    if (sectionIdentities.indexOf(category) === -1) {
      grouped[category] = []
      sectionIdentities.push(category)
    }
    grouped[category].push(transaction)
  })
  return {grouped, sectionIdentities}
}

class TransactionsList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loadingTransactions: true,
      loadingMoreTransactions: false,
      loadingBalance: true,
      transaction: {},
      dataSource: new ListView.DataSource({
        rowHasChanged: (a, b) => a.transactionNumber === b.transactionNumber,
        sectionHeaderHasChanged: (a, b) => a == b
      })
    }

    getAccount()
      .then(account => this.setState({
        balance: account.balance,
        loadingBalance: false
      }))

    getTransactions()
      .then(transactions => {
          const grouped = groupTransactions(transactions)
          this.setState({
            loadingTransactions: false,
            page: 1,
            dataSource: this.state.dataSource.cloneWithRowsAndSections(grouped.grouped, grouped.sectionIdentities),
            transactions
          })
      })
  }

  _renderRow(transaction) {
    return (
      <View style={styles.rowContainer} key={transaction.transactionNumber}>
        { transaction.accountOwner.image ? <Image style={styles.image} source={{uri: transaction.accountOwner.image.url}}/> : <View style={styles.image} /> }
        <DefaultText style={{marginLeft: 10}}>{transaction.accountOwner.name}</DefaultText>
        <Price price={transaction.amount}/>
      </View>
    )
  }

  _loadMore() {
    const nextPage = this.state.page + 1
    this.setState({
      loadingMoreTransactions: true
    })
    getTransactions(nextPage)
      .then(transactions => {
        const mergedTransactions = [...this.state.transactions, ...transactions]
        const grouped = groupTransactions(mergedTransactions)
        this.setState({
          loading: false,
          page: nextPage,
          dataSource: this.state.dataSource.cloneWithRowsAndSections(grouped.grouped, grouped.sectionIdentities),
          transactions: mergedTransactions,
          loadingMoreTransactions: false
        })
      })
  }

  _renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={merge(styles.section, styles.sectionBorder)} ke={sectionID}>
        <DefaultText style={styles.sectionHeader}>
          {sectionID}
        </DefaultText>
      </View>
    )
  }

  _renderSeparator() {
    return <View style={styles.separator}/>
  }

  _renderFooter() {
    const enabled = !this.state.loadingMoreTransactions
    return enabled
      ? <TouchableHighlight onPress={() => this._loadMore()}>
          <View style={merge(styles.section, styles.sectionBorder)}>
            <DefaultText style={merge(styles.sectionHeader, {color: '#1480ba'})}>Load more ...</DefaultText>
          </View>
        </TouchableHighlight>
      : <View style={merge(styles.section, styles.sectionBorder, {justifyContent: 'center'})}>
          <ActivityIndicator/>
        </View>
  }

  render() {
    return (
      <View style={{flex:1}}>
        <BalanceHeader balance={this.state.balance} loadingBalance={this.state.loadingBalance}/>
        {this.state.loadingTransactions
          ? <ActivityIndicator size='large' style={{flex: 1}}/>
          : <ListView
              style={{flex: 1, marginBottom: 20}}
              pageSize={10}
              dataSource={this.state.dataSource}
              renderSeparator={this._renderSeparator}
              renderSectionHeader={this._renderSectionHeader}
              renderFooter={this._renderFooter.bind(this)}
              renderRow={this._renderRow.bind(this)}/>}
      </View>
    )
  }
}

export default TransactionsList

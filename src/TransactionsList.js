import React, { Component } from 'react'
import { StyleSheet, Text, ListView, View, Image, ActivityIndicator, TouchableHighlight } from 'react-native'
import dateFormat from 'dateformat'
import DefaultText from './DefaultText'
import {getTransactions, getAccount} from './api'

const borderColor = '#ddd'
const marginSize = 8

const Price = ({prefix, price, color, size}) => {
  const priceComponents = Math.abs(price).toFixed(2).split('.')
  const isCredit = price > 0
  size = size || 25
  const smallFontSize = size * 0.7
  const margin = size * 0.08
  color = color ? color : (isCredit ? '#484' : 'black')
  prefix = prefix || (isCredit ? '+' : '')
  return (
    <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
      <DefaultText style={{fontSize: smallFontSize, alignSelf: 'flex-end', marginBottom: margin, color}}>{prefix}</DefaultText>
      <DefaultText style={{fontSize: size, alignSelf: 'flex-end', color}}>{priceComponents[0]}</DefaultText>
      <DefaultText style={{fontSize: smallFontSize, alignSelf: 'flex-end', marginBottom: margin, color}}>.{priceComponents[1]}</DefaultText>
    </View>
  )
}

const merge = (...args) => Object.assign({}, ...args)

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
      <View style={styles.rowContainer}>
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
      <View style={merge(styles.section, styles.sectionBorder)}>
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
        <View style={{backgroundColor: '#1480ba', flexDirection: 'row'}}>
          <View style={{margin: 10, padding: 5, backgroundColor: '#34a0da', flex: 1, alignItems: 'flex-start'}}>
            <Price price={this.state.loadingBalance ? 0 : this.state.balance} prefix='£' color='white' size={35}/>
            <DefaultText style={{color: '#ddd', fontSize: 15}}>Your account</DefaultText>
          </View>
          <View style={{margin: 10, padding: 5, backgroundColor: '#34a0da', flex: 1, alignItems: 'flex-end'}}>
            <Price price={0} prefix='£' color='white' size={35}/>
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
    )
  }
}

export default TransactionsList

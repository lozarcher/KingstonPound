import React from 'react'
import { View, ListView } from 'react-native'
import DefaultText from '../DefaultText'
import styles from './ProfileStyle'
import commonStyle from '../style'
import TransactionItem from './TransactionItem'

/** Specialisation of  a ListView rendering rows of transactions.
 *
 * @param props
 * @constructor
 */
const TransactionList = (props) =>
  <ListView
    renderHeader={props.renderHeader}
    dataSource={props.dataSource}
    renderRow={props.renderRow || TransactionItem}
    renderSeparator={renderSeparator}
    renderSectionHeader={renderSectionHeader}/>

const renderSeparator = (sectionID, rowID) =>
  <View style={styles.list.separator} key={`sep:${sectionID}:${rowID}`}/>

const renderSectionHeader = (sectionData, sectionID) =>
  <View style={commonStyle.sectionHeader.container} key={sectionID}>
    <DefaultText style={commonStyle.sectionHeader.text}>
      {sectionID}
    </DefaultText>
  </View>

export default TransactionList

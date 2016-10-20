import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../store/reducer/navigation'
import styles from './profileScreen/ProfileStyle'
import ProfileScreen from './profileScreen/ProfileScreen'
import BusinessDetails from './businessDetails/BusinessDetails'
import { View } from 'react-native'
import SendMoney from './sendMoney/SendMoney'
import { buildDataSourceForTransactions } from '../util/transaction'

/**
 Where
    trader: selectedBusiness
    dataSource: for trader transactions
    showTraderScreen: callback for opening or closing this view.
 */
const TraderScreen = ({ trader, transactionsDataSource, showTraderScreen  }) =>
    <View style={{flex: 1}}>
        <ProfileScreen
            loaded={trader.profilePopulated}
            image={trader.image}
            category={'shop'}
            defaultImage={!Boolean(trader.image)}
            name={trader.display}
            username={trader.shortDisplay}
            renderHeaderExtension={renderHeaderExtension(trader, transactionsDataSource)}
            dataSource={transactionsDataSource}
            onPressClose={() => showTraderScreen(false)}
            onPressExpand={()=> showTraderScreen(false)}
        />
        <View style={styles.footer}>
            <SendMoney
                payeeDisplay={trader.name}
                payeeShortDisplay={trader.shortDisplay}/>
        </View>
    </View>

const renderHeaderExtension = (trader, transactionsDataSource) => () =>
    <View style={styles.dropshadow}>
        <BusinessDetails business={trader} isExpanded={transactionsDataSource.getRowCount() === 0}/>
    </View>

// filter the transaction list to contain only those relating to this trader
const dataSourceForSelectedBusiness = (state) => {
  const transactions = state.transaction.transactions.filter(transaction =>
      transaction.relatedAccount.kind === 'user' && transaction.relatedAccount.user.id === state.business.selectedBusinessId)

  return buildDataSourceForTransactions(transactions)
}

// Redux Setup
const mapStateToProps = (state) => ({
    trader: state.business.businessList.find(b => b.id === state.business.selectedBusinessId),
    transactionsDataSource: dataSourceForSelectedBusiness(state)
})


const mapDispatchToProps = (dispatch) =>
  bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TraderScreen)

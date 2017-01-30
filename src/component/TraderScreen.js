import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Dimensions } from 'react-native'
import * as actions from '../store/reducer/navigation'
import TransactionList from './profileScreen/TransactionList'
import ProfileHeader from './profileScreen/ProfileHeader'
import BusinessDetails from './businessDetails/BusinessDetails'
import { sectionHeight } from './SendMoney'
import { resetForm } from '../store/reducer/sendMoney'
import { goToLocation } from '../store/reducer/navigation'
import merge from '../util/merge'

const TraderScreen = (props) =>
  <View style={{flex: 1}}>
    <View style={{flex: 1, maxHeight: Dimensions.get('window').height - sectionHeight}}>
    <TransactionList
      renderHeader={renderHeader(props)}
      listData={props.transactions} />
    </View>
  </View>

// Currently we pass in returned renderHeader as we delegate to a listView.
// One alternative would be to encapsulate this and use `props.children` instead.
const renderHeader = ({trader, hideModal, resetForm, goToLocation, modalOpen}) => () => {
  let goToTraderLocation
  if (trader.address && trader.address.location) {
    goToTraderLocation = () =>
      goToLocation(merge(trader.address.location, { latitudeDelta: 0.006, longitudeDelta: 0.006 }))
  }
  return (
    <View style={{flex: 1}}>
      <ProfileHeader
        name={trader.display}
        username={trader.shortDisplay}
        image={trader.image}
        category={trader.category}
        address={trader.address}
        onPressClose={() => {hideModal(); resetForm()}}
        isModal={true}
        showMap={modalOpen}
        goToLocation={goToTraderLocation}/>
        <BusinessDetails business={trader} goToLocation={goToTraderLocation}/>
    </View>
  )
}



const getTransactionsForSelectedBusiness = (state) => {
  return state.transaction.transactions.filter(transaction => {
    return transaction.relatedAccount.kind === 'user' && transaction.relatedAccount.user.id === state.business.traderScreenBusinessId
  })
}

// Redux Setup
const mapStateToProps = (state) => ({
    trader: state.business.businessList.find(b => b.id === state.business.traderScreenBusinessId) || {},
    transactions: getTransactionsForSelectedBusiness(state),
    modalOpen: state.navigation.modalOpen
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...actions, resetForm, goToLocation }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TraderScreen)

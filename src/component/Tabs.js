import React from 'react'
import { View, StatusBar, TouchableHighlight, Modal } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../store/reducer/navigation'
import { resetForm } from '../store/reducer/login'

import TabBar from './tabbar/TabBar'
import SearchTab from './SearchTab'
import NetworkConnection from './NetworkConnection'
import TransactionList from './spending/TransactionList'
import Account from './Account'
import LoginToView from './LoginToView'
import Login from './Login'
import TraderScreen from './traderScreen/TraderScreen'
import DeveloperOptions from './DeveloperOptions'
import color from '../util/colors'
import merge from '../util/merge'

const style = {
  container: {
    backgroundColor: color.offBlack,
    flex: 1
  },
  tabs: {
    flex: 1,
    backgroundColor: 'white'
  },
  flex: {
    flex: 1
  },
  backgroundView: {
    margin: 20,
    opacity: 0.5
  }
}

const Tabs = (props) => {
  const content = <View style={merge(style.flex, props.dialogOpen ? {margin: 20} : {})}>
    <StatusBar barStyle='light-content'/>
    <ScrollableTabView
        renderTabBar={() => <TabBar/>}
        tabBarPosition='bottom'
        initialPage={props.navigation.tabIndex}
        tabBarActiveTextColor={color.bristolBlue}
        style={style.tabs}
        tabBarBackgroundColor={color.lightGray}
        scrollWithoutAnimation={true}
        locked={true}
        onChangeTab={({i}) => props.navigateToTab(i)}
        tabBarUnderlineColor={color.transparent}>
      <SearchTab tabLabel='Search'/>
      { props.loggedIn
        ? <TransactionList tabLabel='Spending'/>
        : <LoginToView tabLabel='Log in'/> }
      { props.loggedIn
        ? <Account tabLabel='Account' />
        : <DeveloperOptions tabLabel='Developer Options'/> }
    </ScrollableTabView>
    <NetworkConnection/>
    <Modal
      animationType={'slide'}
      transparent={false}
      onRequestClose={() => props.showTraderScreen(false)}
      visible={props.navigation.traderScreenVisible && !props.navigation.sendMoneyVisible}>
      <TraderScreen/>
    </Modal>
  </View>

  return <View style={style.container}>
    {props.dialogOpen
      ? <TouchableHighlight
            style={merge(style.flex, style.backgroundView)}
            onPress={() => props.resetForm()}
            underlayColor={color.transparent}>
          {content}
        </TouchableHighlight>
      : content}
    <Login />
  </View>
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({...actions, resetForm}, dispatch)

const mapStateToProps = (state) => ({
  navigation: state.navigation,
  loggedIn: state.login.loggedIn,
  status: state.status,
  dialogOpen: state.login.open
})

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)

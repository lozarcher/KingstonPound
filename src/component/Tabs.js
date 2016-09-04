import React from 'react'
import { View, StatusBar, Text, TouchableHighlight, Modal } from 'react-native'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../store/reducer/navigation'

import Business from './Business'
import TransactionsList from './TransactionsList'
import SendMoney from './SendMoney'
import Login from './Login'
import color from '../util/colors'

const style = {
  container: {
    backgroundColor: color.bristolBlue,
    flex: 1
  },
  tabs: {
    marginTop: 20,
    flex: 1,
    backgroundColor: 'white'
  },
  flexRow: {
    flexDirection: 'row'
  },
  flex: {
    flex: 1
  },
  banner: {
    position: 'absolute',
    top:0,
    height: 60,
    left: 0,
    right: 0,
    backgroundColor: color.lightGray,
    paddingTop: 30,
    paddingLeft: 10
  }
}

const TabBar = ({sendMoney, ...otherProps}) =>
  <View style={style.flexRow}>
    <DefaultTabBar {...otherProps} style={style.flex}/>
    <TouchableHighlight onPress={() => sendMoney()} style={style.flexRow}>
      <Text style={{alignSelf: 'center'}}>Send Money</Text>
    </TouchableHighlight>
  </View>

const Tabs = (props) =>
  <View style={style.container}>
    <StatusBar barStyle='light-content'/>
    <ScrollableTabView
        renderTabBar={() => <TabBar sendMoney={props.showSendMoney}/>}
        tabBarPosition='bottom'
        initialPage={props.navigation.tabIndex}
        tabBarActiveTextColor={color.bristolBlue}
        style={style.tabs}
        tabBarBackgroundColor={color.lightGray}
        scrollWithoutAnimation={true}
        locked={true}
        onChangeTab={({i}) => props.navigateToTab(i)}
        tabBarUnderlineColor={color.transparent}>
      <Business tabLabel='Directory'/>
      { props.loggedIn
        ? <TransactionsList tabLabel='Transactions'/>
        : <Login tabLabel='Transactions'/> }
    </ScrollableTabView>
    { props.status.networkConnection
      ? null
      : <View style={style.banner}>
          <Text>Network connection issues, some features won't work</Text>
        </View> }
    <Modal
      animationType={'slide'}
      transparent={false}
      onRequestClose={() => props.showSendMoney(false)}
      visible={props.navigation.sendMoneyVisible}>
      <SendMoney cancel={() => props.showSendMoney(false)}/>
    </Modal>
  </View>

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(actions, dispatch)

const mapStateToProps = (state) => ({
  navigation: state.navigation,
  loggedIn: state.login.loggedIn,
  status: state.status
})

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)

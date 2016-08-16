import React from 'react'
import { Navigator } from 'react-native'
import BusinessList from './BusinessList'
import BusinessDetails from './BusinessDetails'
import { connect } from 'react-redux'

const Business = (props) =>
  <Navigator
    initialRoute={{ id: 'BusinessList' }}
    renderScene={(route, navigator) => {
      if (route.id === 'BusinessList') {
        return <BusinessList business={props.business} navigator={navigator}/>
      } else {
        return <BusinessDetails business={route.business} navigator={navigator}/>
      }
    }}
  />

const mapStateToProps = (state) => ({business: state.business})

export default connect(mapStateToProps)(Business)

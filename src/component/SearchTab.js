import React from 'react'
import { View, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BackgroundMap from './BackgroundMap'
import BusinessList from './BusinessList'
import * as actions from '../store/reducer/business'

const ROW_HEIGHT = 71
const VISIBLE_ROWS = 3
const SEARCH_BAR_HEIGHT = 50
const MARGIN_SIZE = 20

const style = {
  businessList: {
    position: 'absolute',
    top: MARGIN_SIZE + SEARCH_BAR_HEIGHT,
    left: MARGIN_SIZE,
    right: MARGIN_SIZE,
    bottom: MARGIN_SIZE
  },
  searchBar: {
    height: SEARCH_BAR_HEIGHT,
    margin: MARGIN_SIZE,
    backgroundColor: 'white'
  }
}

const computeHeight = (dataSource) =>
  Math.min(VISIBLE_ROWS, dataSource.getRowCount()) * ROW_HEIGHT

const SearchTab = (props) =>
  <View style={{flex: 1}}>
    <BackgroundMap/>
    <TextInput style={style.searchBar}
        onFocus={() => props.expandBusinessList(true)}
        onBlur={() => props.expandBusinessList(false)}/>
    <BusinessList
        compactHeight={computeHeight(props.business.dataSource)}
        expandOnScroll={props.business.dataSource.getRowCount() > VISIBLE_ROWS}
        style={style.businessList}/>
  </View>

const mapStateToProps = (state) => ({business: state.business})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchTab)

import React from 'react'
import { View, TextInput, TouchableOpacity, Image } from 'react-native'
import _ from 'lodash'
import haversine from 'haversine'

import DefaultText from '../DefaultText'
import BusinessListItem from './BusinessListItem'
import { Button } from '../common/Button'
import DraggableList from './DraggableList'
import ComponentList from './ComponentList'
import FiltersComponent from './FiltersComponent'

import { tabModes } from '../../store/reducer/business'
import FixedScrollableList from './FixedScrollableList'
import colors from '../../util/colors'
import { addColorCodes, getBusinessName } from '../../util/business'
import searchTabStyle, { maxExpandedHeight, SEARCH_BAR_HEIGHT, SEARCH_BAR_MARGIN } from './SearchTabStyle'
import { ROW_HEIGHT } from './BusinessListStyle'

const { searchBar, textInput, searchHeaderText, closeButton, expandPanel, nearbyButton, fixedScrollableListContainer } = searchTabStyle.searchTab

const CLOSE_BUTTON = require('../common/assets/Close.png')
const FILTER_BUTTON = require('./assets/filters.png')
const FILTER_DISABLED_BUTTON = require('./assets/filters_disabled.png')
const NEARBY_BLUE = require('./assets/nearby_blue.png')
const NEARBY_GREY = require('./assets/nearby_grey.png')

const MAX_LIST_LENGTH = 50

const ComponentForItem = (item) => {
  if (typeof item === 'string') {
    return  <DefaultText style={searchHeaderText}>
                { item }
            </DefaultText>
  }
  return <BusinessListItem business={item}/>
}

export default class Search extends React.Component {
    constructor(props) {
      super(props)
      this.state = { searchTerms: [], componentListArray: [], input: null }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.tabMode !== tabModes.search && this.props.tabMode === tabModes.search) {
        this.refs.textInput.blur()
        this.setState({ searchTerms: [], input: null, componentListArray: [] })
      }
    }

    updateResults = (allBusinesses = this.props.allBusinesses) => {
      const termsMatch = (field) => {
        let match = true
        this.state.searchTerms.forEach((term) => {
          if (match && field.toLowerCase().indexOf(term.toLowerCase()) === -1) {
            match = false
          }
        })
        return match
      }
      this.refs.ExpandPanel && this.refs.ExpandPanel.resetToInitalState()
      console.log(allBusinesses)
      const filteredBusinessList = this.state.searchTerms.length
      ? _.filter(allBusinesses, business => termsMatch(getBusinessName(business)) || termsMatch(business.fields.username.value))
      : []
      const componentListArray = this.createComponentListArray(filteredBusinessList)
      this.setState({ componentListArray })
    }

    debouncedUpdate = _.debounce(() => this.updateResults(), 800)

    _onChangeText(input) {
      this.setState({ searchTerms: input ? input.split(' ') : [], input: input || null })
      this.debouncedUpdate()
    }

    _businessListOnClick(item) {
      console.log(item)
      this.refs.textInput.blur()
      this.props.openTraderModal(item.id)
    }

    nearbyButtonEnabled() {
      return this.props.geolocationStatus && haversine(this.props.geolocationStatus, this.props.mapViewport) > 0.1 //km
    }

    nearbyButtonPressed() {
      if (this.nearbyButtonEnabled()) {
        const { latitude, longitude } = this.props.geolocationStatus
        this.props.moveMap({ latitude, longitude })
      }
    }

    createComponentListArray(list) {
      const cropped = list.length > MAX_LIST_LENGTH
      const matches = list.length
      if (cropped) {
        list.length = MAX_LIST_LENGTH
      }
      const coloredList = addColorCodes(list)
      const makePressable = (itemProps) => {
        itemProps.pressable = true
        return itemProps
      }
      const array = this.state.input == null ? [ ...coloredList.map(makePressable) ] : [ `${matches} TRADER MATCHES`, ...coloredList.map(makePressable) ]
      if (cropped) {
        array.push(`${matches - MAX_LIST_LENGTH} ADDITIONAL RESULTS NOT DISPLAYED`)
      }
      return array
    }

    render() {
      const { componentListArray, input } = this.state
      const { tabMode, updateTabMode } = this.props

      const childrenHeight = componentListArray.length * ROW_HEIGHT

      const { componentList } = this.refs

      let button
      if (tabMode===tabModes.search) {
        button = <Button
                    onPress={() => updateTabMode(tabModes.default)}
                    buttonType={CLOSE_BUTTON}
                    style={closeButton}
                    size={SEARCH_BAR_HEIGHT}
                />
      } else if (tabMode===tabModes.default) {
        button = <Button
                    onPress={() => updateTabMode(tabModes.filter)}
                    buttonType={FILTER_DISABLED_BUTTON}
                    style={closeButton}
                    size={SEARCH_BAR_HEIGHT}
                />
      } else if (tabMode===tabModes.filter) {
        button = <Button
                    onPress={() => updateTabMode(tabModes.default)}
                    buttonType={FILTER_BUTTON}
                    style={closeButton}
                    size={SEARCH_BAR_HEIGHT}
                />
      }

      return (
        <View>
          { tabMode === tabModes.search && (
                <FixedScrollableList
                    style={fixedScrollableListContainer}
                    items={componentListArray}
                    componentForItem={ComponentForItem}
                    onPress={(item) => this._businessListOnClick(item)}>
                </FixedScrollableList>
          )}
          { tabMode === tabModes.filter &&
                  <FiltersComponent
                    activeFilters={this.props.activeFilters}
                    removeFilter={this.props.removeFilter}
                    addFilter={this.props.addFilter}
                  />}
          <View style={searchBar}>
            <TouchableOpacity style={nearbyButton}
                onPress={() => this.nearbyButtonPressed()}>
              <Image source={this.nearbyButtonEnabled() ? NEARBY_BLUE : NEARBY_GREY}/>
            </TouchableOpacity>
            <TextInput accessibilityLabel='Search'
                       ref='textInput'
                       onFocus={() => tabMode!==tabModes.search && updateTabMode(tabModes.search)}
                       onChangeText={(text) => this._onChangeText(text)}
                       placeholder={'Search Trader'}
                       placeholderTextColor={colors.gray4}
                       selectTextOnFocus={true}
                       style={textInput}
                       value={input}
                       underlineColorAndroid={colors.transparent}/>
          {button}
          </View>
        </View>
      )
    }
}

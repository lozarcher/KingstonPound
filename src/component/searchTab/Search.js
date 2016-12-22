import React from 'react'
import { View, TextInput, TouchableHighlight } from 'react-native'
import _ from 'lodash'

import DefaultText from '../DefaultText'
import BusinessListItem from './BusinessListItem'
import { CloseButton } from '../common/CloseButton'
import ScrollingExpandPanel from './ScrollingExpandPanel'
import ComponentList from './ComponentList'

import colors from '../../util/colors'
import merge from '../../util/merge'
import searchTabStyle, { maxExpandedHeight, SEARCH_BAR_HEIGHT, SEARCH_BAR_MARGIN } from './SearchTabStyle'
import { ROW_HEIGHT } from './BusinessListStyle'

const { searchBar, textInput, searchHeaderText, closeButton, clearTextButton, clearTextButtonText, expandPanel } = searchTabStyle.searchTab

const CLOSE_BUTTON = require('./../common/assets/Close.png')

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
      this.state = { searchTerm: null, componentListArray: [] }
    }

    debouncedUpdate = _.debounce((searchTerm) => {
      const { businessList } = this.props
      this.refs.ExpandPanel && this.refs.ExpandPanel.resetToInitalState()
      const filteredBusinessList = businessList.filter(business =>
                  business.display.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
      const componentListArray = this.createComponentListArray(filteredBusinessList)
      this.setState({ componentListArray })
    }, 800)

    _onChangeText(searchTerm) {
      this.setState({ searchTerm: searchTerm || null })
      this.debouncedUpdate(searchTerm)
    }

    _closeButtonClick() {
      this.props.updateSearchMode(false)
      this.refs.textInput.blur()
      this.resetState()
    }

    _businessListOnClick(id) {
      this.refs.textInput.blur()
      this.props.openTraderModal(id)
    }

    _clearText() {
      this.resetState()
    }

    resetState() {
      this.setState({ searchTerm: null })
    }

    createComponentListArray(list) {
      const cropped = list.length > MAX_LIST_LENGTH
      const matches = list.length
      if (cropped) {
        list.length = MAX_LIST_LENGTH
      }
      const makePressable = (itemProps) => ({...itemProps, pressable: true})
      const array = [ `${matches} TRADER MATCHES`, ...list.map(makePressable) ]
      if (cropped) {
        array.push(`${matches - MAX_LIST_LENGTH} ADDITIONAL RESULTS NOT DISPLAYED`)
      }
      return array
    }

    render() {
      const { searchTerm, componentListArray } = this.state
      const { searchMode, openTraderModal, updateSearchMode } = this.props

      const childrenHeight = componentListArray.length * ROW_HEIGHT

      const { componentList } = this.refs

      return (
        <View>
          <View style={searchBar}>
            <TextInput accessibilityLabel='Search'
                       ref='textInput'
                       onFocus={() => !searchMode && updateSearchMode(true)}
                       onChangeText={(text) => this._onChangeText(text)}
                       placeholder={'Search Trader'}
                       placeholderTextColor={colors.gray4}
                       selectTextOnFocus={true}
                       style={textInput}
                       value={searchTerm} />
            { searchMode && searchTerm &&
                <TouchableHighlight style={clearTextButton} onPress={() => this._clearText()}>
                  <DefaultText style={clearTextButtonText}>x</DefaultText>
                </TouchableHighlight> }
            { searchMode &&
                <CloseButton onPress={() => this._closeButtonClick()} closeButtonType={CLOSE_BUTTON} style={closeButton} size={SEARCH_BAR_HEIGHT}/> }
          </View>
          { searchMode && (
                  <ScrollingExpandPanel style={expandPanel}
                                        ref='ExpandPanel'
                                        topOffset={[ SEARCH_BAR_HEIGHT + SEARCH_BAR_MARGIN ]}
                                        expandedHeight={maxExpandedHeight}
                                        childrenHeight={childrenHeight}
                                        startPosition={0}
                                        onPressRelease={hasMoved => componentList && componentList.handleRelease(hasMoved)}
                                        onPressStart={location => componentList && componentList.highlightItem(location)}>
                      <ComponentList
                          ref='componentList'
                          items={componentListArray}
                          componentForItem={ComponentForItem}
                          onPressItem={index => componentListArray[index].id && openTraderModal(componentListArray[index].id)} />
                  </ScrollingExpandPanel>
          )}
        </View>
      )
    }
}

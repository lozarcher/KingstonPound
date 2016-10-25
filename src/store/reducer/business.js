import { ListView } from 'react-native'
import haversine from 'haversine'
import _ from 'lodash'
import moment from 'moment'
import merge from '../../util/merge'
import { addFailedAction } from './networkConnection'
import { getBusinesses, getBusinessProfile } from '../../api/users'

const DEFAULT_LOCATION =  { latitude: 51.454513, longitude:  -2.58791 }

const initialState = {
  businessList: [],
  businessListTimestamp: null,
  businessListExpanded: false,
  selectedBusinessId: undefined,
  selectedMarker: undefined,
  dataSource: new ListView.DataSource({
    rowHasChanged: (a, b) => a.shortDisplay !== b.shortDisplay,
    sectionHeaderHasChanged: (a, b) => a !== b
  }),
  mapViewport: {
    ...DEFAULT_LOCATION,
    latitudeDelta: 0.006,
    longitudeDelta: 0.006
  },
  searchMode: false
}

export const selectMarker = (businessId) => ({
  type: 'business/SELECT_MARKER',
  businessId
})

export const expandBusinessList = (expand) => ({
  type: 'business/EXPAND_BUSINESS_LIST',
  expand
})

export const businessListReceived = (businessList) => ({
  type: 'business/BUSINESS_LIST_RECEIVED',
  businessList
})

export const businessProfileReceived = (businessProfile) => ({
  type: 'business/BUSINESS_PROFILE_RECEIVED',
  businessProfile
})

export const updateMapViewport = (viewport) => ({
  type: 'business/UPDATE_MAP_VIEWPORT',
  viewport
})

const selectBusiness = (businessId) => (dispatch) =>
  dispatch({
    type: 'business/SELECTED_BUSINESS',
    businessId
  })

export const resetBusinesses = () => ({
  type: 'business/RESET_BUSINESSES',
})

export const selectAndLoadBusiness = (businessId) =>
  (dispatch, getState) => {
    dispatch(selectBusiness(businessId))
    const businessList = getState().business.businessList
    const business = businessList.find(b => b.id === businessId)
    if (!business.profilePopulated) {
      getBusinessProfile(businessId, dispatch)
        .then(businessProfile => dispatch(businessProfileReceived(businessProfile)))
        // if this request fails, the modal trader screen will continue to show a spinner
        // but will be closeable
        .catch(console.warn)
    }
  }

export const loadBusinessList = (force = false) =>
  (dispatch, getState) => {
    const persistedDate = getState().business.businessListTimestamp
    if (Date.now() - persistedDate > moment.duration(2, 'days') || force) {
      getBusinesses(dispatch)
        .then(businesses => dispatch(businessListReceived(businesses)))
        // if this request fails, the business list may not be populated. In this case, when
        // connection status changes to be connected, the list is re-fetched
        .catch(err => {
          dispatch(addFailedAction(loadBusinessList(force)))
          console.warn(err)
        })
    }
  }

const distanceFromPosition = (position) => (business) =>
  business.address ? haversine(position, business.address.location) : Number.MAX_VALUE

const isWithinViewport = (position) => (business) =>
  business.address &&
  Math.abs(business.address.location.latitude - position.latitude) < position.latitudeDelta / 2 &&
  Math.abs(business.address.location.longitude - position.longitude) < position.longitudeDelta / 2

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'business/BUSINESS_LIST_RECEIVED':
      const sortedBusiness = _.sortBy(action.businessList, distanceFromPosition(state.mapViewport))
      const filteredBusiness = sortedBusiness.filter(isWithinViewport(state.mapViewport))
      state = merge(state, {
        dataSource: state.dataSource.cloneWithRows(filteredBusiness),
        businessList: action.businessList,
        businessListTimestamp: new Date()
      })
      break
    case 'business/BUSINESS_PROFILE_RECEIVED':
      const index  = _.findIndex(state.businessList, {id: action.businessProfile.id})

      let additionalFields = {}
      if (action.businessProfile.customValues) {
        additionalFields = _.fromPairs(
          _.map(action.businessProfile.customValues, fieldEntry => [
            fieldEntry.field.internalName,
            fieldEntry.stringValue
          ])// shape: list of 2-element lists ([[name, value],[name1, value1], ...])
        ) // turns into object from key-value pairs ({name:value, name1:value1})
      }

      const updatedBusiness = merge(
        state.businessList[index],
        {profilePopulated: true},
        action.businessProfile,
        additionalFields
      )
      const newBusinessList = [
        ..._.slice(state.businessList, 0, index),
        updatedBusiness,
        ..._.slice(state.businessList, index + 1)
      ]
      state = merge(state, {
        businessList: newBusinessList
      })
      break
    case 'business/UPDATE_MAP_VIEWPORT':
      const newViewport = merge(state.mapViewport, action.viewport)//action.viewport might only be partial (no deltas)
      const sorted = _.sortBy(state.businessList, distanceFromPosition(newViewport))
      const filtered = sorted.filter(isWithinViewport(newViewport))
      state = merge(state, {
        dataSource: state.dataSource.cloneWithRows(filtered),
        mapViewport: newViewport,
      })
      break
    case 'business/EXPAND_BUSINESS_LIST':
      state = merge(state, {
        businessListExpanded: action.expand
      })
      break
    case 'business/SELECTED_BUSINESS':
      state = merge(state, {
        selectedBusinessId: action.businessId
      })
      break
    case 'business/RESET_BUSINESSES':
      state = merge(state, {
        businessList: [],
        businessListTimestamp: null,
        businessListExpanded: false,
        dataSource: state.dataSource.cloneWithRows([]),
      })
      break
    case 'business/SELECT_MARKER':
      state = merge(state, {
        selectedMarker: action.businessId
      })
  }
  return state
}

export default reducer

import React from 'react'
import MapView from 'react-native-maps'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet } from 'react-native'
import _ from 'lodash'
import * as actions from '../../store/reducer/business'
import colors from '../../util/colors'

const MAP_PAN_DEBOUNCE_DURATION = 50

class BackgroundMap extends React.Component {
  constructor() {
    super()

    this.skipNextLocationUpdate = false
  }

  updateViewport(...args) {
    this.skipNextLocationUpdate = true
    this.props.updateMapViewport(...args)
  }

  selectMarker(id, location) {
    this.props.selectMarker(id)
    this.updateViewport(location)
  }
  render() {
    // on Android devices, if you update the region to the current location while panning
    // the UI becomes 'jumpy'. For this reason, this 'hack' is used to ensure that
    // location updates arising from dragging the map are suppressed.
    const region = this.skipNextLocationUpdate ? undefined : this.props.mapViewport
    this.skipNextLocationUpdate = false

    return (
      <MapView style={{...StyleSheet.absoluteFillObject}}
          region={region}
          showsUserLocation={true}
          onRegionChange={_.debounce(this.updateViewport.bind(this), MAP_PAN_DEBOUNCE_DURATION)}>
        {this.props.businessList
          ? this.props.businessList.filter(b => b.address)
              .map(b =>
                <MapView.Marker
                  key={b.id}
                  coordinate={b.address.location}
                  onPress={() => { this.selectMarker(b.id, b.address.location) }} // THIS IS ONLY WORKING ON ANDROID: https://github.com/airbnb/react-native-maps/issues/286
                  onSelect={() => { this.selectMarker(b.id, b.address.location) }} // THIS ONLY WORKS ON iOS
                  pinColor={this.props.selectedMarker === b.id ? colors.bristolBlue : colors.gray}
                  />
              )
          : undefined}
      </MapView>
    )
  }
}


const mapStateToProps = (state) => ({
  ...state.business
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundMap)

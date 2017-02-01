import React from 'react'
import { View, Image, Dimensions, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps'
import DefaultText from '../DefaultText'
import ProfileImage from '../profileImage/ProfileImage'
import styles from './ProfileStyle'
import merge from '../../util/merge'
import MapMarker from '../searchTab/MapMarker'

import  { CloseButton } from '../common/CloseButton'

const closeButton = require('./../common/assets/Close.png')
const expandIcon = require('./assets/Expand.png')

const screenWidth = Dimensions.get('window').width,
  screenHeight = Dimensions.get('window').height

const renderCloseButton = (onPress) =>
  <CloseButton style={styles.header.closeButton} onPress={onPress} closeButtonType={closeButton} size={70}/>

const renderExpandButton = (goToLocation) => {
  if (!goToLocation) {
    return undefined
  }
  return <TouchableOpacity onPress={goToLocation} style={styles.header.expandButton}>
    <Image source={expandIcon} style={styles.header.expandIcon}/>
  </TouchableOpacity>
}


const renderButtonBar = (props) => {
  if (!props.isModal) {
    return undefined
  }
  // Each button is doubled because they disappear on android (RN issue #12060)
  return (
    <View style={styles.header.buttonBar}>
      {renderCloseButton(props.onPressClose)}
      {renderCloseButton(props.onPressClose)}
      {props.address && props.address.location && renderExpandButton(props.goToLocation)}
      {props.address && props.address.location && renderExpandButton(props.goToLocation)}
    </View>
  )
}

const getMapRegion = (location) => ({
  latitude: location.latitude + 0.00038,
  longitude: location.longitude,
  latitudeDelta: 0.001,
  longitudeDelta: 0.0003
})

const renderBackground = (props) => {
  if (props.address && props.address.location) {
    return (
      props.showMap
      ? <MapView style={styles.header.backgroundImage}
            region={getMapRegion(props.address.location)}
            showsPointsOfInterest={false}
            showsUserLocation={false}
            showsCompass={false}
            rotateEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}
            onPress={props.goToLocation}>
          <MapMarker key='marker' coordinate={props.address.location} selected={true} />
        </MapView>
      : <View style={styles.header.backgroundImage} />
    )
  }
  return (
    <Image source={require('./assets/gorillaWithBackground.png')}
        style={styles.header.backgroundImage}
        resizeMode='cover' />
  )
}

const ProfileHeader = (props) => {
  const getSubtitleStyle = () => {
    return props.paymentComplete ? styles.header.subtitle : merge(styles.header.subtitle, {marginBottom: 46})
  }

  return (
    <View style={{ width: screenWidth, height: props.paymentComplete ? screenHeight / 2 - 45 : 248 }}>
      {!props.paymentComplete && renderBackground(props)}
      {renderButtonBar(props)}
      <View style={{ alignItems: 'center' }}>
        <ProfileImage
          image={props.image && {uri: props.image.url}}
          style={styles.header.businessLogo}
          category={props.category}
          colorCode={0} />
        <DefaultText style={styles.header.title}>{props.name}</DefaultText>
        <DefaultText style={getSubtitleStyle()}>{props.username}</DefaultText>
      </View>
    </View>
  )
}

export default ProfileHeader

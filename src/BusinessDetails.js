import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, MapView, Image } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'

const PRALLAX_HEIGHT = 200

const styles = StyleSheet.create({
  fullSize: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0
  },
  image: {
    height: 150,
    width: 150,
    marginTop: -40,
    alignSelf: 'center'
  },
  title: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 25
  }
})

const BusinessDetails = props =>
  <ParallaxScrollView
      backgroundColor='white'
      contentBackgroundColor='#eee'
      parallaxHeaderHeight={PRALLAX_HEIGHT}
      renderBackground={() => (
        <View style={{height: PRALLAX_HEIGHT}}>
          <MapView
                style={styles.fullSize}
                showsUserLocation={true}
                region={{
                  latitude: props.business.location.latitude,
                  longitude: props.business.location.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005
                }}
                annotations={[{
                  longitude: props.business.location.longitude,
                  latitude: props.business.location.latitude
                }]}>
              </MapView>
        </View>
      )}>
      <View style={{ height: 500 }}>
        <TouchableHighlight onPress={() => props.navigator.pop()}
            underlayColor='transparent'>
          <Image style={styles.image} source={{uri: props.business.image.url}}/>
        </TouchableHighlight>
        <Text style={styles.title}>{props.business.name}</Text>
      </View>
    </ParallaxScrollView>

export default BusinessDetails

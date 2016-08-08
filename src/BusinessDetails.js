import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  MapView
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    flex: 1
  },
  fullSize: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0
  },
  message: {
    backgroundColor: '#333333',
    flex: 1,
    borderBottomColor: 'red',
    borderBottomWidth: 4
  }
});

const BusinessDetails = props =>
    <View style={styles.container}>
      <TouchableHighlight onPress={() => props.navigator.pop()}
                  underlayColor='red'>
        <Text style={styles.title}>
          {props.business.name}
        </Text>
      </TouchableHighlight>
      <View style={styles.message}>
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
        <View style={styles.fullSize}>
        </View>
      </View>
      <View style={styles.message}>
      </View>
    </View>
export default BusinessDetails;

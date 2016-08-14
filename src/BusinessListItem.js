import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  title: {
    fontSize: 25,
    flex: 2.5
  },
  image: {
    backgroundColor: '#ddd',
    width: 60,
    height: 60
  },
  verticalStack: {
    flex: 2.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
    height: 60
  }
})

const BusinessListItem = props =>
  <TouchableHighlight onPress={() => props.businessClicked(props.business)}
            underlayColor='#dddddd'>
    <View style={styles.container}>
      { props.business.image ? <Image style={styles.image} source={{uri: props.business.image.url}}/> : <View style={styles.image}/> }
      <View style={styles.verticalStack}>
        <Text style={styles.title} numberOfLines={1}>
          {props.business.name}
        </Text>
        <Text>
          {props.business.userName}
        </Text>
      </View>
    </View>
  </TouchableHighlight>

export default BusinessListItem

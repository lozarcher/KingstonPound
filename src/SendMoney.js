import React from 'react'
import { View, TextInput, StyleSheet, TouchableHighlight } from 'react-native'
import DefaultText from './DefaultText'
import color from './colors'
import merge from './merge'

const style = {
  formGroup: {
    margin: 10,
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
    flexDirection: 'row'
  },
  label: {
    width: 40
  },
  textInput: {
    flex: 1,
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 18,
    marginLeft: 10
  },
  heading: {
    backgroundColor: color.bristolBlue,
    alignItems: 'center',
    padding: 10,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  headingText: {
    color: 'white',
    fontWeight: 'bold'
  },
  button: {
    position: 'absolute',
    width: 90
  },
  sendButton: {
    right: 5,
    alignItems: 'flex-end'
  },
  cancelButton: {
    left: 5
  },
  buttonText: {
    color: 'white'
  }
}

const SendMoney = (props) =>
  <View>
    <View style={style.heading}>
      <TouchableHighlight style={merge(style.cancelButton, style.button)} onPress={() => props.cancel()}>
        <View>
          <DefaultText style={style.buttonText}>Cancel</DefaultText>
        </View>
      </TouchableHighlight>
      <DefaultText style={style.headingText}>Send Money</DefaultText>
      <TouchableHighlight style={merge(style.sendButton, style.button)} onPress={() => console.log('hi')}>
        <View>
          <DefaultText style={style.buttonText}>Send</DefaultText>
        </View>
      </TouchableHighlight>
    </View>
    <View style={style.formGroup}>
      <DefaultText style={style.label}>To:</DefaultText>
      <TextInput style={style.textInput} placeholder='payee'></TextInput>
    </View>
    <View style={style.formGroup}>
      <DefaultText style={style.label}>£</DefaultText>
      <TextInput style={style.textInput} placeholder='amount' keyboardType='numeric'></TextInput>
    </View>
  </View>

export default SendMoney

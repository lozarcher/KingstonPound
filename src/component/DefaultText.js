import React, {Component} from 'react'
import { Text } from 'react-native'
import colors from '../util/colors'
import merge from '../util/merge'
import commonStyle from './style'

const style = {
  fontFamily: commonStyle.font.museo300,
  fontSize: 18,
  color: colors.offBlack,
  backgroundColor: colors.transparent
}

class DefaultText extends Component {
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps)
  }

  render(){
    const newStyle = merge(style, this.props.style)
    const defaultProps = {
      numberOfLines: 1,
      ellipsizeMode: 'tail'
    }
    return (
      <Text
          ref={component => this._root = component}
          {...merge(defaultProps, this.props, {style: newStyle})}>
        {this.props.children}
      </Text>
    )
  }
}

export default DefaultText

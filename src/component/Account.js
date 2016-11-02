import React from 'react'
import { connect } from 'react-redux'
import { View, TouchableHighlight, ListView } from 'react-native'

import DefaultText from './DefaultText'
import merge from './../util/merge'
import color from './../util/colors'
import ProfileScreen from './profileScreen/ProfileScreen'

const styles = {
  rowContainer: {
    flexDirection: 'row',
    margin: 14,
  },
  rowText: {
    marginHorizontal: 6
  }
}

const Account = props => {
  let ds = new ListView.DataSource({
    rowHasChanged: (a, b) => a.text !== b.text || a.secondaryText !== b.secondaryText,
    sectionHeaderHasChanged: (a, b) => a !== b
  })
  ds = ds.cloneWithRowsAndSections({
    'Profile Settings': [{
        text: 'Email',
        secondaryText: (props.details && props.details.email) || 'Not set'
      }, {
        text: 'Phone',
        secondaryText: (props.details && props.details.phones && props.details.phones.length > 0) ? props.details.phones[0].normalizedNumber : 'Not set'
      }, {
        text: 'Log out',
        onPress: props.logout
      }]
  }, ['Profile Settings'])

  return (
      <ProfileScreen
        isTabItem={true}
        loaded={!props.loadingDetails}
        image={props.details.image}
        category={'person'}
        defaultImage={!Boolean(props.details.image)}
        name={props.details.display}
        username={props.details.shortDisplay}
        renderHeaderExtension={() => null}
        dataSource={ds}
        renderRow={(accountOption, i) => <AccountOption {...accountOption} index={i}/> }
        />
  )
}

const AccountOption = ({text, secondaryText, onPress, index, disabled}) =>
  <TouchableHighlight
      onPress={() => onPress && !disabled ? onPress() : undefined}
      key={index}
      underlayColor={color.transparent}>
    <View style={styles.rowContainer}>
      <DefaultText style={merge(styles.rowText, { flex: 1 }, disabled ? {color: 'orange'}: {})}>{text}</DefaultText>
      { secondaryText
        ? <DefaultText style={merge(styles.rowText, { flex: 0 })}>{secondaryText}</DefaultText>
        : undefined }
    </View>
  </TouchableHighlight>

const mapStateToProps = state => {
  return state.account
}

export default connect(mapStateToProps)(Account)

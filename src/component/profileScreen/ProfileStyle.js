import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../util/colors'
import commonStyle, { dimensions, margin } from '../style'
import marginOffset from '../../util/marginOffset'

const headerMargin = 24
const listMargin = 14

const styles = {
  header: {
    container: {
      marginTop: marginOffset(0),
    },
    closeButton: {
      ...margin(40, 0, 0, headerMargin),
      position: 'absolute',
      zIndex: 100,
    },
    closeIcon: {
      ...dimensions(18),
      ...margin(10),
      marginLeft: 0
    },
    center: {
      alignItems: 'center',
    },
    expandIcon: {
      ...dimensions(16),
      ...margin(40, headerMargin, 0, 0)
    },
    businessLogo: {
      ...dimensions(84),
      marginTop: 58,
    },
    title: {
      fontFamily: commonStyle.font.museo500,
      marginTop: 8,
      fontSize: 20,
      color: colors.offBlack
    },
    subtitle: {
      marginBottom: 46,
      fontSize: 18,
      color: colors.gray
    },
    backgroundImage: {
      height: 242,
      width: Dimensions.get('window').width,
      position: 'absolute'
    },
  },
  list: {
    rowContainer: {
      ...margin(0, listMargin, 0, listMargin),
      flexDirection: 'row',
      justifyContent: 'center',
      height: 50
    },
    date: {
      width: 150,
      flex: 1,
      alignSelf: 'center',
      color: colors.offBlack
    },
    transactionNumber: {
      fontFamily: commonStyle.font.museo100,
      fontSize: 16,
      alignSelf: 'center',
      color: colors.gray
    },
    price: {
      flex: 1,
      width: 90,
      alignSelf: 'center'
    },
    separator: {
      marginLeft: listMargin,
      borderColor: colors.gray5,
      borderWidth: StyleSheet.hairlineWidth
    }
  },
  footer: {
    borderTopColor: colors.gray5,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.offWhite,
    flex: 1,
    flexDirection: 'column-reverse'
  },
}

export default styles

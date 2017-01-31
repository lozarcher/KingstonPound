import { View, Image, ScrollView } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeConfirmation } from '../store/reducer/navigation'
import { updatePage } from '../store/reducer/sendMoney'
import style from './PaymentConfirmationStyle'
import ProfileHeader from './profileScreen/ProfileHeader'
import DefaultText from './DefaultText'

const PaymentConfirmation = (props) => {

    const priceComponents = Math.abs(props.amountPaid).toFixed(2).split('.')
    const priceBeforeDecimal = !isNaN(priceComponents[0]) ? priceComponents[0] : '-'
    const priceAfterDecimal = !isNaN(priceComponents[1]) ? priceComponents[1] : '--'

    return (
      props.message
      ? <View style={style.container}>
        	<ScrollView contentContainerStyle={style.innerContainer}>
            <ProfileHeader
              name={props.payee.display}
              username={props.payee.shortDisplay}
              image={props.payee.image}
              category={props.payee.category}
              onPressClose={() => {props.closeConfirmation() && props.updatePage(0)}}
              isModal={true}
              paymentComplete={true} />
            {renderPrice(priceBeforeDecimal, priceAfterDecimal)}
            {renderDetails(props.transactionNumber, props.timestamp)}
          </ScrollView>
        </View>
      : null
    )
}

const renderPrice = (priceBeforeDecimal, priceAfterDecimal) =>
  <View style={style.priceContainer}>
    <View style={style.pricePoundLogoContainer}>
      <Image source={require('./common/assets/Shape.png')} style={style.pricePoundLogo} />
    </View>
    <DefaultText style={style.priceBeforeDecimal}>
        {priceBeforeDecimal}
    </DefaultText>
    <DefaultText style={style.priceAfterDecimal}>
        .{priceAfterDecimal}
    </DefaultText>
  </View>

const getDateOrTime = (timestamp, index) => {
  const res = timestamp.split(',')
  return res[index]
}

const renderDetails = (transactionNumber, timestamp) =>
  <View style={style.detailsContainer}>
    {renderSectionHeader()}
    {renderRow('Reference:', transactionNumber, true)}
    <View style={style.separator} />
    <View style={style.detailsInnerContainer}>
      {renderRow('Date:', getDateOrTime(timestamp, 0), false)}
      {renderRow('Time:', getDateOrTime(timestamp, 1), false)}
    </View>
  </View>

const renderRow = (title, data, reference) =>
  <View style={reference ? style.referenceContainer : style.rowContainer}>
    <DefaultText style={style.rowTitle}>{title}</DefaultText>
    <DefaultText style={style.rowData}>{data}</DefaultText>
  </View>

const renderSectionHeader = () =>
  <View style={style.sectionHeader.container}>
    <DefaultText style={style.sectionHeader.text}>
      Details
    </DefaultText>
  </View>

const mapStateToProps = (state) => ({
	payee: state.business.businessList.find(b => b.id === state.sendMoney.payeeId)
    || state.person.personList.find(p => p.id === state.sendMoney.payeeId)
    || {},
	message: state.sendMoney.message,
	amountPaid: state.sendMoney.amountPaid,
  timestamp: state.sendMoney.timestamp,
  transactionNumber: state.sendMoney.transactionNumber
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ closeConfirmation, updatePage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PaymentConfirmation)

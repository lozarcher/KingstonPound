import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, TextInput, TouchableOpacity, Dimensions, Animated, Image } from 'react-native'
import KeyboardComponent from './KeyboardComponent'
import * as actions from '../store/reducer/sendMoney'
import { openLoginForm, LOGIN_STATUSES } from '../store/reducer/login'
import merge from '../util/merge'
import DefaultText from './DefaultText'
import color from '../util/colors'
import { setOverlayOpen } from '../store/reducer/navigation'
import { dimensions, border } from '../util/StyleUtils'
import commonStyle from './style'
import Price from './Price'

const Page = {
  Ready: 0,
  EnterAmount: 1,
  MakingPayment: 2,
  PaymentComplete: 3,
}

const { width } = Dimensions.get('window')
export const sectionHeight = 68

const styles = {
  button: {
    height: sectionHeight,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    ...dimensions(width, sectionHeight),
    padding: 10,
    textAlign: 'center'
  },
  balanceContainer: {
    ...border(['bottom'], color.gray5, 1),
    backgroundColor: color.offWhite,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.transparent,
    justifyContent: 'flex-end'
  }
}

const BalanceMessage = ({ balance }) => {
  return (
    <View style={styles.balanceContainer}>
      <DefaultText style={commonStyle.sectionHeader.text}>CURRENT BALANCE</DefaultText>
      <View style={styles.priceContainer}>
        <Image source={require('./tabbar/assets/balance_symbol.png')}/>
        <Price prefix=''
            price={balance}
            size={30}
            color={color.bristolBlue}/>
      </View>
    </View>
  )
}

class InputComponent extends KeyboardComponent {
  getButtonColor() {
    if (this.props.invalidInput) {
      return color.offWhite
    }
    return color.bristolBlue
  }

  getButtonTextColor() {
    return this.getButtonColor() === color.offWhite ? 'black' : 'white'
  }

  // To fix issue #636
  componentWillReceiveProps(nextProps) {
    if (nextProps.accessibilityLabel === 'Payment complete') {
      this.keyboardDidHide()
    }
  }

  render() {
    let { onButtonPress, buttonText, input, invalidInput, accessibilityLabel, balance } = this.props

    const button = <View style={merge(styles.button, { backgroundColor: this.getButtonColor() })}>
      <DefaultText style={{fontSize: 24, color: this.getButtonTextColor(), textAlign: 'center', width: Dimensions.get('window').width - 20}}>
        {buttonText}
      </DefaultText>
    </View>

    return <Animated.View style={{backgroundColor: 'white', bottom: input ? this.state.keyboardHeight : 0}} accessibilityLabel={accessibilityLabel}>

      {accessibilityLabel === 'Payment complete'
        ? button
        : <TouchableOpacity onPress={invalidInput ? undefined : onButtonPress}>
            {button}
          </TouchableOpacity>}

      {input
        ? <View>
            <TextInput style={styles.textInput}
                {...input}
                autoFocus={true}
                accessibilityLabel={input.placeholder} />
            <BalanceMessage balance={balance}/>
          </View>
        : undefined}

    </Animated.View>
  }
}

class SendMoney extends React.Component {

  constructor() {
    super()
  }

  nextPage() {
    const nextPage = (this.props.inputPage + 1) % Object.keys(Page).length
    this.props.updatePage(nextPage)
    if (nextPage === Page.EnterAmount) {
      this.props.setOverlayOpen(true)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.businessId !== prevProps.businessId) {
      this.props.updateAmount('')
      this.props.updatePage(Page.Ready)
    } else if (prevProps.loading && !this.props.loading && this.props.inputPage === 2) {
      this.nextPage()
    }
  }

  isInputInvalid() {
    const { amount } = this.props
    return (
      isNaN(Number(this.props.amount))
        || Number(amount) > this.props.balance
        || Number(amount) <= 0
        || (amount.charAt(0) === '0' && amount.charAt(1) !== '.')
        || amount.charAt(amount.length - 1) === '.'
        || (amount.split('.')[1] && amount.split('.')[1].length > 2)
    )
  }

  render() {
    let inputProps

    if (this.props.connection) {
      if (this.props.inputPage === Page.PaymentComplete) {
        inputProps = {
          buttonText: this.props.message,
          onButtonPress: () => {},
          accessibilityLabel: 'Payment complete'
        }
      } else if (this.props.loggedIn) {
        switch (this.props.inputPage){
          case Page.Ready: // Initial state, ready to begin
            inputProps = {
              buttonText: 'Send Payment',
              onButtonPress: () => { this.props.updatePayee(this.props.trader.shortDisplay); this.nextPage() },
              accessibilityLabel: 'Ready',
            }
            break
          case Page.EnterAmount: // provide amount
            inputProps = {
              buttonText: 'Pay ' + this.props.trader.display,
              onButtonPress: () => { this.props.sendTransaction(); this.nextPage() },
              input: {
                keyboardType: 'numeric',
                value: this.props.amount,
                placeholder: 'Amount',
                onChangeText: amt => this.props.updateAmount(amt),
              },
              invalidInput: this.isInputInvalid(),
              accessibilityLabel: 'Enter Amount',
              balance: this.props.balance
            }
            break
          case Page.MakingPayment: // in progress
            inputProps = {
              buttonText: 'Making Payment',
              loading: true,
              accessibilityLabel: 'Making Payment',
            }
            break
        }
      } else {
        inputProps = {
          buttonText: 'Log in to make payment',
          onButtonPress: () => this.props.openLoginForm(true),
          accessibilityLabel: 'Log in to make payment',
        }
      }
    } else {
      inputProps = {
        buttonText: 'No internet connection',
        accessibilityLabel: 'No internet connection',
      }
    }

    return <InputComponent {...inputProps} />
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...actions, openLoginForm, setOverlayOpen }, dispatch)

const mapStateToProps = (state) => ({
  ...state.sendMoney,
  businessId: state.business.traderScreenBusinessId,
  trader: state.business.businessList.find(b => b.id === state.business.traderScreenBusinessId) || {},
  balance: state.account.balance,
  loggedIn: state.login.loginStatus === LOGIN_STATUSES.LOGGED_IN,
  connection: state.networkConnection.status
})

export default connect(mapStateToProps, mapDispatchToProps)(SendMoney)

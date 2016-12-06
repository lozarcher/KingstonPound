import React from 'react'
import Tabs from './Tabs'
import { View } from 'react-native'
import ReturningLogin from './login/ReturningLogin'
import Onboarding from './login/Onboarding'
import { mainComponent } from '../store/reducer/navigation'
import { connect } from 'react-redux'
import Login from './login/Login'
import LoginOverlay from './login/LoginOverlay'
import StatusMessage from './StatusMessage'

const Root = (props) => {
  // The app is rendered before the state has been loaded via redux-persist. This state property allows
  // the main 'app' UI to be hidden until initialised.
  if (!props.stateInitialised) {
    return (
      // TODO: style as part of the splash screen
      <View style={{flex: 1}}/>
    )
  }
  let bodyComponent
  if (props.mainComponent === mainComponent.returningLogin) {
    bodyComponent = <ReturningLogin />
  } else if (props.mainComponent === mainComponent.onboarding) {
    bodyComponent = <Onboarding />
  } else if (props.mainComponent === mainComponent.tabs){
    bodyComponent = <Tabs />
  } else {
    throw new Error('Invalid navigation state')
  }

  return (
    <View style={{flex: 1}}>
      {bodyComponent}
      <LoginOverlay/>
      <Login hideUsernameInput={props.mainComponent === mainComponent.returningLogin}/>
      <StatusMessage/>
    </View>
  )
}

const mapStateToProps = (state) => ({
    ...state.navigation
})

export default connect(mapStateToProps)(Root)

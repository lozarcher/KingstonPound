//./test/components/Android/login_commands.js
var bottomBar = require('./bottom_bar_locators')
var loginElems = require('./login_locators')
var accountScreen = require ('./account_screen_locators')

module.exports = {
  // Note: in previous versions testmember/testing123 were written by default in the app.
  // As of v0.0.11 the input fields are blank, so probably this function could be simplified
  login: function (username, password) {
    // Use cases: call Login without arguments, or with a user and password (strings)
    // Check that the username and password arguments are strings
    // - If they are, use them in the login process
    // - If they are not, use the prepopulated fields
    if ( typeof username === 'string' && typeof password === 'string') {
      return this.clickButton(bottomBar.loginButton)
      .clickInput(loginElems.usernameInput)
      .clearInput(loginElems.usernameInput)
      .keys(username)
      .clickInput(loginElems.passwordInput)
      .clearInput(loginElems.passwordInput)
      .keys(password)
      .clickButton(loginElems.loginButton)
    } else {
      return this.clickButton(bottomBar.loginButton)
      .clickButton(loginElems.loginButton)
    }
  },

  loginResult: function () {
    // If the login is successful, a button with the text "Logged in" is displayed briefly
    return this.isExisting(loginElems.loggedInButton)
  },

  logout: function () {
    // In order to logout, we need to click on the "Account Screen" button, followed by the "Log out" button
    // Make sure the result of the login has disappeared first - not sure if this is the best approach (what happens if the login fails?)
    return this.waitForExist(loginElems.loggedInButton, 10000, true)
    .clickButton(bottomBar.accountButton)
    .clickButton(accountScreen.logoutButton)
  }

}

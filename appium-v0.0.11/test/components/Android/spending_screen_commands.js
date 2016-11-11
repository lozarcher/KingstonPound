//./test/components/Android/spending_screen_commands.js
var bottomBar = require('./bottom_bar_locators')
var loginElems = require('./login_locators')
var spendingScreen = require ('./spending_screen_locators')
var testmember_transactions = require('../../../mock_data/transactions/testmember_dev.json')   // Data retrieved from the Dev API using curl
var traders = require('../../../mock_data/traders/trader_list_dev.json')
//const WAIT_TIMEOUT = 20000

module.exports = {
  goToSpendingScreen: function() {
    return this.waitForExist(loginElems.loggedInButton, 10000, true)  // We need to make sure the "Logged in" button is not in the way
    .clickButton(bottomBar.spendingButton)
  },

  // Todo .. add more functions to use the mock data and compare transactions there with transactions on the screen


}

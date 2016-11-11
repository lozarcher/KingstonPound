/*global describe, beforeEach, afterEach, it, before*/
// Path: ./test/specs/Android/spending_screen_tests.js

var webdriverio = require('webdriverio')
var options = require('../../../config/Android/devices')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

// Actions from Page Objects
var loginActions = require('../../components/Android/login_commands')
var devOpActions = require('../../components/Android/dev_options_commands')
var spendingActions = require('../../components/Android/spending_screen_commands')
// Helper functions
var buttonHelpers = require('../../helpers/common/button_helpers')
var inputHelpers = require('../../helpers/Android/input_helpers')
var genericHelpers = require('../../helpers/Android/generic_helpers')

chai.use(chaiAsPromised)
chai.should()               // Use should for assertions

const device = 'android6B'
var client = webdriverio.remote(options[device])

chaiAsPromised.transferPromiseness = client.transferPromiseness

describe('Tests on the Spending screen for device ' + device, function () {

    // Set the timeout of the suite to 10 minutes
    this.timeout(600000)

    // Extend the functionality of client before running any tests - done only once
    before(function() {
        client.addCommand('clickButton', buttonHelpers.clickButton)
        client.addCommand('longPressButton', buttonHelpers.longPressButton)
        client.addCommand('deleteChars', inputHelpers.deleteChars)
        client.addCommand('clearInput', inputHelpers.clearInput)
        client.addCommand('clickInput', inputHelpers.clickInput)
        client.addCommand('getElementId', genericHelpers.getElementId)
        client.addCommand('switchServer', devOpActions.switchServer)
        client.addCommand('goToSpendingScreen', spendingActions.goToSpendingScreen)
        client.addCommand('login', loginActions.login)
        return client.addCommand('loginResult', loginActions.loginResult)
    })

    beforeEach(function () {
        return client.init()
    })

    // This test is incomplete -- the idea is to generate a json file from the backend
    // and then use it to compare the transactions displayed in the App
    it.skip('should check the transactions done this month from user testmember on Dev', function() {
      return client//.switchServer('Dev')               // Switching server is pending a locator of the X button
      .login('testmember', 'testing123')
      .loginResult().should.eventually.be.true
      .goToSpendingScreen()
      // Work in progress
      .pause(10000)

    })

    afterEach(function () {
        return client.end()
    })
})

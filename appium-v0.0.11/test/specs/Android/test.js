/*global describe, beforeEach, afterEach, it, before*/
// Path: ./test/specs/Android/test.js

var webdriverio = require('webdriverio')
var options = require('../../../config/Android/devices')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

// Actions from Page Objects
var loginActions = require('../../components/Android/login_commands')
var phoneActions = require('../../components/Android/phone_commands')
// Helper functions
var buttonHelpers = require('../../helpers/common/button_helpers')
var inputHelpers = require('../../helpers/Android/input_helpers')

chai.use(chaiAsPromised)
chai.should()               // Use should for assertions

const device = 'android6B'
var client = webdriverio.remote(options[device])

chaiAsPromised.transferPromiseness = client.transferPromiseness

describe('Simple tests on ' + device, function () {

    // Set the timeout of the suite to 10 minutes
    this.timeout(600000)

    // Extend the functionality of client before running any tests - done only once
    before(function() {
        client.addCommand('clickButton', buttonHelpers.clickButton)
        client.addCommand('deleteChars', inputHelpers.deleteChars)
        client.addCommand('clearInput', inputHelpers.clearInput)
        client.addCommand('clickInput', inputHelpers.clickInput)
        client.addCommand('getInitialSettings', phoneActions.getInitialSettings)
        client.addCommand('login', loginActions.login)
        client.addCommand('logout', loginActions.logout)
        return client.addCommand('loginResult', loginActions.loginResult)
    })

    beforeEach(function () {
        return client.init()
    })

    // This test is not working as of v0.0.11. It was used to check a few settings on the phone
    // Ideally we'd want the assertions to appear here rather than in the command/helper files
    it.skip('should open the App and confirm initial device settings are correct for running the tests', function() {
        console.log('Current device: ' + device)
        return client.getInitialSettings().should.eventually.be.true
    })

    // This test should work on v0.0.11. Requirement: be logged out.
    // Testmember exists both in Dev and Prod
    it('should login with user testmember and then logout', function() {
        return client.login('testmember', 'testing123')
        .loginResult().should.eventually.be.true.then(function() {
            return this.logout()
        })
    })

    // This test should work on v0.0.11. Requirement: be on Prod logged out.
    it('should login to Prod with a different user and password, and then logout', function() {
        return client.login('grahamwoodruff', 'testing123')
        .loginResult().should.eventually.be.true.then(function() {
            return this.logout()
        })
    })

    // This test should work on v0.0.11. Requirement: be logged out.
    it('should fail to login to Prod with an invalid user and password', function() {
      return client.login('wronguser', 'wrongpassword')
      .loginResult().should.eventually.be.false
    })

    afterEach(function () {
        return client.end()
    })
})

// Notes:
// See https://discuss.appium.io/t/how-to-clear-a-pre-filled-text-field-android/1022/31 for issues clearing the EditText input boxes

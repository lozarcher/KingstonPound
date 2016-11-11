/*global describe, beforeEach, afterEach, it, before*/
// Path: ./test/specs/Android/login_tests.js

var webdriverio = require('webdriverio')
var options = require('../../../config/Android/devices')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

// Actions from Page Objects
var loginActions = require('../../components/Android/login_commands')
var devOpActions = require('../../components/Android/dev_options_commands')
// Helper functions
var buttonHelpers = require('../../helpers/common/button_helpers')
var inputHelpers = require('../../helpers/Android/input_helpers')
var genericHelpers = require('../../helpers/Android/generic_helpers')

chai.use(chaiAsPromised)
chai.should()               // Use should for assertions

const device = 'android6B'
var client = webdriverio.remote(options[device])

describe('Login tests on ' + device, function () {

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
      client.addCommand('login', loginActions.login)
      client.addCommand('logout', loginActions.logout)
      return client.addCommand('loginResult', loginActions.loginResult)
    })

    beforeEach(function () {
        return client.init()
    })

    // This test should work on v0.0.11. Requirements: be logged out and on Prod
    it.skip('should login correctly with all available users in Prod', function() {
      return client//.switchServer('Stage')         // switchServer is pending the locator for the X button
      .login('testmember', 'testing123')
      .loginResult().should.eventually.be.true.then(function() {
          return this.logout()
      })
      .login('grahamwoodruff', 'testing123')
      .loginResult().should.eventually.be.true.then(function() {
          return this.logout()
      })

    })

    // This test should work on v0.0.11. Requirements: be logged out and on Dev
    it('should login correctly with all available users in Dev', function() {
      return client//.switchServer('Dev')         // switchServer is pending the locator for the X button
      .login('testmember', 'testing123')
      .loginResult().should.eventually.be.true.then(function() {
          return this.logout()
      })
      .login('test1', 'testing123')
      .loginResult().should.eventually.be.true.then(function() {
          return this.logout()
      })
      .login('test2', 'testing123')
      .loginResult().should.eventually.be.true.then(function() {
          return this.logout()
      })
      .login('test3', 'testing123')
      .loginResult().should.eventually.be.true.then(function() {
          return this.logout()
      })
      .login('test4', 'testing123')
      .loginResult().should.eventually.be.true.then(function() {
          return this.logout()
      })
      .login('test5', 'testing123')
      .loginResult().should.eventually.be.true.then(function() {
          return this.logout()
      })
      .login('test6', 'testing123')
      .loginResult().should.eventually.be.true.then(function() {
          return this.logout()
      })
      .login('ftuser', 'testing123')
      .loginResult().should.eventually.be.true.then(function() {
          return this.logout()
      })
      .login('pshek', 'testing123')
      .loginResult().should.eventually.be.true.then(function() {
          return this.logout()
      })
      .login('ithake', 'testing123')
      .loginResult().should.eventually.be.true.then(function() {
          return this.logout()
      })
      .login('saberking', 'testing123')
      .loginResult().should.eventually.be.true.then(function() {
          return this.logout()
      })
    })

    afterEach(function () {
        return client.end()
    })
})

/*global describe, beforeEach, afterEach, it, before*/
// Path: ./test/specs/Android/search_screen_tests.js

var webdriverio = require('webdriverio')
var options = require('../../../config/Android/devices')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
//var expect = chai.expect

// Actions from Page Objects
var searchScreenCommands = require('../../components/Android/search_screen_commands')
// Helper functions
var buttonHelpers = require('../../helpers/common/button_helpers')
var mapHelpers = require('../../helpers/Android/map_helpers')
var genericHelpers = require('../../helpers/Android/generic_helpers')

chai.use(chaiAsPromised)
chai.should()               // Use should for assertions

const device = 'android6B'
var client = webdriverio.remote(options[device])

chaiAsPromised.transferPromiseness = client.transferPromiseness

describe('Tests on the Search screen for device ' + device, function () {

    // Set the timeout of the suite to 10 minutes
    this.timeout(600000)

    // Extend the functionality of client before running any tests - done only once
    before(function() {
        client.addCommand('getElementId', genericHelpers.getElementId)
        client.addCommand('tapMapMarker', searchScreenCommands.tapMapMarker)
        client.addCommand('getTraderName', searchScreenCommands.getTraderName)
        client.addCommand('zoomOut', mapHelpers.zoomOut)
        client.addCommand('zoomIn', mapHelpers.zoomIn)
        return client.addCommand('longPressButton', buttonHelpers.longPressButton)
    })

    beforeEach(function () {
        return client.init()
    })


    // This test should work on v0.0.11. Requirement: be on Prod and logged out.
    it('should update the Trader list when a Trader is selected on the map', function () {
      return client.getTraderName(0).should.eventually.have.a.property('value').that.is.equal('Clifton Wine School').then(function() {
          return this.tapMapMarker(1)
      })
      .pause(4000)    // Touch actions are not immediate, so we wait for 4 seconds for the map and Trader list to react
      .getTraderName(0).should.eventually.have.a.property('value').that.is.equal('Studio 7 Music Repairs')
    })

    // This test should work on v0.0.11. Requirement: be on Prod and logged out.
    // It just shows that the zoom out/in operations are working
    it('should perform zoom operations on the Search screen', function () {
      return client.zoomOut()
      .zoomIn()
    })

    afterEach(function () {
        return client.end()
    })
})




/*
// Requirement: Location Services must be on before running this test (there is no way of getting the current status)
it.skip('should center the map at the user\'s location when Location Services are enabled', function() {
  return client.waitForExist(searchScreen.myLocation, 20000)
  .getLocation(searchScreen.myLocation).then(function(location) {
    console.log(location) // Returns { x: 1096, y: 70 } on Android 5
    return this
  })
  .getElementSize(searchScreen.map).then(function(size) {
    console.log(size)  // Returns { width: 1200, height: 1684 } on Android 5
    return this
  })
  // I think these accesibility ids do not belong to the elements I expect -- maybe they have not been placed there by Ian
})
*/

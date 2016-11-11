//./test/components/Android/phone_commands.js

module.exports = {
  // This doesn't seem to be working on v0.0.11 -- think of a better way to test this kind of parameters
  // For example, return values to the spec file and let the assertion appear there
  getInitialSettings:  function () {
    return this.getCurrentDeviceActivity().should.eventually.become('.MainActivity')
    .getOrientation().should.eventually.become('portrait')
    .getDeviceTime().then(function(time) {
        console.log('Current device time: ' + time.value)
    })
    .getNetworkConnection().should.eventually.have.a.property('inAirplaneMode').that.is.false
    .getNetworkConnection().should.eventually.have.a.property('hasWifi').that.is.true
    .getNetworkConnection().should.eventually.have.a.property('hasData')
  }

}

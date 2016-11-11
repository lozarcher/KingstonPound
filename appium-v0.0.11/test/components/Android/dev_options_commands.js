//./test/components/Android/dev_options_commands.js
var devOptions = require ('./dev_options_locators')
var bottomBar = require('./bottom_bar_locators')

module.exports = {
  switchServer: function (server) {     // server is either "Stage" or "Dev"
    return this.longPressButton(bottomBar.accountButton).then(function() {
      // Only press Switch Server if we are not on the correct server already
      return this.waitForExist(devOptions.switchServer, 20000).then(function() {
        var b = this
        return b.getElementId(devOptions.switchServer).then(function() {
          b.elementIdText(devOptions.switchServer).then(function(text) {
            if (text.indexOf(server) >= 0) {       // The text is "Switch Server to [Stage/Dev]"
              return b.clickButton(devOptions.switchServer)
              .clickButton(devOptions.clearBData)
              .clickButton(devOptions.loadBData)
              .clickButton(devOptions.clearTData)     // Probably not need, but added just in case
              .clickButton(devOptions.closeDevOptions)  // This id has not been added yet
            } else {
              return b
            }
          })
        })
      })
    })
  }
}

//./test/helpers/Android/button_helpers.js
const WAIT_TIMEOUT = 20000                         // 20 secs to wait for elements to appear on screen
// These helpers should only be used with Android devices
module.exports = {
  deleteChars: function (numchars) {
    var b = this
    for (var i = 0; i < numchars; i++) {
      b = b.pressKeycode(67)              // Backspace
    }
    return b                              // We need to return the client to keep on chaining
  },

  clearInput: function (inputbox) {
    return this.pressKeycode(123)                    // Go to the end of the text    --> pressKeycode is Android specific
    .getText(inputbox).then(function(text) {
       // getText returns null for passowrd input fields, so we can't get the length
       var numchars = text.length || 20     // If we can't ge the length, we delete 20 characters (should be enough for the password)
       return this.deleteChars(numchars)
    })
  },

  clickInput: function(input) {
    return this.waitForExist(input, WAIT_TIMEOUT)
    .click(input)
  }

}

//./test/helpers/common/button_helpers.js
const WAIT_TIMEOUT = 20000
const LONG_PRESS_DURATION = 3000
module.exports = {
  clickButton:  function(button) {
    return this.waitForExist(button, WAIT_TIMEOUT)
    .click(button)
  },

  longPressButton: function(button) {
    return this.waitForExist(button, WAIT_TIMEOUT).then(function() {
      var b = this
      return b.element(button).then(function(ele) {   // Retrieve the element so that we can get the id
        var actions = [{
          action: 'longPress',
          options: {
            element: ele.value.ELEMENT,    // This must be the id of the element, not other selectors
            x: 0,
            y: 0,
            duration: LONG_PRESS_DURATION
          }
        }]
        return b.touchPerform(actions)
      })
    })
  }

}

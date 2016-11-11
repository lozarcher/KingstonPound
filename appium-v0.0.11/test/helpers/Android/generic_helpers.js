//./test/helpers/Android/generic_helpers.js
// These helpers should only be used with Android devices
module.exports = {
  // Get the id of an element based on a different selector
  getElementId: function(selector) {       // Preferred use case: selector being the accesibility id. It should be possible to use others, though
    return this.element(selector).then(function(ele) {
        return ele.value.ELEMENT
    })
  }

}

//./test/helpers/Android/map_helpers.js
var searchScreen = require('../../components/Android/search_screen_locators')
const WAIT_TIMEOUT = 20000
module.exports = {

  // Note: When trying to do something similar to zoom in, I've found that it would still zoom out
  zoomOut: function() {
    return this.waitForExist(searchScreen.map, WAIT_TIMEOUT).then(function() {
      var b = this
      return b.getElementId(searchScreen.map).then(function(mapid) {
        return b.elementIdSize(mapid).then(function(size) {
          var actions = [[{             //  Swipe like this: <-----
              action: 'press',
              options: { element: mapid, x: size.value.width/2 + 30, y: size.value.height/3 }
          },{
              action: 'moveTo',
              options: { x: -10, y: 0 }
          },{
              action: 'release'
          }],[{
              action: 'press',          // Swipe like this: ---->
              options: { element: mapid, x: size.value.width/2 - 30, y: size.value.height/3 }
          },{
              action: 'moveTo',
              options: { x: 10, y: 0 }
          },{
              action: 'release'
          }]]
          return b.touchMultiPerform(actions)     // Both sequences of actions run at the same time ( ----> <----)
        })
      })
    })
  },

  // Instead of trying to pinch to zoom in, double tap
  zoomIn: function() {
    return this.waitForExist(searchScreen.map, WAIT_TIMEOUT).then(function() {
      var b = this
      return b.getElementId(searchScreen.map).then(function(mapid) {
        return b.elementIdSize(mapid).then(function(size) {
          var actions = [{
            action: 'tap',
            options: { x: size.value.width/2, y: size.value.height/3, count: 2 }
          }]
          return b.touchPerform(actions)
        })
      })
    })
  }


}

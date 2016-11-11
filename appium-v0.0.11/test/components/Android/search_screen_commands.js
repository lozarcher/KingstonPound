//./test/components/Android/search_screen_commands.js
var searchScreen = require('./search_screen_locators')
var bottomBar = require('./bottom_bar_locators')

module.exports = {

  // Tap the screen on the position of the marker number 'num' in the list
  tapMapMarker: function(num) {
    return this.waitForExist(searchScreen.map, 20000).then(function() {
      return this.getElementId(searchScreen.map).then(function(mapid) {
        var b = this
        b.elementIdElements(mapid, searchScreen.markerList).then(function(markers) {
          // Note: if enabled(true) is not added to the previous selector, the field value from markers only has 1 element
          // We are not checking that the value of num is within the length of the array -- make sure num is valid!
          var actions = [{
            action: 'tap',
            options: { element: markers.value[num].ELEMENT, x: 0, y: 0, count: 1 }  // Element must be the id, not other selectors
          }]
          return b.touchPerform(actions)          
          })
        })
    })
  },

  // Get the full name of the trader in position 'num' in the Trader list
  getTraderName: function(num) {
    return this.waitForExist(bottomBar.loginButton, 20000).then(function() {  // If the Login button exists, the Trader list should be populated
      return this.elements(searchScreen.traderNameList).then(function(traders) {
        return this.elementIdText(traders.value[num].ELEMENT)
      })
    })
  }

}

/* Example of markers object:

{ status: 0,
  value:
   [ { ELEMENT: '3' },
     { ELEMENT: '4' },
           ...
     { ELEMENT: '60' },
     { ELEMENT: '61' } ],
  sessionId: '7ad5feaf-20fa-4a93-b2a3-4c8d50677aff' }

Example of traders object:

{ status: 0,
  value:
   [ { ELEMENT: '2' },
     { ELEMENT: '3' },
...
     { ELEMENT: '10' },
     { ELEMENT: '11' } ],
  sessionId: '2ce79fec-80a6-4b7a-a9ab-f1bc518e6469',
  selector: 'android=new UiSelector().className("android.widget.TextView").enabled(true)' }
*/

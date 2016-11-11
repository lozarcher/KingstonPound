// ./test/components/Android/search_screen_locators.js
// Locators for the Search screen
module.exports = {
  map: '~Google Map',                 // Not sure if this is the map -- it looks that way
  myLocation: '~My Location',         // It doesn't look like this is the blue circle that marks the user's location
  markerList: 'android=new UiSelector().className("android.view.View").enabled(true)',            // Used to find all the markers in the map
  traderNameList: 'android=new UiSelector().className("android.widget.TextView").enabled(true)',   // Used to find all the Texts in the screen -- traders + Login button
  // Obsolete with the new Trader list in Android - can probably be removed
  showListButton: 'android=new UiSelector().text("Show Nearby List").className("android.widget.TextView")'
}

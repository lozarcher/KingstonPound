// Path: ./config/Android/devices.js
var androidOptions = {
  android6E: {                                            // Edinburgh
      desiredCapabilities: {
          platformName: 'Android',                        // operating system
          platformVersion: '6.0',
          app: 'com.bristolpoundreactnative',             // bundle id of the app
          appActivity: 'MainActivity',                    // app activity, which should be started
          avdReadyTimeout: 7000,                        // waiting time for the app to start
          udid: '01c5b44e8882d184',                       // udid of the android device
          deviceName: 'Nexus 5',                          // device name
          browserName: ''                                 // No browser, we are using the app itself
      },
      host: 'localhost',                                  // localhost
      port: 4723                                          // port for appium
    },
    android6B: {
        desiredCapabilities: {
            platformName: 'Android',                        // operating system
            platformVersion: '6.0',
            app: 'com.bristolpoundreactnative',             // bundle id of the app
            appActivity: 'MainActivity',                    // app activity, which should be started
            avdReadyTimeout: 7000,                        // waiting time for the app to start
            udid: '0715c11700eed0ac',                       // udid of the android device
            deviceName: 'Nexus 5',                          // device name
            browserName: ''                                 // No browser, we are using the app itself
        },
        host: 'localhost',                                  // localhost
        port: 4723                                          // port for appium
    },
    android5B: {
        desiredCapabilities: {
            platformName: 'Android',                        // operating system
            app: 'com.bristolpoundreactnative',             // bundle id of the app
            appActivity: 'MainActivity',                    // app activity, which should be started
            avdReadyTimeout: 7000,                        // waiting time for the app to start
            udid: '08eb94a2',                               // udid of the android device
            deviceName: 'Nexus 7',                          // device name
            browserName: ''                                 // No browser, we are using the app itself
        },
        host: 'localhost',                                  // localhost
        port: 4723                                          // port for appium
    },
    android4B: {
        desiredCapabilities: {
            platformName: 'Android',                        // operating system
            app: 'com.bristolpoundreactnative',             // bundle id of the app
            appActivity: 'MainActivity',                    // app activity, which should be started
            avdReadyTimeout: 7000,                        // waiting time for the app to start
            udid: '08eb94a2',                               // udid of the android device
            deviceName: 'Nexus 7',                          // device name
            browserName: ''                                 // No browser, we are using the app itself
        },
        host: 'localhost',                                  // localhost
        port: 4723                                          // port for appium
    }
}

module.exports = androidOptions
// Note: adb devices doesn't work for Android 4.2.2, so there is no options for Android 4 defined at the moment
// TODO: Add options for emulators

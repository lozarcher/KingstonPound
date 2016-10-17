# Bristol Pound
Hello and welcome to BristolPound. This project is an internal React-Native application to be used by [Bristol Pound](http://bristolpound.org/) to replace their existing application.

For more information see the GitHub [wiki](https://github.com/ScottLogic/BristolPound/wiki).

___Note___
_As of October 2016, Android builds need to downgrade react and react-native to earlier versions._

### Technology Stack ###
* __Javascript__ ECMA6
* __npm__ - dependency management.
* __react-native__ - libraries and run scripts
  * __React__
  * __gradle__
* __eslint__ - static code analysis
* __(?)__ no unit test framework

## Getting Started
You should fork this project, clone the fork and work on your own fork. When your change is ready to be reviewed create a pull request.

Before running the application you will need to install install [node](https://nodejs.org/en/download/) as well as the following global npm packages:
* `npm install react-native-cli -g`

To run the application:
* `npm install`
* Windows/Android only:
  * `npm run downgrade`   (in case of difficulty try running the npm tasks separately).
```
   npm WARN react-native-maps@0.8.2 requires a peer of react@>=15.3.0 but none was installed.
   npm WARN react-native-maps@0.8.2 requires a peer of react-native@>=0.32.0 but none was installed.
```
* `react-native run-android` / `react-native run-ios`
* On iOS you need to open node_modules/react-native-maps/ios/AirMaps/AIRMap.h and AIRMapCallout.h and change `#import 'React/RCTComponent'` to `#import 'RCTComponent'`

To use remote-redux-devtools:
* Open Chrome and navigate to [remotedev.io/local](remotedev.io/local). Uses [remote-redux-devtools](https://github.com/zalmoxisus/remote-redux-devtools)

### Android Setup instructions:
On Android to get the application running you will need a device connected or an emulator. You can check your devices using `adb devices`. 

Android Studio can be used to get an emulator up and running.
Alternatively, once you have an emulator set up you can run it with 

`emulator -avd MyEmulatorName`
For this, make sure that `%ANDROID_HOME%/tools` folder is in your PATH or Mac equivalent.
See the  [Android Studio documentation](https://developer.android.com/studio/run/emulator-commandline.html) for more options.

## Linting/Style Recommendations
Before committing code please run `npm test` which will verify the code against the eslint configuration.
Style Choices:
* Stateless functional components where possible
* [Ducks](https://github.com/erikras/ducks-modular-redux) redux file structure

## OS Versions supported

This project supports iOS and Android with the following constraints:

* Android >=4.1, giving a reach of ~95%
* Support for Normal, Large, XLarge Android screen sizes
* Designs targetting iPhone 5 and iPhone 6 screen sizes, with the UI 'flexing' to accomodate other dimensions
* Support for iOS >=8, giving a reach of ~98%

See [#32]([https://github.com/ScottLogic/BristolPound/issues/32) for further details and commentary.

## Debugging the Application
### On an Android Device
* For a device, shake the phone to open developer options. For the emulator __ctrl+m__ while there is no modal dialog open.
* Select the __Start Remote JS Debugging__ option.
* Chrome should open on http://localhost:8081/debugger-ui 
* Open the chrome debugger and select the __Sources__ tab.
* Drill down __debuggerWorker.js/localhost:8081__
* At the bottom of the list of files (scroll past all the `C:\dev\BristolPound\node-modules\` entries) to select the appropriate `C:\dev\BristolPound\src\` file.
* Mostly this will be a `reducer` file to capture the event handling.
* Add breakpoints as normal.

## Custom Fonts
To support the design, some additional fonts have been added for referencing in css/react-native style objects.
### Available Fonts ###
* Museo Sans Fonts:
  * 'MuseoSans-300',
  * 'MuseoSans-700',
  * 'MuseoSans-500Italic'
* Museo Slab families
  * 'MuseoSlab-700'

### Adding a Custom Font
For each font, we need both the ios and android file sets:
1. Add __.otf__ file to `ios/BristolPoundReactNative/fonts` (actually it can go anywhere but this keeps it organised)
2. Follow these [instructions](https://medium.com/@dabit3/adding-custom-fonts-to-react-native-b266b41bff7f#.as4yo4odg).
You will need to follow __Step 5__ to get the font name for the android changes as well.
3. Now find the corresponding __.ttf__ file, copy to `android/app/src/main/assets/fonts` and rename it to match the font name above.

## More Android Setup Errors
#### SDK Package Errors ####
These are all resolved using the __Android SDK Manager__.
```
 Could not resolve all dependencies for configuration ':app:_debugCompile'.
   > Could not find com.google.android.gms:play-services-maps:8.4.0.
         file:/C:/Program Files (x86)/Android/android-sdk/extras/android/m2repository/com/google/android/gms/play-services-maps/8.4.0/play-services-maps-8.4.0.jar
```
* install: __Google Play Services__
```
 A problem occurred configuring project ':app'.
 failed to find target with hash string 'android-23' in: C:\dev\Android\sdk
```
* install: __Android 6.0 (API23)__ > __SDK Platform__, where the API version matches the missing target.
```
 A problem occurred configuring project ':app'.
 failed to find Build Tools revision 23.0.1
```
* install: __Android SDK Build Tools__ >  Revision: __23.0.1__
```
 Running C:\dev\Android\sdk/platform-tools/adb reverse tcp:8081 tcp:8081
 error: closed
 Could not run adb reverse: Command failed: C:\dev\Android\sdk/platform-tools/adb reverse tcp:8081 tcp:8081
```
This is because `adb reverse` only runs on Android 5.0
For Android 4.0, run from within the `BristolPound\Android` sub-directory:
```
 ./gradlew.bat installDebug
```  
Then go back to `BristolPound` and run `react-native start`

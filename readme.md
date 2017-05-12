# Bristol Pound
Hello and welcome to BristolPound. This project is an internal React-Native application to be used by [Bristol Pound](http://bristolpound.org/) to replace their existing application.

For more information see the GitHub [wiki](https://github.com/ScottLogic/BristolPound/wiki).

### Technology Stack ###
* __Javascript__ ECMA6
* __npm__ - dependency management.
* __react-native__ - libraries and run scripts
  * __React__
  * __react-native-maps__ Maps provided by [airbnb](https://github.com/airbnb/react-native-maps)
* __eslint__ - static code analysis
* __fabric__ (crashlytics) - crash reporting and analytics 
* __cocoapods__ - ios dependency manager
* __Expo__ - set of tools to allow easy development for both iOS & Android [expo](https://expo.io/)

## Getting Started
You should fork this project and clone your fork. Ask Colin Eberhardt for access to the repository. When your change is ready to be reviewed push a branch to your fork and create a pull request.

Before running the application you will need to __install__
* [node](https://nodejs.org/en/download/), as well as the following global npm packages:
* `npm install react-native-cli -g`
* [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)
* `npm install exp --global` [Expo](https://expo.io/)

#### Android - Setting up an android emulator:
Android Studio must be used to get an emulator up and running. First download and install [android studio](https://developer.android.com/studio/index.html).
Create the environment variables
* `ANDROID_HOME=%USERPROFILE%\AppData\Local\Android\sdk`
* `PATH=%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\build-tools\25.0.1;%PATH%` (replace `25.0.1` with whatever version is there) .

Now open android studio and create an empty project. Then open the SDK manager by clicking the button with a blue arrow and an android face. You will need to download at least one android version. Then open the AVD manager by clicking the button with a picture of a phone with a purple screen and an android face. This button will be greyed out if you have not created a new project in android studio! Set up a new emulator, using the x86 image if it asks. Once this is done you can launch the emulator from within android studio or you can run it from the command line with
`emulator @MyEmulatorName`
For this to work, make sure that `%ANDROID_HOME%/tools` folder is in your PATH.
See the  [Android Studio documentation](https://developer.android.com/studio/run/emulator-commandline.html) for more options.

### Running the app on a device (Android/iOS)
* set environment variable REACT_NATIVE_PACKAGER_HOSTNAME to your ip eg. `REACT_NATIVE_PACKAGER_HOSTNAME="192.168.52.59"`
* make sure your device is connected to the same network as your pc
* `npm install`
* `npm start`
* download the Expo app on your device from App Store/Google Play
* open the Expo app and point to the QR code generated in terminal
* app runs on your device!

### iOS - Running the app on iPhone emulator
* make sure [XCode](https://itunes.apple.com/de/app/xcode/id497799835) is installed.
* `npm run ios` -> will also start the simulator
* input the app address in the Expo app in the simulator

### Android - Running the app on Android emulator:
* make sure you set up your Android emulator
* open an Android emulator
* `npm run android` 
* input the app address in the Expo app

## OS Versions supported

This project supports iOS and Android with the following constraints:

 * Android >=4.4, giving a reach of ~85% of android devices
 * Support for iOS >=10, this is necessary in order to exclude iPhone 4 which was considered too small

See [#32]([https://github.com/ScottLogic/BristolPound/issues/32) for further details and commentary.

## Debugging
Expo makes the app print the logs in the console. For more options check the [expo docs](https://docs.expo.io/versions/v16.0.0/guides/debugging.html)

### Crash Reports ###
* The app has integrated Crashlytics with Fabric for both Android and iOS, which register all app crashes 
* In order to get access to the Fabric organisation and see the crash reports, email gginghina@scottlogic.com 

### Chrome remote debug
* For an android device, shake the phone to open developer options. For the emulator __ctrl+m__ while there is no modal dialog open.
* For iPhone emulator, press windows-d to get developer options
* Select the __Start Remote JS Debugging__ option.
* Chrome should open on http://localhost:8081/debugger-ui
* Open the chrome debugger and select the __Sources__ tab.
* Drill down __debuggerWorker.js/localhost:8081__
* At the bottom of the list of files (scroll past all the `C:\dev\BristolPound\node-modules\` entries) to select the appropriate `C:\dev\BristolPound\src\` file.
* Mostly this will be a `reducer` file to capture the event handling.
* Add breakpoints as normal.

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

#### Error: Could not find tools.jar
```
:react-native-config:compileReleaseJavaWithJavac FAILED

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':react-native-config:compileReleaseJavaWithJavac'.
> Could not find tools.jar
```
* set JAVA_HOME=C:\PROGRA~1\Java\jdk1.8.0_102 (check your installation).

#### Error: The system cannot find the path specified / Failed to create directory 
```
:app:mergeDebugResources FAILED

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:mergeDebugResources'.
> B:\bristolpound.org\BristolPound\android\app\build\intermediates\exploded-aar\com.android.support\appcompat-v7\23.0.1\res\color\abc_primary_text_disable_only_material_light.xml: Error: B:\bristolpound.org\BristolPound\android\app\build\intermediates\res\merged\debug\color\abc_primary_text_disable_only_material_light.xml (The system cannot find the path specified)
```
OR
```
:app:mergeDebugResources FAILED

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:mergeDebugResources'.
> B:\bristolpound.org\BristolPound\android\app\build\intermediates\res\merged\debug\values-hi\values-hi.xml: Error: Failed to create directory: B:\bristolpound.org\BristolPound\android\app\build\intermediates\res\merged\debug\values-hi
```
* Use local directory, rather than a network mapped one
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

## Getting Started
You should fork this project and clone your fork. Ask Colin Eberhardt for access to the repository. When your change is ready to be reviewed push a branch to your fork and create a pull request.

Before running the application you will need to __install__
* [node](https://nodejs.org/en/download/), as well as the following global npm packages:
* `npm install react-native-cli -g`
* `npm install`

### iOS

You will also need to install [CocoaPods](https://guides.cocoapods.org/using/getting-started.html) and install the dependencies for the Xcode project by running:
* `gem install cocoapods --user-install`
* `cd ios && pod install`

#### Running on iPhone emulator:
First, make sure [XCode](https://itunes.apple.com/de/app/xcode/id497799835) is installed.
* `npm install`
* open XCode
* In XCode, open ios/BristolPoundReactNative.xc__workspace__ (not: `*.xcodeproj`!)
* Select a device from the dropdown to the right of the play and stop buttons
* Press play

There is a very high chance it won't work. One possible reason is the version of XCode, we recommend at least 8.2. If this is not the issue, check the [wiki](https://github.com/ScottLogic/BristolPound/wiki)
Failing that, google is your friend. Builds are very slow, be patient!

### Android
#### Setting up an android emulator:
Android Studio must be used to get an emulator up and running. First download and install [android studio](https://developer.android.com/studio/index.html).
Create the environment variables
* `ANDROID_HOME=%USERPROFILE%\AppData\Local\Android\sdk`
* `PATH=%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\build-tools\25.0.1;%PATH%` (replace `25.0.1` with whatever version is there) .

Now open android studio and create an empty project. Then open the SDK manager by clicking the button with a blue arrow and an android face. You will need to download at least one android version. Then open the AVD manager by clicking the button with a picture of a phone with a purple screen and an android face. This button will be greyed out if you have not created a new project in android studio! Set up a new emulator, using the x86 image if it asks. Once this is done you can launch the emulator from within android studio or you can run it from the command line with
`emulator @MyEmulatorName`
For this to work, make sure that `%ANDROID_HOME%/tools` folder is in your PATH.
See the  [Android Studio documentation](https://developer.android.com/studio/run/emulator-commandline.html) for more options.

#### Connecting an android device
Do not use a loved phone, react-native may destroy it!

Debug mode (the method described here) only works with android 5 or above, but the finished app will run on android >= 4.4
* Connect with USB cable
* scroll down to `about phone` and tap about 7 times to enable dev options
* open dev options. About half way down, there is an option for USB connection mode. Select PTP. This will have to be done every time the phone is connected (really annoying)
* `adb devices` to check phone has been detected
* `adb reverse tcp:8081 tcp:8081`

Now your phone is ready to go!

#### Running on android (device or emulator)
* `adb devices` - you need exactly one device in the list
* `npm install`
* `cd android && ./gradlew installDebug` (Bash) or `cd android && gradlew.bat installDebug` (cmd)

If this fails, try a few more times before concluding something is wrong. Wait until the installation completes before starting the packager
* `cd .. && react-native start` - starts the packager

Now that the app is installed, open it. if it does not work shake the phone and select 'reload'. For emulators, press 'r' twice in quick succession to reload the app

## OS Versions supported

This project supports iOS and Android with the following constraints:

 * Android >=4.4, giving a reach of ~85% of android devices
 * Support for iOS >=10, this is necessary in order to exclude iPhone 4 which was considered too small

See [#32]([https://github.com/ScottLogic/BristolPound/issues/32) for further details and commentary.

## Debugging
The easiest way is to run `react-native log-android` or `react-native log-ios`. These commands simply print the logs in the console. For android errors, `adb logcat *:E` and `adb logcat *:F` are occasionally useful, but not in the general case. Check the [wiki](https://github.com/ScottLogic/BristolPound/wiki) for more tips

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

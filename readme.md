# Bristol Pound
Hello and welcome to BristolPound. This project is an internal React-Native application to be used by [Bristol Pound](http://bristolpound.org/) to replace their existing application.

## Getting Started
You should fork this project, clone the fork and work on your own fork. When your change is ready to be reviewed create a pull request.

To run the application:
* `npm install`
* `react-native run-android` / `react-native run-ios`
* On iOS you need to open node_modules/react-native-maps/ios/AirMaps/AIRMap.h and AIRMapCallout.h and change `#import 'React/RCTComponent'` to `#import 'RCTComponent'`

For production:
* `PROD=true react-native run-android` / `PROD=true react-native run-ios`

To debug:
* Open Chrome and navigate to [remotedev.io/local](remotedev.io/local). Uses [remote-redux-devtools](https://github.com/zalmoxisus/remote-redux-devtools)

### Android Setup instructions:
On Android to get the application running you will need a device connected or an emulator. You can check your devices using `adb devices`. Android Studio can be used to get an emulator up and running.

## Linting/Style Recommendations
Before committing code please run `npm test` which will verify the code against the eslint configuration.
Style Choices:
* Stateless functional components where possible
* [Ducks](https://github.com/erikras/ducks-modular-redux) redux file structure

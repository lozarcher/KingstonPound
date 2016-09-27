# Bristol Pound
Hello and welcome to BristolPound. This project is an internal React-Native application to be used by [Bristol Pound](http://bristolpound.org/) to replace their existing application.

## Getting Started
You should fork this project, clone the fork and work on your own fork. When your change is ready to be reviewed create a pull request.

To run the application:
* `npm install`
* Windows/Android only: `npm run downgrade`
* `react-native run-android` / `react-native run-ios`
* On iOS you need to open node_modules/react-native-maps/ios/AirMaps/AIRMap.h and AIRMapCallout.h and change `#import 'React/RCTComponent'` to `#import 'RCTComponent'`

To use remote-redux-devtools:
* Open Chrome and navigate to [remotedev.io/local](remotedev.io/local). Uses [remote-redux-devtools](https://github.com/zalmoxisus/remote-redux-devtools)

### Android Setup instructions:
On Android to get the application running you will need a device connected or an emulator. You can check your devices using `adb devices`. Android Studio can be used to get an emulator up and running.

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

## Custom Fonts

### Museo Sans

The choices are MuseoSans-300, MuseoSans-700 and MuseoSans-500Italic

### Museo Slab

The only choice here is MuseoSlab-700

### Adding more Fonts

1. Add .otf file to ios/BristolPoundReactNative/fonts (actually it can go anywhere but this keeps it organised)
2. Follow these instructions: https://medium.com/@dabit3/adding-custom-fonts-to-react-native-b266b41bff7f#.as4yo4odg
3. Now find the corresponding .ttf file, copy to android/app/src/main/assets/fonts and rename it to match the font name

# Bristol Pound
Hello and welcome to BristolPound. This project is an internal React-Native application to be used by [Bristol Pound](http://bristolpound.org/) to replace their existing application.

## Getting Started
You should fork this project, clone the fork and work on your own fork. When your change is ready to be reviewed create a pull request.

To run the application:
* `npm install`
* `react-native run-android` / `react-native run-ios`

### Android Setup instructions:
On Android to get the application running you will need a device connected or an emulator. You can check your devices using `adb devices`. Android Studio can be used to get an emulator up and running.

## Linting/Style Recommendations
Before committing code please run `npm test` which will verify the code against the eslint configuration.
Style Choices:
* Stateless functional components where possible
* [Ducks](https://github.com/erikras/ducks-modular-redux) redux file structure

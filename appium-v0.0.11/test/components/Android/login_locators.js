// ./test/components/Android/search_screen_locators.js
module.exports = {
  usernameInput: '~Input Username',                // Input box for username from Login process
  passwordInput: '~Input Password',                // Input box for password from Login process
  loginButton: '~Login Button',                    // Button to login
  // To do: replace with accesibility id when available
  loggedInButton: 'android=new UiSelector().textContains("Logged in").className("android.widget.TextView")'
}

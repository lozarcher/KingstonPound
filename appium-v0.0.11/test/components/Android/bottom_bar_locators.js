// ./test/components/Android/bottom_bar_locators.js
module.exports = {
  // Locators by accesibility id:
  searchButton: '~Search Tab',                 // Search screen button in the bottom bar
  spendingButton: '~Spending Tab',             // Spending sceen button in the bottom bar
  accountButton: '~My Details Tab',            // Account screen button in the bottom bar
  loginButton: '~Login Tab',                   // Login button in the bottom bar
  // Locators by className -- the accesibility ids have not been implemented yet
  // Todo -- replace them with accesibility ids
  // These ids were used in the past to check for a successful login, but now they are not needed for this
  // They can be used in other tests (related to payments, for example)
  // When the user has logged in,the balance is broken in 2 texts, the pounds and the pence
  poundsBalance: 'android=new UiSelector().index(1).className("android.widget.TextView")',                       // Balance (pounds) in the bottom bar - user logged in
  penceBalance: 'android=new UiSelector().index(3).className("android.widget.TextView")'                        // Balance (pence, with '.') in the bottom bar - user logged in
}

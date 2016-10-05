| Test case id | Priority |
|:------------:|:--------:|
|   BRP0005    |     3    |

# Idea:

Usage of the _Account_ screen:
+ Display account information
+ Logout functionality
+ Dev options (temp)

## Out of scope:

- Modify the photo, email or phone
- Friends
- Background image selection
- Change password functionality

## Setup and additional info:

The current behavior is:
1. When the app starts, the user is not logged in yet
2. When the _Account_ button is selected, the Dev Options are displayed (temp)
3. The user can login using the _Login_ button in the bottom bar, or going to the _Spending_ screen
3. When the user has logged in, the _Account_ screen displays the following information about the user:
  + Photo (placeholder icon if there is none in the backend)
  + Name and username
  + Email
  + Phone number

  Note: _Email_ and _Phone number_ are buttons, although they don't react
4. There are several additional buttons:
  + Logout --> displays the Dev options in the _Account_ screen (also forces to login again)
  + Dev options (temporary, these won't be present in the final release):
    - _Using: [Prod/Dev] server_ -> switching causes a logout, as users are different on each backend
    - _Clear Business State_ clears the Trader list & repopulates it from the API, using the currently selected server
    - _Clear Spending State_ clears transaction related information & repopulates it from the API (if the user is logged in)

For login information, please refer to [logins.md](https://github.com/ScottLogic/BristolPound/blob/master/test_cases/helpers/logins.md)

## Steps / Expected results

| # | Step | Expected result | Comments |
|:-:|:----:|-----------------|----------|
| 1 | Start the app, and go to the _Account_ screen | The Dev Options are displayed | Using the _Login_ button in the bottom bar opens the _Login_ screen |
| 2 | Login with a test user | The _Spending_ screen is displayed | For now the _Login_ screen always goes to the _Spending_ screen |
| 3 | Go to the _Account_ screen | The information for the current user is displayed, along with the Dev Options | No changes are allowed yet in user data |
| 4 | Use the _Logout_ button | The Dev options appear | User is also logged out |
| 5 | Switch to the Dev server, then clear the Business State | The Dev Server should be selected | Trader information is reloaded from the Dev Server |
| 6 | Go to the _Search_ screen | The list of Traders from Dev appears | Traders in Dev and Prod are different |
| 7 | Go to the _Account_ screen, and switch to the Prod Server | Business State is not cleared yet | Trader information from Dev remains in cache |
| 8 | Go to the _Search_ screen | The Trader list from Dev appears | Cache is not flushed automatically |
| 9 | Go to the _Account_ screen, and clear the Business cache, then return to the Search screen | The Trader list from Prod appears | |
| 10 | Switch to Dev Server, clear the Spending State and login to Dev | _Spending_ screen displays transactions from the current month |  |
| 11 | Navigate to previous months | The transactions for each month are displayed | All the transactions are loaded to the cache |
| 12 | Clear the Spending State | The _Spending_ screen shows the transactions from the current month | Only the transactions from the current month are in cache |
| 13 | Navigate to other months | Transactions from each month are displayed | Each month needs to load the transactions from the backend |
| 14 | Navigate back to months already viewed | Transactions from each month are displayed | There should be no delay loading the transactions, as they are in cache |

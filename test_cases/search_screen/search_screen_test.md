| Test case id | Priority |
|:------------:|:--------:|
|    BRP0003   |     3    |

# Idea:

Usage of the _Search_ screen:
+ Display the map and nearby Traders.
+ Provide access to the _Trader information_ screen for each displayed Trader
+ Entering _Search mode_ displays only the Trader list

## Out of scope:

- Selected Trader
  + Blue marker on map for selected Trader
  + Selected Trader box
  + Ability to select a trader either from the Trader list or from the map
- _Nearby_ and _Filters_ buttons
- Search functionality
- Suggested recent Friends/Traders
- Making a payment to a user for the first time
- Starting the app for the first time without Internet connection
- Alphabetical ordering of Traders while in _Search_ mode

## Setup and additional info:

The current behavior is:

1. When the app starts, the map is centered on a fixed location in Bristol.
  + The Trader list shows Traders ordered by proximity to the center of the map (Location services are not used yet)
  + Only the traders that are displayed in the map are listed in the Trader list, so zooming in/out in the map affects the number of Traders in the list
  + Pulling the Trader list up expands the list until it fills the screen
2. Selecting a Trader opens the _Trader information_ screen for that Trader
  + If the user has not logged in, the _Trader information_ screen displays Trader information only.
  + If the user has logged in, the _Trader information_ screen displays also transactions done by the user to that Trader.
3. Selecting the search box enters _Search mode_
  + The user can still see the Trader list, and scroll through the list
  + The user can exit _Search mode_ using the _X_ button (the keyboard is hidden and the cursor disappears)

For login information, please refer to [logins.md](https://github.com/ScottLogic/BristolPound/blob/master/test_cases/helpers/logins.md)

## Steps / Expected results

| # | Step | Expected result | Comments |
|:-:|:----:|-----------------|----------|
| 1 | Start the app | The _Search_ page appears, centered on a fixed location in Bristol; the Trader list is sorted by proximity to the center of the map | User is not logged in yet |
| 2 | Pull the Trader list up | The Trader list expands until it fills the screen, but it doesn't hide the Search input box | |
| 3 | Zoom in so that fewer Traders are visible in the map | The Trader list should contain fewer elements (only the Traders visible in the map) | |
| 4 | Zoom out so that more Traders are visible in the map | The Trader list should contain more elements (the Traders visible in the map) | |
| 5 | Pan the map so that different Traders are visible in the map | The Trader list should change to contain the Traders visible in the map, ordered by proximity to the center of the map | |
| 6 | Select one of the Traders  | The _Trader information_ screen appears | As the user is not logged in, no transactions should be displayed |
| 7 | Go back to the _Search_ screen and enter _Search mode_  | The cursor appears, and the keyboard is displayed; the Trader list keeps the previous order |  |
| 8 | Exit _Search mode_ using the _X_ button  | The _X_ button changes to black while pressed, the cursor is removed and the keyboard is hidden; the Trader list goes back to the initial position in the screen | |
| 9 | Login to Prod | The _Spending_ screen appears, showing transactions for the current month | Take note of a Trader with some transactions |
| 10 | Go back to the _Search_ screen and select the Trader chosen on step 8 | The _Trader information_ screen shows Trader information and transactions | Traders without transactions will appear as in step 6 |
| 11 | Go to the _Account_ screen and logout, then switch to Dev server and clear both caches, and go back to the _Search_ screen | The Traders stored in Dev are displayed now, both in the map and in the Transaction list | Traders will be different in Dev and Prod |

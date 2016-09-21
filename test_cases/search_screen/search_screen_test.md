| Test case id | Priority |
|:------------:|:--------:|
|    BRP0003   |     3    |

| Created (date)  |  Name  |    Reason   |
|:---------------:|:------:|:-----------:|
|   16/09/2016    | Carlos | First draft |
| Modified (date) |  Name  |    Reason   |
|                 |        |             |
|                 |        |             |

# Idea:
Usage of the _Search_ screen:
+ Display the map and nearby Traders.
+ Provide access to the _Trader information_ screen for each displayed Trader
+ Entering _Search mode_ displays recently searched Traders

## Out of scope:
- Selected Trader
  + Blue marker on map for selected Trader
  + Selected Trader box
  + Ability to select a trader either from the Trader list or from the map
- _Filters_ button
- Search functionality
- Suggested recent Friends
- Making a payment to a user for the first time
- Removing suggested Traders from the Trader list

## Setup and additional info:

The current behavior is:
1. When the app starts, the map is centered on the user's location.
  + The map shows Traders that are nearby
  + The Trader list shows traders ordered by location (GPS)/alphabetically (no GPS)
  + Scrolling down the Trader list expands the list until it fills the screen
2. Selecting a Trader opens the _Trader information_ screen for that Trader
3. Selecting the search box enters _Search mode_
  + Up to 5 recently searched Traders are displayed, ordered by location (with GPS)/alphabetically (no GPS)
  + You can exit _Search mode_ using the _X_ button

## Steps / Expected results
| # | Step | Expected result | Comments |
|:-:|:----:|-----------------|----------|
| 1 | Start the app with Location Services enabled | The _Search_ page appears, centered on the user's location; the Trader list is sorted by location | User is not logged in yet |
| 2 | Scroll down | The Trader list should remain in the same position while scrolling down | First iteration only |
| 3 | Select one of the Traders  | The _Trader information_ screen appears | Test case BRP0001 checks if the information is valid |
| 4 | Go back to the Search screen  | Same situation as step 2 |  |
| 5 | Select the _Search_ input box  | An _X_ button appears to the right, and up to the 5 most recent traders appear below as a suggestion, sorted by location | The suggested traders are not removed from the Trader list yet |
| 6 | Click on the _X_ button  | The _X_ button disappears and the suggested traders too | Same situation as step 2 |
| 7 | Disable Location services  | The Trader list gets sorted alphabetically | May need to refresh by pulling down |
| 8 | Repeat steps 5 and 6  | The suggested Traders are also sorted alphabetically | |

| Test case id | Priority |
|:------------:|:--------:|
|    BRP0001   |     3    |

# Idea:

Usage of the Trader information screen:
1. Display information about the trader
2. If the user is logged in, display transactions done to that Trader as well

## Out of scope:

- _Send Money_ functionality (the button is displayed, and there is some basic functionality)
- Animations in the _Trader information_ page
- Collapse/expand functionality
- Refresh functionality
- Loading additional transactions that are not currently cached

## Setup and additional info:

The user can open the _Trader information_ page from the following locations in the app:
  1. From the _Search_ page, by selecting a Trader
  2. From the _Spending_ screen (_Transactions_ tab), by selecting a transaction; this will show the information from the Trader used in that transaction
  3. From the _Spending_ screen (_Traders & Friends_ tab), by selecting a Trader

The _Trader information_ page lists the information from the Trader, and has a fixed _Send Money_ button at the bottom of the screen

For login information, please refer to [logins.md](https://github.com/ScottLogic/BristolPound/blob/master/test_cases/helpers/logins.md)

Possible fields for each Trader:
+ Deal
+ Email
+ Opening times
+ Phone number
+ Access point
+ Location

## Steps / Expected results

| # | Step | Expected result | Comments |
|:-:|:----:|-----------------|----------|
| 1 | Start the app and go to the _Spending_ screen | The _Login_ page appears | User is not logged in by default yet |
| 2 | Login to Prod | The _Transactions_ tab displays the transactions done this month, ordered by date (most recent ones first) | The carousel also shows the previous month |
| 3 | Select a transaction | The _Trader information_ screen displays Trader information, and also the transactions done to that Trader  | Each trader can display different information; the _Send Money_ button is fixed to the bottom of the screen; currently only cached transactions appear, so the result may be different if the user loads more transactions by navigating to previous months |
| 4 | Go back to the _Spending_ screen | The _Transactions_ tab displays transactions for that user | Clicking on the _X_ brings the user to the previous screen |
| 5 | Go to the _Traders & Friends_ tab,a nd select the previous Trader | The Traders are listed ordered by the total amount spent on each | The result should be the same as in step 3 |
| 6 | Go to the _Search_ page, and select the previous Trader | The _Trader information_ screen shows the same information as in 3 | |
| 7 | Repeat steps 3-6 for different Traders/transactions | Each Trader shows the appropriate information | Locate Traders with different fields populated, either in Prod or in Dev |

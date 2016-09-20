| Test case id | Priority |
|:------------:|:--------:|
|    BRP0001   |     3    |

| Created (date)  |  Name  |    Reason   |
|:---------------:|:------:|:-----------:|
|   15/09/2016    | Carlos | First draft |
| Modified (date) |  Name  |    Reason   |
|                 |        |             |
|                 |        |             |

# Idea:
Usage of the Trader information screen:
1. Display information about the trader

## Out of scope:

- Test the behavior when the user has not logged in; the login process has not been defined yet (the current login screen is temporary).
- The _Send Payment_ functionality is not implemented yet, but the button should be displayed.
- No animations are displayed in the _Trader information_ page, and no collapse/expand functionality has been implemented yet.
- Checking that the button is fixed to the bottom of the screen. In this test the user needs to scroll down in order to see the button.

## Setup and additional info:

The user can open the _Trader information_ page from 2 locations in the app:
  1. From the _Search_ page, by selecting a trader
  2. From the _Transactions_ page, by selecting a transaction; this will show the information from the Trader used in that transaction
The _Trader information_ page will list the information from the Trader, and allow the user to make a payment.

For this test, the user must be logged in (the _Send Payment_ button will be displayed only if the user has logged in).

Some sample test users are:
* __pshek/testing123__
* __test1/testing123__

New users can be created, but they won't have any transactions. All users have the same privileges.

The backend for this test is:

[Bristol Pound Sandbox03](https://bristol.cyclos.org/bristolpoundsandbox03/api/#/)

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
| 1 | Start the app | The _Search_ page appears | User is not logged in yet |
| 2 | Open the _Transactions_ page | The _Login_ page appears if the user is not logged in | User/pass is prepopulated now (temp) |
| 3 | Login (only the first time) | The _Transactions_ page displays transactions for that user | The _Prev/Next_ buttons allow viewing older transactions |
| 4 | Select a transaction | The _Trader information_ screen appears | Each trader can display different information; the _Send Payment_ button appears at the bottom |
| 5 | Go back to the _Transactions_ page | The _Transactions_ page displays transactions for that user | Clicking on the _X_ brings the user to the previous page |
| 6 | Go to the _Search_ page, and select the previous Trader | The _Trader information_ screen shows the same information as in 4 | |
| 7 | Go back to the _Search_ page | The _Search_ screen appears | |
| 8 | Repeat steps 2 to 7 for different Traders/Transactions | Information updated for the new Trader | Optional. To do: identify one Trader with all the fields populated and one with the minimum number of fields populated to use as examples |

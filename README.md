## Steps for setup and running the test

1. First clone the project with `git clone ` (git needs to be installed) into a new folder
that you have created to hold the project.
1. You also need to have node and npm install.
1. Using a terminal, step into the project folder.
1. Run `npm install` in order to install all dependencies.
1. Run the script `npx playwright test --ui` to open playwright UI and click on the only test available to get it runnning.
1. For running test in headless mode try `npx playwright test`

## General info

On the interviewE2e.test.js file there is the E2E test of the challenge, this is one of my first times using playwright, I been working mainly with cypress for the past 4 years, I saw that playwright is very similar with cypress and I bet that with a few more days of exposure I could do a quick ramp up and find better solutions to any problem that I might need to get solve using playwright.

For this project I selected the well known Page Object Model as design pattern
also added some best pactices like adding a base url, and separating the locators from the test itself.

Once execution is completed test reports can be viewed either using the command : npx playwright show-report or by navigating to `Playwright-report` folder from project and opening the html file.

Proposed enhancements are mainly to have data-test attributes as unique selectors for elements
for future growth of the project is always great to have some beforeEach, before, after and afterEach methods to add effectivness and readability like Im use to using with cypress, I havent look at the sintax on that using palywright. We could also mask the user credentials so we dont hard coded into the test itself. we could also divide in more pages for locators like having a side menu page with those locators since they look static and global on the page.

The test first creates a user, if the user is already created it doesnt throw any error or warning which I believe it should some how and if it is then I would try a different solution to the api account creation, probably making a condition if account is created then skip the account creation part, I can do that by using a GET accounts and check for the email of the account Im about to create if its there then ignore the account registration and continue with Step 2, else create the account. I write it because with a bit more time I can enhance this test for sure, but since this is my first time using playwright as it is.

Thank you so much it was super fun to do, I even learned to consider playwright as more robust than cypress, it has extra capabilities that cypress still lack.
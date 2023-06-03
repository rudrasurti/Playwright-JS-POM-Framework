# PlaywrightWIthJS-POM-Framework
(Automation Testing | Web | Playwright | JavaScript | VS Code | Parallel Cross Browser Testing | Visual Testing | Videos | Screenshots | Trace | Retries | Tagging | Viewport | Logger)

The Playwright Framework is an open-source test automation library that supports multiple programming languages such as Java, Python, C#, and Node.js. It was released in January 2020. To learn more about Playwright, visit their [official website](https://playwright.dev/).

## Getting Started with Playwright

To get started with Playwright, follow these simple steps:

1. Clone the code repository:
   1. Go to the repository you want to clone.
   2. Above the list of files, click on the **Code** button.
   ![Screenshot of the list of files on the landing page of a repository. The "Code" button is highlighted with a dark orange outline.](https://docs.github.com/assets/cb-32892/images/help/repository/code-button.png)
   4. Copy the repository's URL. If you prefer, you can also download the repository as a ZIP file for a quick start.
   5. To clone the repository using HTTPS, copy the HTTPS URL.
   ![Screenshot of the "Code" dropdown menu. To the right of the HTTPS URL for the repository, a copy icon is outlined in dark orange.](https://docs.github.com/assets/cb-88716/images/help/repository/https-url-clone-cli.png)
   6. Open Git Bash or GitHub Desktop.
   7. Navigate to the directory where you want to store the code.
   8. Execute the following command:
   ```
   git clone <url>
   ```
   10. If you are using GitHub Desktop, go to File -> Open and paste the URL.

## Running the Script

Once you have the code on your local machine, you can use any IDE to work with it. To set up the environment for the first time, execute the following commands:

```
npm install
npm run playwright install
```

> If `npm install` gives an error, please replace it with `npx`.

> Note:
> - `npm` is used for installation.
> - `npx` is used for executing packages.

To execute the script, use the following command:

```
npx playwright test <test file name> --headed
npx playwright show-report
```

> The `--headed` option is used for executing the script in a browser. By default, the execution is headless.

To view the test report, execute the following command:

```
npx playwright show-report
```

For more details on best practices and writing automation code, please refer to the Confluence page.

## Repo Structure

The repository has the following structure:

- global
  - common
  - config
  - data
  - util
- application log
- pages/specs
  - login
  - ...
- tests
  - login
  - ...

## Adding Scripts

To add a script:

1. Create a new test file under the `tests` folder.
2. Import the required dependencies. In the example code below, the necessary specs are imported:
```javascript
const { test, expect, chromium } = require('@playwright/test');
const { LoginPage } = require('../../pages/specs/login/Login');
```
> The `test` module helps configure test properties during execution.

3. Begin the test case using the `test.describe` snippet:
```javascript
test.describe('Login', () => {  });
```
4. Add a test case within the `test.describe` block:
```javascript
test('LOGIN: Verify Login as New User', async ({ page }, testInfo) => {}
```
5. Call the specs in the script:
```javascript
const loginPage = new LoginPage(page, testInfo);

await loginPage.gotoLegacyApp();
await loginPage.loginToApplication(testData[0].userid, testData[0].password);
```



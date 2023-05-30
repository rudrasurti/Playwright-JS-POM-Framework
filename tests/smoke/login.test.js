const { test, expect, chromium } = require('@playwright/test');
const { LoginPage } = require('../../pages/specs/login/Login');

const fs = require('fs');
const path = require('path')

import data from '../../global/data/data';
import helper from '../../global/util/helper';

test.describe('Login ', () => {

    test('LOGIN : Verify Login as New User', async ({ page }, testInfo) => {
        
        test.slow();
        var testData = data("Common");

        const loginPage = new LoginPage(page, testInfo);

        await loginPage.gotoLegacyApp();
        await loginPage.loginToApplication(testData[0].userid, testData[0].password);
    });

});


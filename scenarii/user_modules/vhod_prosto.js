
let driver;
(async function () {
    const { Builder, By, Key, until } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    const trevoga_00 = require('./function/trevoga_00')
    driver = await new Builder()
        .forBrowser('chrome')
        //.setChromeOptions(options)
        .build();
    await driver.get('https://browserleaks.com/geo');
    await trevoga_00.final(driver);
    //await trevoga_00.trevoga(driver);
    await driver.quit();
})();



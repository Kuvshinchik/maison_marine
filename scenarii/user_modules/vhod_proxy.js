//let driver;

async function vhodWithZip(numberInKatalog) {
    try {
        const path = require('path');
        const fs = require("fs");
        const trevoga_00 = require("./function/trevoga_00");
        const { Builder, By, Key, until } = require('selenium-webdriver');
        const chrome = require('selenium-webdriver/chrome');
        const options = new chrome.Options();
        const { PageLoadStrategy } = require("selenium-webdriver/lib/capabilities");
        let adressZiip = path.join(__dirname.replace("\\yarmarka\\scenarii\\user_modules", '').replace("/yarmarka/scenarii/user_modules", ''), `files/ipPort/${numberInKatalog}/proxy_auth.zip`);        
        options.setPageLoadStrategy(PageLoadStrategy.NONE); //РАБОТАЕТ!!!!
        //options.setChromeOptions();
        //, `disable-search-geolocation-disclosure['',=True,=2,=1]` -- НЕ Работает, аналогично с , `disable-geolocation=False`
        options.addArguments(`useAutomationExtension=False`, `disable-blink-features=AutomationControlled`, `window-size=1150,1350`, `window-position=10,10`);
        function encode(file) {
            var stream = fs.readFileSync(file);
            return new Buffer.from(stream).toString('base64');
        }

        options.addExtensions(encode(adressZiip));
        let parrentAdress = path.join(__dirname.replace("\\yarmarka\\scenarii\\user_modules", '').replace("/yarmarka/scenarii/user_modules", ''));
        options.addExtensions(encode(`${parrentAdress}/files/webrtc-control-master.zip`));

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
//console.log(options);
        await trevoga_00.sleep(5000);
        originalWindow = await driver.getWindowHandle();
        await trevoga_00.clickLocationNone(driver);
       // await driver.get('https://browserleaks.com/geo');
        //await trevoga_00.final(driver);
        //await trevoga_00.trevoga(driver);
        let massivForReturn = [driver, originalWindow];   
        return massivForReturn;
    } catch (error) { console.log(error) }

}
module.exports.vhodWithZip = vhodWithZip;
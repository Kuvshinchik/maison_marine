const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require("fs");
let s_n = '\n';
let number_accaunt = 51;
let numberInKatalog = +number_accaunt;
let fileName_json = '../pinterest/json/' + number_accaunt + '.json';
let files_text = fs.readFileSync(fileName_json, 'utf8');
files_text = JSON.parse(files_text);
let email_pin = files_text.mail_01;
let parole_pin = files_text.password_01;

console.log(email_pin);
console.log(parole_pin);

const trevoga_00 = require("./function/trevoga_00");

const options = new chrome.Options();
const userProfilePath = 'C:/copy/node/Browsers_chrome/Browser_chrome_' + numberInKatalog +'/Default';
const { PageLoadStrategy } = require("selenium-webdriver/lib/capabilities");
//let adressZiip = path.join(__dirname.replace("\\scenarii\\user_modules", '').replace("/scenarii/user_modules", ''), `files/ipPort/${numberInKatalog}/proxy_auth.zip`);
let adressZiip = 'C:/copy/node/files/ipPort/' + numberInKatalog +'/proxy_auth.zip';
options.setPageLoadStrategy(PageLoadStrategy.NONE); //РАБОТАЕТ!!!!
//options.setChromeOptions();
options.addArguments(`useAutomationExtension=False`, `disable-blink-features=AutomationControlled`, `window-size=850,1500`, `window-position=10,10`);
options.addArguments(`user-data-dir=${userProfilePath}`, `profile-directory=Profile 1`);
function encode(file) {
    var stream = fs.readFileSync(file);
    return new Buffer.from(stream).toString('base64');
}
options.addExtensions(encode(adressZiip));
//let parrentAdress = path.join(__dirname.replace("\\scenarii\\user_modules", '').replace("/scenarii/user_modules", ''));
let parrentAdress = 'C:/copy/node/files/webrtc-control-master.zip';
//options.addExtensions(encode(`${parrentAdress}/files/webrtc-control-master.zip`));
options.addExtensions(encode(parrentAdress));

/**/
(async function example() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    await trevoga_00.clickLocationNone(driver);
    await trevoga_00.sleep(15000);
    /*await driver.get('https://browserleaks.com/geo');
    await trevoga_00.sleep(5000);*/
    await driver.get('https://www.pinterest.com');

    //await driver.quit();
})();



//функция загрузки сохраненного браузера, при заходе в настройках отключаем геолокацию и подгружаем два расширения, блокировка webrtc и авторизация Прокси

async function withoptions(numberInKatalog) {
    const { Builder, By, Key, until } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    const fs = require("fs");
    const path = require("path");
    let fileName_json = '../files/json/' + numberInKatalog + '.json';
    let files_text = fs.readFileSync(fileName_json, 'utf8');
    files_text = JSON.parse(files_text);
    let email_pin = files_text.mail_01;
    let parole_pin = files_text.password_01;

    console.log(email_pin);
    console.log(parole_pin);



    const trevoga_00 = require("./function/trevoga_00");

    const options = new chrome.Options();
    let adressParent = __dirname.replace("\\pinterest\\scenarii\\user_modules", '').replace("/pinterest/scenarii/user_modules", '');
    let adressZiip = path.join(adressParent, `/files/ipPort/${numberInKatalog}/proxy_auth.zip`);
    const userProfilePath = path.join(adressParent, `/Browsers_chrome/Browser_chrome_${numberInKatalog}/Default`);

    const { PageLoadStrategy } = require("selenium-webdriver/lib/capabilities");
    options.setPageLoadStrategy(PageLoadStrategy.NONE);

    options.addArguments(`useAutomationExtension=False`, `disable-blink-features=AutomationControlled`, `window-size=950,1350`, `window-position=10,10`, `user-data-dir=${userProfilePath}`, `profile-directory=Profile 1`);

    function encode(file) {
        var stream = fs.readFileSync(file);
        return new Buffer.from(stream).toString('base64');
    }

    options.addExtensions(encode(adressZiip));
    let parrentAdress = path.join(__dirname.replace("\\pinterest\\scenarii\\user_modules", '').replace("/pinterest/scenarii/user_modules", ''));
    options.addExtensions(encode(`${parrentAdress}/files/webrtc-control-master.zip`));

    /**/

    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();


    originalWindow = await driver.getWindowHandle();
    await trevoga_00.sleep(2000);
    await trevoga_00.clickLocationNone(driver);
    await trevoga_00.sleep(2000);
    await driver.get('https://browserleaks.com/geo');
    await trevoga_00.sleep(5000);
    await driver.get('https://yandex.ru/');
    await trevoga_00.sleep(5000);

    massivForReturn = [driver, originalWindow, email_pin, parole_pin];
    return massivForReturn;

    //await driver.quit();
};
module.exports.withoptions = withoptions;

//функция входа с вызовом формы ЛОГИН_ПАРОЛЬ
async function pin_vhod(driver, email_pin, parole_pin) {
    // await driver.manage().setTimeouts( { implicit: 10000 } );
    const trevoga_00 = require("./function/trevoga_00");
    const { Builder, By, Key, until } = require('selenium-webdriver');
    await driver.get('https://www.pinterest.ru/');
    await trevoga_00.sleep(5000);
    //let random_seconds = trevoga_00.randomInteger(5, 6) * 1000;
    //trevoga_00.sleep(random_seconds);
    let findElements_massiv = await driver.findElements(By.css("[data-test-id='simple-login-button'] button"));
    if (!!findElements_massiv.length) {
        random_seconds = trevoga_00.randomInteger(3, 4) * 1000;
        await driver.findElement(By.css("[data-test-id]>button")).click();
        trevoga_00.sleep(random_seconds);
        findElements_massiv = await driver.findElements(By.css('input[id="email"]'));
        if (!!findElements_massiv.length) {
            await driver.findElement(By.css('input[id="email"]')).sendKeys(email_pin);
            trevoga_00.sleep(random_seconds);
            await driver.findElement(By.css('input[id="password"]')).sendKeys(parole_pin);
            trevoga_00.sleep(random_seconds);
            await driver.findElement(By.css("[data-test-id = 'registerFormSubmitButton']>button")).click();
            trevoga_00.sleep(random_seconds);
            findElements_massiv = await driver.findElements(By.css('span[id="email-error"]'));
            trevoga_00.sleep(random_seconds);
            if (!!findElements_massiv.length) {
                await trevoga_00.trevoga(driver);
            } else { console.log('Вход через форму ЛОГИН_ПАРОЛЬ прошел успешно') }
        } else { console.log('Не вижу форму ЛОГИН_ПАРОЛЬ') }
    } else { console.log('Не вижу кнопку войти') }
};
module.exports.pin_vhod = pin_vhod;
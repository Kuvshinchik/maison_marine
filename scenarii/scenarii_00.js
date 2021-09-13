//это сценарий заход на Пинтерест через сохраненный браузер с прокси


async function pinterestPerepost(numberInKatalog) {
    const { Builder, By, Key, until } = require('selenium-webdriver');
    let trevoga_00 = await require('./user_modules/function/trevoga_00.js');
    const withoptions = await require("./user_modules/withoptions.js");
    const pinterestPerepost = await require("./user_modules/pinterestPerepost.js");
    massivForReturn = await withoptions.withoptions(numberInKatalog);
    driver = massivForReturn[0];
    originalWindow = massivForReturn[1];
    


    let findElements_massiv = await driver.findElements(By.css("[id=\"main-message\"] h1")); //проверяем есть ли подключение к Интернету
    if (!findElements_massiv.length) {
   
    let email_pin = massivForReturn[2];
    let parole_pin = massivForReturn[3];
    await withoptions.pin_vhod(driver, email_pin, parole_pin);
    await pinterestPerepost.pinterestPerepost(driver, numberInKatalog);
    return massivForReturn;

    } else {
        console.log('Нет подключения к Интернету')
        return massivForReturn;
    }
    
}
module.exports.pinterestPerepost = pinterestPerepost;

/*
 try {
    } catch (error) { console.log(error) }

*/
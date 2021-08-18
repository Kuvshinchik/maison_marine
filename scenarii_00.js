//это сценарий поиска на Ярмарке через ключевые слова

async function YarmarkaWithPoisk(numberInKatalog) {
    try {

        const { Builder, By, Key, until } = require('selenium-webdriver');
        let trevoga_00 = await require('./user_modules/function/trevoga_00.js');
        const yarmarkaPoisk = await require("./user_modules/yarmarkaPoisk.js");
        const vhod_proxy = await require("./user_modules/vhod_proxy.js");

        let driver = await vhod_proxy.vhodWithZip(numberInKatalog);
        await trevoga_00.sleep(5000);
        await driver.get('https://2ip.ru/');
        await trevoga_00.sleep(5000);


        let findElements_massiv = await driver.findElements(By.css("[id=\"main-message\"] h1")); //проверяем есть ли подключение к Интернету
        if (!findElements_massiv.length) {
            await yarmarkaPoisk.yarmarkaPoisk(driver);
            await trevoga_00.sleep(5000);            
            return driver;

        } else {
            console.log('Нет подключения к Интернету')
            return driver;
        }

        //await pinterestYarmarka01.nakrutkaYarmarka(driver, jMin, jMax, 'C:/copy/node/pinterest/files/katalog/2/6.csv');

    } catch (error) { console.log(error) }
}
module.exports.YarmarkaWithPoisk = YarmarkaWithPoisk;


//это сценарий накрутки на Ярмарку через Пинтерест и ВКонтакте

async function nakrutkaYarmarkaWithPinterest(numberInKatalog, jMin, jMax, numberAccauntForpublic, papkaForpublic) {
    try {
        const path = require('path');
        const { Builder, By, Key, until } = require('selenium-webdriver');
        let trevoga_00 = await require('./user_modules/function/trevoga_00.js');
        const pinterestYarmarka01 = await require("./user_modules/pinterestYarmarka01.js");
        const vhod_proxy = await require("./user_modules/vhod_proxy.js");

        let driver = await vhod_proxy.vhodWithZip(numberInKatalog);
        await trevoga_00.sleep(5000);
        await driver.get('https://2ip.ru/');
        await trevoga_00.sleep(5000);

        let findElements_massiv = await driver.findElements(By.css("[id=\"main-message\"] h1")); //проверяем есть ли подключение к Интернету
        if (!findElements_massiv.length) {
            //let originalWindow = await driver.getWindowHandle();
            //let newWindows,temp_02;
            let parrentAdress = path.join(__dirname.replace("\\yarmarka\\scenarii", ''));
            driver = await pinterestYarmarka01.nakrutkaYarmarka(driver, jMin, jMax, `${parrentAdress}/pinterest/files/katalog/${papkaForpublic}/${numberAccauntForpublic}.csv`, numberAccauntForpublic);
            await trevoga_00.sleep(5000);
            /*let newWindows = await driver.getAllWindowHandles();
            let countHandle = await newWindows.length;
            await trevoga_00.sleep(5000);
            //console.log(newWindows.length);
            let handle;
            for (let i = 1; i < countHandle; i++) {
                handle = await newWindows[i - 1];
                await driver.switchTo().window(handle);                
                await driver.close();
            }
            newWindows = await driver.getAllWindowHandles();
            handle = await newWindows[0];
            await driver.switchTo().window(handle)
            await trevoga_00.sleep(5000);*/
            return driver;

        } else {
            console.log('Нет подключения к Интернету')
            return driver;
        }

        //await pinterestYarmarka01.nakrutkaYarmarka(driver, jMin, jMax, 'C:/copy/node/pinterest/files/katalog/2/6.csv');

    } catch (error) { console.log(error) }
}
module.exports.nakrutkaYarmarkaWithPinterest = nakrutkaYarmarkaWithPinterest;

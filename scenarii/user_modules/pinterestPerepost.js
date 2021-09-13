async function pinterestPerepost(driver, numberInKatalog) {

    const fs = require("fs");
    const { Builder, By, Key, until } = require('selenium-webdriver');
    const trevoga_00 = require("./function/trevoga_00.js");
    const path = require("path");

    let fileName_json = '../files/json/' + numberInKatalog + '.json';
    let files_text = fs.readFileSync(fileName_json, 'utf8');
    files_text = JSON.parse(files_text); //вывели и рапарсили объект свойств аккаунта
    let friends_main = files_text.friends_main[0]; //зафиксирововали номер аккаунта-друга куда будем заходить и перепощивать Пины
    let status = files_text.status //фиксируем глубину перепоста, чтобы знать откуда брать и куда сохранять

    let fileName_jsonFriend = '../files/json/' + friends_main + '.json';
    let files_textFriend = fs.readFileSync(fileName_jsonFriend, 'utf8');
    files_textFriend = JSON.parse(files_textFriend); //вывели и рапарсили объект свойств Друга
    let url_00Friend = files_textFriend.url_00 //фиксируем адрес рабочей страницы Друга
    await driver.get(url_00Friend);
    await trevoga_00.sleep(5000);
    let findElements_massiv = await driver.findElements(By.css("[data-test-id = user-follow-button] button div")); //проверяем есть div предложением ПОДПИСАТЬСЯ

    if (!!findElements_massiv.length) {
        let textTemp = await findElements_massiv[0].getText();
        textTemp = await textTemp.replace(/\s/g, '');
        if (textTemp == 'Подписаться') {            
                await findElements_massiv[0].click();
                await trevoga_00.sleep(5000);
        }
    }

}
module.exports.pinterestPerepost = pinterestPerepost;


//ф-ция захода на Пинтерест, на Пинтересте подгружаем ПИН с сылкой на Ярмарку, по ней идем на Ярмарку.

async function nakrutkaYarmarka(driver, jMin, jMax, adressPinNakrutka, numberAccauntForpublic) {

    const fs = require("fs");
    const { Builder, By, Key, until } = require('selenium-webdriver');
    const trevoga_00 = require("./function/trevoga_00.js");

    let newWindows, temp_02, findElements_massiv, massivIpPort, adressPinVk;

    /* findElements_massiv = await driver.findElements(By.css("h1")); //проверяем есть ли подключение к Интернету
    if (!!findElements_massiv.length) {
        let textTemp = await findElements_massiv[0].getText();

        if ((await textTemp.indexOf('Нет подключения к Интернету')) > -1) {
            console.log(await textTemp.indexOf('Нет подключения к Интернету'));
            console.log(1111);
            
            return;
        }
    }
 */

    //try {
    //цикл просмотра ПИНов, как правило jMin= jMax, поэтому просматриваем с одного IP один ПИН, но можно изменять параметры
    for (let j = jMin; j <= jMax; j++) {
        massivIpPort = fs.readFileSync(adressPinNakrutka, 'utf8').trim().split('\n');

        adressPinVk = massivIpPort[j]
        await driver.get(adressPinVk);
        originalWindow = await driver.getWindowHandle();
        await trevoga_00.sleep(5000);
        findElements_massiv = await driver.findElements(By.css("body")); //чтобы протянуть страницу нужно вызвать локатор body
        await trevoga_00.sleep(1000);

        if (!!findElements_massiv.length) {
            await findElements_massiv[0].sendKeys('', Key.END); //протягиваем вниз страницу
            await trevoga_00.sleep(5000);
            await findElements_massiv[0].sendKeys('', Key.HOME); //протягиваем вверх страницу
            await trevoga_00.sleep(5000);
            //Чтобы появилась вся картинка сначала протягиваем ее вниз потом обратно вверх
        } else {
            // await trevoga_00.trevoga(driver);
            console.log('Споткнулись на БОДИ')
        }

        findElements_massiv = await driver.findElements(By.css("[data-test-id=\"pin-closeup-image\"]")); //это селектор ПИНа, т.е. в принципе страница с ПИНом появилась или нет
        if (!!findElements_massiv.length) {
            //findElements_massiv = await driver.findElements(By.css("[data-test-id=\"pin-attribution\"] a")); //на ПИНе справа ссылка на хозяина ПИНа, в принципе есть эта ссылка или нет
            findElements_massiv = await driver.findElements(By.css("[data-test-id=\"pin-attribution\"]")); //поменяли селектор 2021_06_25
            if (!!findElements_massiv.length) {
                let hrefJury = await findElements_massiv[0].getAttribute('href'); //забираем эту ссылку и сравниваем его, если не мой то проваливаемся


                let number_accaunt = numberAccauntForpublic; //номер аккаунта  
                let fileName_json = '../files/json/' + number_accaunt + '.json';
                let files_text = fs.readFileSync(fileName_json, 'utf8');
                files_text = JSON.parse(files_text);
                let hrefJuryTemp = hrefJury.replace('com', 'ru');
                let urlTemp = files_text.url_00.replace('com', 'ru');
                if ((hrefJuryTemp == 'https://www.pinterest.ru/juryi_001/') || (hrefJuryTemp == urlTemp)) {


                    //Это костыль НАДО ИСПРАВИТЬ, для проверки изменили переменную findElements_massiv, возвращаем нужный параметр
                    await trevoga_00.sleep(2000);
                    findElements_massiv = await driver.findElements(By.css("[data-test-id=\"pin-closeup-image\"]")); //это селектор ПИНа, который брали выше потом потеряли теперь восстанавлмваем, чтобы на него навести мышь
                    await trevoga_00.sleep(5000);
                    //Это костыль НАДО ИСПРАВИТЬ

                    //window.scrollBy(0, 50);

                    //наводим мышь на ПИН, не перепроверяем, потому что уже проверяли выше
                    await driver.actions({ bridge: true })
                        .move({ origin: findElements_massiv[0] })
                        .pause(2000)
                        .release()
                        .perform();
                    await trevoga_00.sleep(5000);
                    findElements_massiv = await driver.findElements(By.css(".imageDomainLinkHover a"));  //после наведения мыши появляется этот селектор со ссылкой на магазин Ярмарки
                    if (!!findElements_massiv.length) {
                        hrefJury = await findElements_massiv[0].getAttribute('href'); //забираем ссылку и смотрим есть ли там ссылка на Ярмарку, если нет то проваливаемся
                        if ((hrefJuryTemp.indexOf('livemaster')) == -1) {
                            await driver.actions({ bridge: true })
                                .move({ origin: findElements_massiv[0] })
                                .pause(1000)
                                .release()
                                .perform();
                            //После прокрутки туда сюда элемент появляется в полный рост, поэтому ссылка на Ярмарку внизу и не видна, когда прокручиваем к ней Пинтерест выкидывает модальное окно и тем самым ломает DOM, поэтому еще раз определяем локатор ссылки, а потом кликаем элемент                                   
                            await trevoga_00.sleep(1000);
                            findElements_massiv = await driver.findElements(By.css(".imageDomainLinkHover a"));  //после наведения мыши появляется этот селектор 
                            await trevoga_00.sleep(1000);
                            await driver.actions({ bridge: true })
                                .move({ origin: findElements_massiv[0] })
                                .pause(1000)
                                .click(findElements_massiv[0])  //жму кнопку активируя ссылку перехода на ярмарку
                                .release()
                                .perform();

                            await trevoga_00.sleep(5000);
                            (await driver).close();
                            await trevoga_00.sleep(2000);
                            newWindows = await driver.getAllWindowHandles();
                            await newWindows.forEach(handle => { if (handle !== originalWindow) { temp_02 = handle } });

                            if (!!temp_02) {
                                await driver.switchTo().window(temp_02); //переходим во второе окно, где загрузилась ЯРМАРКА 
                            } else { console.log('Проблема со вторым окном, которое должно было открыться с переходом на ЯРМАРКУ') };
                            await trevoga_00.sleep(5000);

                            /*
                         //Это раздел работы с БОНУСНЫМ окном =============================================
                         findElements_massiv = await driver.findElements(By.css(".loyalty-coupon")); //проверяем выскочила форма бонуса или нет
                         if (!!findElements_massiv.length) {
                             //console.log('выскочила форма БОНУСА');
                             findElements_massiv = await driver.findElements(By.css("span.loyalty-coupon__close"));
                             if (!!findElements_massiv.length) {
                                 //console.log('ЗАКРЫВАЕМ форму БОНУСА');
                                 await findElements_massiv[0].click();
                             }
                         } else { console.log('Не было БОНУСНОГО ОКНА') };
                         //Это раздел работы с БОНУСНЫМ окном ================================================


                      
                         Это блок рекламы, которая выезжала справа внизу, сейчас ее нет, поэтому закомментировал
                                                         await trevoga_00.sleep(5000);
                                                         findElements_massiv = await driver.findElements(By.css(".close-btn.js-close-btn")); //проверяем выскочила реклама или нет
                         
                                                         if (!!findElements_massiv.length) {
                                                             //console.log('ЗАКРЫВАЕМ рекламу');
                                                             await findElements_massiv[0].click();
                         
                                                         }
                         
                         */


                            //findElements_massiv = await driver.findElements(By.css("[data-event=\"desktopFilterSection\"] a"));  //на странице магазина Ярмарки это массив карточек категорий
                            //await trevoga_00.sleep(5000);
                            // if (!!findElements_massiv.length) {
                            /*let randomTovarMax = await findElements_massiv.length - 1;
                            let randomTovar = await trevoga_00.randomInteger(0, randomTovarMax)
                            //  рандомно генерируем номер отображенных категорий на Ярмарке, чтобы перейти по нему 
                            let postYarmarka = await findElements_massiv[randomTovar];
                            await postYarmarka.click();
                            await trevoga_00.sleep(5000);*/



                            let countBrod = await trevoga_00.randomInteger(1, 5);
                            for (let brod = 1; brod <= countBrod; brod++) {
                                await trevoga_00.sleep(5000);
                                findElements_massiv = await driver.findElements(By.css("a.item-preview__image-container")); //после того как зашли в категория, проверяем есть ли товары
                                await trevoga_00.sleep(5000);
                                if ((!!findElements_massiv.length) && (findElements_massiv[0].isDisplayed())) {
                                    //console.log(1111111)
                                    randomTovarMax = await findElements_massiv.length - 1;
                                    randomTovar = await trevoga_00.randomInteger(0, randomTovarMax)
                                    //  рандомно генерируем номер отображенных товаров на Ярмарке, чтобы перейти по нему 
                                    let postYarmarka = await findElements_massiv[randomTovar];
                                    await driver.executeScript("arguments[0].scrollIntoView()", postYarmarka); //протянули к элементу postYarmarka
                                    await postYarmarka.click();
                                    await trevoga_00.sleep(5000);
                                } else { console.log('Из категорий зашли в товары, но товаров нет!!!!') };
                            }
                            //await driver.executeScript(`window.close()`);
                            await trevoga_00.sleep(5000);

                            /*
                                                            //проверить этот абзац если не поможет УДАЛИТЬ
                                                            newWindows = await driver.getAllWindowHandles();
                                                            await newWindows.forEach(handle => { if (handle !== originalWindow) { temp_02 = handle } });
                                                            //проверить этот абзац если не поможет УДАЛИТЬ
                            
                            
                                                            if (!!temp_02) {
                                                                await driver.switchTo().window(temp_02); //еще раз активируем второе окно, на случай ошибки прежде чем его закрыть
                                                                (await driver).close();
                                                                await trevoga_00.sleep(2000);
                                                            } else { console.log('Проблема со вторым окном, которое где-то потерялось!') };
                            
                            
                                                            await trevoga_00.sleep(2000);
                           

                            if (!!originalWindow) {
                                await driver.switchTo().window(originalWindow);
                            } else {
                                await trevoga_00.sleep(5000);
                                console.log('Не нашел оригинальную вкладку, обратить внимание - сколько вкладок открыто!')
                            };

                            findElements_massiv = await driver.findElements(By.css("[data-test-id=\"full-page-signup-close-button\"] button"));  // ПРИ протягивании это форма вылезает с предложением войти или зарегистрироваться
                            await trevoga_00.sleep(1000);
                            if (!!findElements_massiv.length) {
                                postYarmarka = await findElements_massiv[0];
                                await postYarmarka.click();
                                console.log('выскочила форма SIGN, мы ее кликнули');
                            } */
                            //} else { console.log('либо не перешел во вторую вкладку, либо Ярмарка чудит') }

                        } else { console.log('Пинтерест заменил ссылку, ссылка не моя') }
                    } else { console.log('навел мышь на Пин, но не обнаружил кнопку со ссылкой перехода на Ярмарку') }
                } else { console.log(hrefJury + ' - это левый Пин'); }
            } else { console.log('нет ссылки на Юрия Кувшинова') }
        } else { console.log('нет запрашиваемого Пина') }
    }
    return driver;
    // } catch (error) { console.log(error) }
};
module.exports.nakrutkaYarmarka = nakrutkaYarmarka;


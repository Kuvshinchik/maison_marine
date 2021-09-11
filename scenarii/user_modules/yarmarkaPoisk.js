

async function yarmarkaPoisk(driver) {
    const { Builder, By, Key, until } = require('selenium-webdriver');
    const trevoga_00 = require('./function/trevoga_00');

    await driver.get('https://www.livemaster.ru/'); //заходим на Ярмарку напрямую без ссылок
    await trevoga_00.sleep(5000);
    let findElements_massiv;

    await driver.manage().setTimeouts({ implicit: 30000 });
    findElements_massiv = await driver.findElements(By.css(".loyalty-coupon")); //проверяем выскочила форма бонуса или нет
    await driver.manage().setTimeouts({ implicit: 0 });

    if (!!findElements_massiv.length) {
        //console.log('выскочила форма БОНУСА');
        findElements_massiv = await driver.findElements(By.css("span.loyalty-coupon__close"));
        if (!!findElements_massiv.length) {
            //console.log('ЗАКРЫВАЕМ форму БОНУСА');
            try {
                await findElements_massiv[0].click();
            } catch (error) {
                let stack = new Error().stack;
                console.log(stack);
                console.log(error);
                console.log('проблема с формой бонуса, не кликает, видимо криво загрузилась страница');
                return;
            }
        }
    }
    await trevoga_00.sleep(2000);

    findElements_massiv = await driver.findElements(By.css("input[name=\"search\"]")); //проверяем есть строка для поиска
    if (!!findElements_massiv.length) {
        let massivKeyWords = ['чайки', 'набор из двух игрушек', 'морская тематика', 'смешной подарок', 'интерьерная игрушка Чайка', 'для детской комнаты', 'морской стиль в интерьере', 'тельняшка', 'пингвин', 'полоска', 'морской декор', 'морской стиль', 'интерьерная игрушка', 'для детской комнаты'];
        //let massivKeyWords = ['авторская работа','ручная работа', 'для детей', 'мягкие игрушки', 'подарок'];   
        let randomKeyWordsMax = massivKeyWords.length - 1;
        let randomKeyWordsCount = await trevoga_00.randomInteger(0, randomKeyWordsMax);

        await findElements_massiv[0].click(); //наводим курсор в строку поиска и кликаем, активируя строку длч дальнейшего набора
        await trevoga_00.sleep(1000);
        await findElements_massiv[0].sendKeys(massivKeyWords[randomKeyWordsCount]); //набиваем текст
        await trevoga_00.sleep(3000);
        await findElements_massiv[0].sendKeys('', Key.ENTER); //жмем Энтер

        //await trevoga_00.sleep(15000);
        await driver.manage().setTimeouts({ implicit: 30000 });
        findElements_massiv = await driver.findElements(By.css("a.item-preview__master-name")); //массив всех найденных элементов
        await driver.manage().setTimeouts({ implicit: 0 });
        if (!!findElements_massiv.length) {

            let endJ = 7;
            for (let j = 0; j <= endJ; j++) {

                for (let n = 0; n <= 10; n++) {
                    await trevoga_00.sleep(3000);
                    await driver.executeScript("window.scrollBy(0, 1000);"); //прокрутка страницы 12 раз по 1000 пикселей с интервалом 3 секунды
                }

                findElements_massiv = await driver.findElements(By.css("a.item-preview__master-name")); //массив всех найденных элементов
                let countCiklSeachYarmarka = await findElements_massiv.length;
                for (let i = 0; i < countCiklSeachYarmarka; i++) { //цикл проверки всех элементов страницы на предмет наличия MaisonMarine

                    let textMaisonMarine = await findElements_massiv[i].getText(); //ищем ссылку на MaisonMarine и жмем на нее
                    if (textMaisonMarine == 'MaisonMarine') {
                        findElements_massiv = await driver.findElements(By.css("body")); //чтобы протянуть страницу нужно вызвать локатор body
                        await findElements_massiv[0].sendKeys('webdriver', Key.HOME); //протягиваем вверх страницу
                        await trevoga_00.sleep(5000);


                        //если нашли, то кликнули посмотрели и вызвали функцию-бродилку, потом закрыли вкладку, перешли на первую вкладку и вышли из главной функции
                        findElements_massiv = await driver.findElements(By.css("a.item-preview__image-container")); //опять массив всех товаров на этой странице
                        if (!!findElements_massiv.length) {
                            await driver.executeScript("arguments[0].scrollIntoView()", findElements_massiv[i]); //протянули к элементу Мезон Марин
                            await trevoga_00.sleep(3000);
                            //await findElements_massiv[i].click();
                            await driver.executeScript("arguments[0].click();", findElements_massiv[i]); //клик по товару мзено Марин, который нашли на странице
                            await trevoga_00.sleep(5000);

                            console.log(`По запросу - ${massivKeyWords[randomKeyWordsCount]}` + '\n' + 'товар найден, он находится на странице - ' + `${j + 1}` + '\n в позиции - ' + `${i + 1}`);
                            j = endJ + 10;
                            break;
                        } else { console.log('На странице есть Мезон, но он не хочет с ним взаимодействовать идем на следующую страницу ПАГИНАЦИИ, из цикла перебора товаров выходим'); break; }
                    }


                }//эта скобочка от второго цикла перебора товаров на одной из семи страниц

                if (j <= endJ) {

                    try {

                        findElements_massiv = await driver.findElements(By.css(".mobile-pagination a")); //пагинация

                        if (await findElements_massiv[0].isDisplayed()) {
                            //await findElements_massiv[1].click(); //кликаем пагинацию
                            await driver.executeScript("arguments[0].click();", findElements_massiv[1]); //кликаем пагинацию
                            //await trevoga_00.sleep(5000);
                        } else {
                            findElements_massiv = await driver.findElements(By.css("a .hide.pagebar__arrow--right"));
                            await driver.executeScript("arguments[0].click();", findElements_massiv[0]); //кликаем пагинацию
                        }
                    } catch (error) { console.log(error); console.log('проблема с пагтнацие, не работает isDisplayed, поэтому выхожу из цикла'); break; }

                } else { break; }

                if (j == endJ) {
                    console.log(`По запросу - ${massivKeyWords[randomKeyWordsCount]}, результатов нет, прошел ${endJ} страниц в поиске`)
                }

            }//эта скобочка от первого цикла ПАГИНАЦИИ
            //если не нашли, в цикле смотрим есть пагинация, если есть кликаем и идем на следующую страницу и все повторяем

        } else { console.log(`По нашему запросу - ${massivKeyWords[randomKeyWordsCount]}, результатов нет, или нет страницы`) }
    } else { console.log("Нет строки поиска на странице") }


    //await trevoga_00.final(driver);
    //await trevoga_00.trevoga(driver);
    //await driver.quit();

};
module.exports.yarmarkaPoisk = yarmarkaPoisk;


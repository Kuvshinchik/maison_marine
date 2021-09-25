async function pinterestPerepost(driver, numberInKatalog, massivForReturn) {
    const withoptions = await require("./withoptions.js");
    const fs = require("fs");
    const { Builder, By, Key, until } = require('selenium-webdriver');
    const trevoga_00 = require("./function/trevoga_00.js");
    const path = require("path");
    let countSaveElement = 0;

    let fileName_json = '../files/json/' + numberInKatalog + '.json';
    let files_text = fs.readFileSync(fileName_json, 'utf8');
    files_text = JSON.parse(files_text); //вывели и рапарсили объект свойств аккаунта
    let friends_main = files_text.friends_main[0]; //зафиксирововали номер аккаунта-друга куда будем заходить и перепощивать Пины
    let status = files_text.status //фиксируем глубину перепоста, чтобы знать куда сохранять
    let name_doska = files_text.massiv_name_doska[status] //фиксируем название доски куда будем сохранять
    let fileName_jsonFriend = '../files/json/' + friends_main + '.json';
    let files_textFriend = fs.readFileSync(fileName_jsonFriend, 'utf8');
    files_textFriend = JSON.parse(files_textFriend); //вывели и рапарсили объект свойств Друга


    if (files_textFriend.public_count[0] > files_text.public_count[0]) {  //если есть разница в репостах, то начинаем репостить; счетчик репостов первый элемент соответствующего массива в файле JSON аккаунта
        let countCiklSave = files_textFriend.public_count[0] - files_text.public_count[0];
        let email_pin = massivForReturn[2];
        let parole_pin = massivForReturn[3];
        await withoptions.pin_vhod(driver, email_pin, parole_pin);
        await trevoga_00.sleep(15000);
        let url_00Friend = files_textFriend.url_00 //фиксируем адрес рабочей страницы Друга
        let statusFriend = files_textFriend.status //фиксируем статус друга, чтобы знать откуда брать
        let name_doskaFriend = files_textFriend.massiv_name_doska[statusFriend] //фиксируем название доски откуда будем брать
        let urlDoskaFriend = `${url_00Friend}${name_doskaFriend}/`;
        await driver.get(url_00Friend);
        //await driver.manage().timeouts().implicitlyWait(30000);
        await driver.manage().setTimeouts( { implicit: 30000 } );

        let findElements_massiv = await driver.findElements(By.css("[data-test-id = profile-header]")); //ждем загрузку
        //await driver.manage().timeouts().implicitlyWait(0);
        await driver.manage().setTimeouts( { implicit: 0 } );

        findElements_massiv = await driver.findElements(By.css("[data-test-id = user-follow-button] button div")); //проверяем есть div предложением ПОДПИСАТЬСЯ
        let textTemp;
        if (!!findElements_massiv.length) {
            textTemp = await findElements_massiv[0].getText();
            textTemp = await textTemp.replace(/\s/g, '');
            if (textTemp == 'Подписаться') {
                await findElements_massiv[0].click();
                await trevoga_00.sleep(5000);
            }
        }

        console.log(`есть разница`)
        await driver.get(urlDoskaFriend); //заходим на Доску Друга, чтобы отрепоститься
        //await driver.manage().timeouts().implicitlyWait(30000);
        await driver.manage().setTimeouts( { implicit: 30000 } );
        findElements_massiv = await driver.findElements(By.css("[data-test-id = LegoBoardHeader__main] h1")); //проверяем есть или нет заголовок доски
        //await driver.manage().timeouts().implicitlyWait(0);
        await driver.manage().setTimeouts( { implicit: 0 } );
        if (!!findElements_massiv.length) {
            textTemp = await findElements_massiv[0].getText();
            textTemp = await textTemp.replace(/\s/g, '');
            if (textTemp == name_doskaFriend) {   //если название Доски то, начинаем репоститься
                //console.log(`${await driver.getCurrentUrl()}`)




                for (let j = 0; j < countCiklSave; j++) {
                    await driver.manage().setTimeouts( { implicit: 30000 } );
                    findElements_massiv = await driver.findElements(By.css("[data-test-id = non-story-pin-image] img")); //проверяем есть или нет Пины
                    await driver.manage().setTimeouts( { implicit: 0 } );
                    
                    if (!!findElements_massiv.length) {


                        //наводим мышь на ПИН
                        await trevoga_00.sleep(7000);
                        await driver.actions({ bridge: true })
                            .move({ origin: findElements_massiv[j] })
                            .pause(2000)
                            .release()
                            .perform();
                        await trevoga_00.sleep(5000);

                        findElements_massiv = await driver.findElements(By.css("[data-test-id = PinBetterSaveDropdown] div")); //после наведения мышки активируются дополнительные элементы, берем название активируемой доски для сохранения
                        if (!!findElements_massiv.length) {
                            textTemp = await findElements_massiv[0].getText();
                            textTemp = await textTemp.replace(/\s/g, '');
                            if (textTemp == name_doska) {   //если название Доски то которое нам необходимо, начинаем сохранять
                                findElements_massiv = await driver.findElements(By.css("[data-test-id = PinBetterSaveButton] div")); //после наведения мышки активируются дополнительные элементы, берем текст кнопки СОХРАНИТЬ
                                textTemp = await findElements_massiv[0].getText();
                                textTemp = await textTemp.replace(/\s/g, '');
                                if (textTemp == 'Сохранить') {
                                    await findElements_massiv[0].click(); //жмем кнопку сохранить
                                    await trevoga_00.sleep(3000);
                                    countSaveElement++
                                } else { console.log(`Кнопка сохранить не содержит текст СОХРАНИТЬ`) }
                            } else {
                                findElements_massiv = await driver.findElements(By.css("[data-test-id = boardSelectionDropdown]")); //если название ДОСКИ не совпадает, активируем выпадающее меню
                                if (!!findElements_massiv.length) {
                                    await findElements_massiv[0].click(); //жмем и тем самым активируем выпадающее меню
                                    await trevoga_00.sleep(3000);
                                    findElements_massiv = await driver.findElements(By.css("[data-test-id = boardWithoutSection]")); //в выпадающем меню забираем элементы с названием ДОСОК
                                    if (!!findElements_massiv.length) {
                                        let countNameBoard = findElements_massiv.length //кол-во этих элементов, создаем цикл и ищем элемент с нужной ДОСКОЙ
                                        for (let i = 0; i < countNameBoard; i++) {
                                            textTemp = await findElements_massiv[i].getText();
                                            textTemp = await textTemp.replace(/\s/g, '');
                                            if (textTemp == name_doska) {
                                                let tempElement = await driver.findElements(By.css(`[data-test-id = boardWithoutSection] [title=${name_doska}]`)); //если название ДОСКИ совпадет то забираем этот элемент
                                                await tempElement[0].click();  //и кликаем на него
                                                await trevoga_00.sleep(3000);
                                                countSaveElement++
                                                break; //и выходим из цикла
                                            }
                                        }
                                    } else { console.log(`Не вижу названия ДОСОК`) }
                                } else { console.log(`Не нашел выпадающее меню с названием ДОСОК`) }
                            }
                        } else { console.log(`Не активировались дополнительные опции, не вижу название Доски для сохранения`) }
                    } else { console.log(`Здесь нет Пинов`) }
                }
                files_text.public_count[0] = countCiklSave + files_text.public_count[0];
                console.log(files_text.public_count[0]);


            } else { console.log(`Зашли не туда, нужно в ${name_doskaFriend}, а попали в ${await driver.getCurrentUrl()}`) }
        } else { console.log(`Нет заголовка запрашиваемой доски ${name_doskaFriend}`) }
    } else { console.log(`Нет разницы в репостах, поэтому вышел из скрипта`) }
}
module.exports.pinterestPerepost = pinterestPerepost;




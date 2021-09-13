//Этот проект предназначен для накрутки трафика на сайте Ярмарка мастеров.
//Робот заходит на Пинтерест и оттуда переходит по ссылке на Ярмарку мастеров.
//Второй робот заходит напрямую на Ярмарку мастеров и через поисковый запрос находит нужный товар и переходит на него.

const path = require('path');
const fs = require("fs");
let pahtParametrCikl = path.join(__dirname.replace("\\pinterest", '').replace("/pinterest", ''));
pahtParametrCikl = `${pahtParametrCikl}/parametr/1.txt`;
let massivParametrCikl = fs.readFileSync(pahtParametrCikl, 'utf8').trim().split(':::');
let start = massivParametrCikl[0];
let end = massivParametrCikl[1];
let numberAccauntForpublic = massivParametrCikl[2]; //этот параметр и ниже параметр - это откуда берем адреса Пинов
let papkaForpublic = massivParametrCikl[3];
let variantApp = +massivParametrCikl[4];

async function pinterestPerepost(start, end) {
  let trevoga_00 = require('./scenarii/user_modules/function/trevoga_00.js');
  let driver, originalWindow, massivForReturn;

  for (let i = start; i <= end; i++) {
    console.log(i);
    const scenarii_00 = await require('./scenarii/scenarii_00.js');
    massivForReturn = await scenarii_00.pinterestPerepost(i);
    driver = massivForReturn[0];


    if (i != end) {
      try {
        (await driver).close();
      } catch (error) {
        console.log("app-файл, есть фокус, но не смог закрыть окно, сработал catch");
        console.log(error)
      }
      await trevoga_00.sleep(5000);
    } else {
      //await trevoga_00.final(driver);
      await driver.quit();
      await trevoga_00.sleep(5000);

      if (__dirname.indexOf('\:') != -1) {
        try {
          await trevoga_00.DeleteTarget('C:/Users/11/AppData/Local/Temp/', 'scoped_');
        } catch (error) { console.log(error) }

        try {
          await trevoga_00.DeleteTarget('C:/Users/Администратор/AppData/Local/Temp/', 'scoped_');
        } catch (error) { console.log(error) }
        try {
          await trevoga_00.DeleteTarget('C:/Users/11/AppData/Local/Temp/', 'chrome_BITS_');
        } catch (error) { console.log(error) }

        try {
          await trevoga_00.DeleteTarget('C:/Users/Администратор/AppData/Local/Temp/', 'chrome_BITS_');
        } catch (error) { console.log(error) }
      }
    }
  }
}


switch (variantApp) {
  case 1:
    pinterestPerepost(start, end);
    break;
  case 2:
    //require('./proba_05.js');
    require('./scenarii/user_modules/vhod_prosto.js');
    //require('./scenarii/user_modules/vhod_withoptions.js');
    // require('./files/ipPort/createZiip.js');
    break;
  default:
    require('./scenarii/user_modules/vhod_prosto.js');
    break;
}
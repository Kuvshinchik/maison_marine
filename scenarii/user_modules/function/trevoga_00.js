//функция паузы применение await не требуется
function sleep(msec) {
    const end = new Date().getTime() + msec;
    while (new Date().getTime() < end);
};
module.exports.sleep = sleep;

//функция поиска номера элемента в массиве элементов, входные селектор и текст, который ищем по всему элементу, в том числе и в атрибутах в count_01 передается массив findElements_massiv = await driver.findElements(By.css(...
//в content_00 передается массив искомого текста на нескольких языках
const poiskSelektora = async (content_00, count_01) => {   
    let massiv_index_selector = [];    
    let count_00 = count_01.length;
    if(!!count_00){
        for(let x_s = 0; x_s < content_00.length; x_s++){
            for(index_selector = 0; index_selector < count_00; index_selector++){
                let	content_01 = content_00[x_s].replace(/\r/g,'');
                let text_content_00 = await count_01[index_selector].getAttribute('outerHTML'); //выводит весь тег (innerHTML)
                //let text_content_00 = await count_01[index_selector].getText(); //выводит только текст (textContent)
                //console.log(text_content_00);
                if(text_content_00.indexOf(content_01) > -1){
                    massiv_index_selector.push(index_selector);
                }
            }
        }
    }
    let index_selektor_find = massiv_index_selector[(massiv_index_selector.length-1)]
    return index_selektor_find;
}
module.exports.poiskSelektora = poiskSelektora;

//открываем еще одну вкладку и запускаем файл музыки Время вперед Свиридова
async function trevoga (driver) {
    const path = require('path');
    let fileNameTemp = path.join(__dirname, '/muzyka.mp3');
    let newWindows, originalWindow, temp_02;
    originalWindow = await driver.getWindowHandle();
    await driver.executeScript(`window.open('','_blank')`);
    //await driver.switchTo().newWindow('window');
    newWindows = await driver.getAllWindowHandles();
    await newWindows.forEach(handle => { if (handle !== originalWindow) { temp_02 = handle } });
    await driver.switchTo().window(temp_02);
    await sleep(2000);
    await driver.get('http://maisonmarine.ru/]]]Other/yarmarka/music/muzyka.mp3');
        //sleep(240000);
};
module.exports.trevoga = trevoga;

//открываем еще одну вкладку и запускаем файл финальной музыки Чайковского 
async function final (driver) {
    const path = require('path');
    let fileNameTemp = path.join(__dirname, '/muzyka2.mp3');
    let newWindows, originalWindow, temp_02;
        originalWindow = await driver.getWindowHandle();        
        await  driver.executeScript(`window.open('','_blank')`);
        //await driver.switchTo().newWindow('window');
        newWindows = await driver.getAllWindowHandles();
        await newWindows.forEach(handle => {if(handle !== originalWindow){temp_02 = handle}});
        await driver.switchTo().window(temp_02);
        await sleep(2000);
        await driver.get('http://maisonmarine.ru/]]]Other/yarmarka/music/muzyka2.mp3');
        //sleep(240000);
};
module.exports.final = final;

//функция сервера для запуска мультимедийного файла в среде браузера из файловой системы 
function server_http() {
    const http = require('http');
    const server = http.createServer(function (req, res) {
        res.end();
    }).listen(4000);
    //sleep(5000);
    server.close(function () { console.log('Server closed!'); });
};
module.exports.server_http = server_http;

//функция генерация случайного целого числа в диапазоне
function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};
module.exports.randomInteger = randomInteger;

//функция скролла до последнего обозначенного элемента
async function scroll_for_last_selector(driver, massiv_webElement_00) {
    if(!!massiv_webElement_00.length){
    let countWebElement_00 = await massiv_webElement_00.length;
    countWebElement_00 = await countWebElement_00- 1;
    let webElement_last = await massiv_webElement_00[await countWebElement_00];
    await sleep(5000);
    if(!!webElement_last){
        await driver.executeScript("arguments[0].scrollIntoView()", webElement_last);
        await sleep(5000);
        return (await webElement_last);
    }else{
        console.log('Слишком длинный ПИН, не вижу ленты с другими ПИНами');
        const { Builder, By, Key, until } = require('selenium-webdriver'); 
        await driver.findElement(By.css('body')).sendKeys('webdriver', Key.END);
        await sleep(5000);
        massiv_webElement_00 = await driver.findElements(By.css("[data-test-id=\"pin\"]"));
        await sleep(2000);
        countWebElement_00 = await massiv_webElement_00.length;
        countWebElement_00 = await countWebElement_00 - 1;
        webElement_last = await massiv_webElement_00[await countWebElement_00];
        if(!!webElement_last){
        return (await webElement_last);
        //return (await massiv_webElement_00);
        }else{
        console.log('Все-таки какие-то проблемы с последним элементом');
        return;
        }
    }
}else{
        console.log('Переданный массив элементов в функцию \"scroll_for_last_selector\" пустой');
        return;
        }
}
module.exports.scroll_for_last_selector = scroll_for_last_selector;



//открыть файл и создать объект
async function ObjectMakeFromJison(number_accaunt) {
const fs = require("fs");
let fileName_json = './json/' + number_accaunt + '.json';
let files_text = fs.readFileSync(fileName_json, 'utf8');
files_text = JSON.parse(files_text);
return files_text;
};
 module.exports.ObjectMakeFromJison = ObjectMakeFromJison;
 
async function clickLocationNone(driver) {
    //const trevoga_00 = require("./function/trevoga_00");
    await driver.navigate().to("chrome://settings/content/location");
    sleep(3000);
    await driver.actions({ bridge: true })
        //.move({ x: 979, y: 159 })
        .move({ x: 500, y: 350 })
        .pause(1000)
        .press()
        .release()
        .perform();
    sleep(3000);

await driver.navigate().to("chrome://settings/content/idleDetection");
    sleep(3000);
    await driver.actions({ bridge: true })
        //.move({ x: 979, y: 159 })
        .move({ x: 500, y: 330 })
        .pause(1000)
        .press()
        .release()
        .perform();
    sleep(3000);


};
module.exports.clickLocationNone = clickLocationNone;


function DeleteTarget(folder, target) {
    const fs = require("fs");
    const rimraf = require("rimraf");
    let countFoldersAll = fs.readdirSync(folder).length;
    for (let i = 0; i < countFoldersAll; i++) {
        let file = fs.readdirSync(folder)[i];
        if (file.indexOf(target) !== -1) {
            try {
                let dirName = (folder + file + '/');
                rimraf.sync(dirName);
                //console.log('Файл успешно удален')
                countFoldersAll--;
                i--;
            } catch (error) {
                console.error(error)
            }
        }
    }
}
module.exports.DeleteTarget = DeleteTarget;


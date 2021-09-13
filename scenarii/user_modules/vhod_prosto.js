
let driver;
(async function () {
    const { Builder, By, Key, until } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    const trevoga_00 = require('./function/trevoga_00')
    driver = await new Builder()
        .forBrowser('chrome')
        //.setChromeOptions(options)
        .build();
    await driver.get('https://browserleaks.com/geo');
    
   /* 
    const Proxy = await require('browsermob-proxy').Proxy
  , proxy = new Proxy();

 await proxy.doHAR('https://www.pinterest.com', function(err, data) {
    if (err) {
        console.error('ERROR: ' + err);
    } else {
        fs.writeFileSync('yahoo.com.har', data, 'utf8');
    }
});*/
    //await trevoga_00.final(driver);
    //await trevoga_00.trevoga(driver);
    await driver.quit();


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
})();



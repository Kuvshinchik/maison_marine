let driver;

async function vhodSelenoid() {
    try {
        var options = new chrome.Options();

        var { remote } = await require('webdriverio');
        browser = await remote({
            capabilities: { browserName: 'chrome' }
        })

        options = {
             //hostname: 'selenoid:4444',
           hostname: 'localhost',
            port: 4444,
            capabilities: {
                browserName: 'chrome',
                browserVersion: '91.0',
                'selenoid:options': {
                    enableVNC: true,
                    enableVideo: false
                }
            }
        };
        var client = await webdriverio.remote(options);
       /* driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();*/
        await browser.navigateTo('https://browserleaks.com/geo');

        return browser;
    } catch (error) { console.log(error) }

}
module.exports.vhodSelenoid = vhodSelenoid;
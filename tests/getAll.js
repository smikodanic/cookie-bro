const puppeteer = require('puppeteer');
const os = require('os');

// get executable path for the browser
const osPlatform = os.platform(); // possible values are: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
let executablePath;
if (/^win/i.test(osPlatform)) {
  executablePath = '';
} else if (/^linux/i.test(osPlatform)) {
  executablePath = '/usr/bin/google-chrome';
}



const main = async () => {
  const pptrOpts = {
    executablePath,
    headless: false,
    devtools: false,  // Open Chrome devtools at the beginning of the test
    dumpio: false,
    slowMo: 130,  // Wait 130 ms each step of execution, for example chars typing

    // list of all args https://peter.sh/experiments/chromium-command-line-switches/
    args: [
      '--disable-dev-shm-usage',
      `--ash-host-window-bounds=1320x1050`,
      `--window-size=1320,1050`,
      `--window-position=700,20`,

      // required for iframe
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  };
  const browser = await puppeteer.launch(pptrOpts);
  const page = await browser.newPage();
  await page.setViewport({ width: 1800, height: 1000 });
  await page.goto('https://www.adsuu.com');

  // inject to Chromium browser via <script> tag
  await page.addScriptTag({ path: '../index.js' });

  const cookies = await page.evaluate(() => {
    const cookieBro = window.cookieBro;
    cookieBro.setOptions({
      domain: 'adsuu.com',
      path: '/',
      expires: 5, // number of hours or exact date
      secure: false,
      httpOnly: false,
      sameSite: 'strict' // 'strict' for GET and POST, 'lax' only for POST
    });
    return cookieBro.getAll();
  });
  console.log('cookies::', cookies);
};


main();


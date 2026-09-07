const fs = require('fs');
const { chromium } = require('playwright');
const launchOpts = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
(async () => {
  const html = fs.readFileSync('build/poster.html', 'utf8');
  const browser = await chromium.launch(launchOpts);
  const page = await browser.newPage({ viewport: { width: 1170, height: 1451 } });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: '@page{size:1170px 1451px;margin:0}html,body{margin:0}' });
  fs.mkdirSync('../out', { recursive: true });
  await page.pdf({ path: '../out/avanza-7setembro.pdf', width: '1170px', height: '1451px',
                   printBackground: true, pageRanges: '1' });
  await browser.close();
})();

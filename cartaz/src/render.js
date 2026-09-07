const fs = require('fs');

// honour a preinstalled Chromium when one is pinned in the environment
const launchOpts = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
const { chromium } = require('playwright');

const d = (f, m) => `data:${m};base64,${fs.readFileSync(f).toString('base64')}`;

const html = fs.readFileSync('src/poster.html.tmpl', 'utf8')
  .replace('__ANTON__', d('fonts/Anton.ttf', 'font/ttf'))
  .replace('__MONT__',  d('fonts/Montserrat.ttf', 'font/ttf'))
  .replace('__PLATE__', d('assets/plate.png', 'image/png'))
  .replace('__LOGO__',  d('assets/avanza-logo.png', 'image/png'));

fs.mkdirSync('build', { recursive: true });
fs.writeFileSync('build/poster.html', html);

(async () => {
  const scale = Number(process.argv[2] || 2);
  const browser = await chromium.launch(launchOpts);
  const page = await browser.newPage({
    viewport: { width: 1170, height: 1451 },
    deviceScaleFactor: scale,
  });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const el = await page.$('.poster');
  await el.screenshot({ path: `build/poster@${scale}x.png` });
  // reported geometry, to sanity-check the layout without eyeballing it
  const geom = await page.evaluate(() => {
    const g = {};
    for (const sel of ['.masthead', '.eyebrow', '.headline', '.message', '.mark', '.band']) {
      const r = document.querySelector(sel).getBoundingClientRect();
      g[sel] = [Math.round(r.left), Math.round(r.top), Math.round(r.right), Math.round(r.bottom)];
    }
    return g;
  });
  console.log(JSON.stringify(geom, null, 1));
  await browser.close();
})();

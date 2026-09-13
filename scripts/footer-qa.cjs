const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const output = path.join(process.env.TEMP || '/tmp', 'kojikane-qa', 'footer');
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    for (const locale of ['th', 'en']) {
      for (const width of [1440, 820, 390]) {
        const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        const prefix = locale === 'en' ? '/en' : '';
        await page.goto(`http://localhost:3001${prefix || '/'}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.locator('footer iframe').waitFor();
        assert.equal(await page.locator('main iframe').count(), 0);
        await page.locator('footer').scrollIntoViewIfNeeded();
        await page.evaluate(() => document.fonts.ready);
        await page.locator('footer').screenshot({ path: path.join(output, `${locale}-${width}.png`) });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        assert.equal(await page.locator('footer iframe').getAttribute('loading'), 'lazy');
        assert.ok(await page.locator('footer iframe').getAttribute('title'));
        assert.equal(await page.locator('footer a[href*="/maps/dir/"]').count(), 1);
        await page.locator(`footer a[href="${prefix}/contact"]`).click();
        await page.waitForURL(`**${prefix}/contact`, { waitUntil: 'domcontentloaded' });
        await page.locator('main iframe').waitFor();
        assert.equal(await page.locator('footer iframe').count(), 0);
        assert.equal(await page.locator('iframe').count(), 1);
        await page.locator(`footer a[href="${prefix}/about"]`).click();
        await page.waitForURL(`**${prefix}/about`, { waitUntil: 'domcontentloaded' });
        await page.locator('footer iframe').waitFor();
        assert.equal(await page.locator('footer iframe').count(), 1);
        await page.goto(`http://localhost:3001${prefix}/contact`, { waitUntil: 'domcontentloaded' });
        await page.locator('main iframe').waitFor();
        assert.equal(await page.locator('footer iframe').count(), 0);
        assert.equal(errors.length, 0, errors.join('\n'));
        console.log(`${locale} ${width}: footer layout, single map, client navigation and direct Contact load passed`);
        await context.close();
      }
    }
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });

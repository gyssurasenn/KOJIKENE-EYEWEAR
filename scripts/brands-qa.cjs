const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const assert = require('node:assert/strict');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  try {
    for (const locale of ['', '/en']) for (const width of [390, 820, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(`http://localhost:3001${locale}`, { waitUntil: 'domcontentloaded' });
      const strip = page.locator('.brand-strip');
      await strip.scrollIntoViewIfNeeded();
      await page.waitForFunction(() => Boolean(document.querySelector('.brand-strip .swiper')?.swiper?.autoplay?.running));
      await strip.locator('img').evaluateAll(imgs => Promise.all(imgs.map(i => i.decode())));
      assert.equal(await strip.locator('img').count(), 11);
      const state = () => strip.locator('.swiper').evaluate(e => ({ index: e.swiper.realIndex, running: e.swiper.autoplay.running }));
      await page.mouse.move(0, 0);
      const first = await state();
      await page.waitForTimeout(4600);
      assert.notEqual((await state()).index, first.index);
      const pause = strip.locator('button').nth(1);
      await pause.click();
      await page.mouse.move(0, 0);
      await pause.blur();
      await page.waitForTimeout(1400);
      assert.equal((await state()).running, false);
      const box = await strip.boundingBox();
      assert.ok(box.x >= 0 && box.x + box.width <= width + 1);
      await strip.screenshot({ path: path.join(process.env.TEMP, `brands-${locale ? 'en' : 'th'}-${width}.png`) });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(100);
      assert.equal((await state()).running, false);
      assert.equal(await strip.locator('button').count(), 2);
      const before = (await state()).index;
      await strip.locator('button').last().click();
      assert.notEqual((await state()).index, before);
      assert.deepEqual(errors, []);
      console.log(locale || 'th', width, 'images/autoplay/pause/reduced motion/navigation passed');
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });

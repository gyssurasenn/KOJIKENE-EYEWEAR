const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const output = path.join(process.env.TEMP || '/tmp', 'kojikane-qa', 'products');
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    for (const locale of ['th', 'en']) {
      for (const width of [1440, 820, 390, 320]) {
        const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce', hasTouch: width < 640, isMobile: width < 640 });
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(`http://localhost:3001${locale === 'en' ? '/en' : '/'}`, { waitUntil: 'networkidle', timeout: 60000 });
        const outer = page.locator('.carousel-products');
        const cards = outer.locator('.product-card');
        await outer.scrollIntoViewIfNeeded();
        await cards.first().locator('.product-gallery[data-ready]').waitFor();
        assert.equal(await cards.count(), 6);
        const current = async index => cards.nth(index).locator('.product-image-dots button[aria-current]').getAttribute('aria-label');
        const firstBefore = await current(0);
        const secondBefore = await current(1);
        const groupBefore = await outer.locator('.carousel-count').textContent();
        const heightBefore = (await outer.boundingBox()).height;
        await cards.first().locator('.product-image-arrow.next').click();
        assert.notEqual(await current(0), firstBefore);
        assert.equal(await current(1), secondBefore, 'First gallery changed second product');
        assert.equal(await outer.locator('.carousel-count').textContent(), groupBefore, 'Image click moved outer carousel');
        await cards.first().locator('.product-gallery').focus();
        await page.keyboard.press('ArrowRight');
        assert.ok((await current(0)).endsWith('3'));
        assert.equal(await outer.locator('.carousel-count').textContent(), groupBefore, 'Image keyboard event reached parent');
        if (width >= 1024) {
          await cards.nth(1).locator('.product-image-arrow.next').click();
          assert.notEqual(await current(1), secondBefore);
          assert.ok((await current(0)).endsWith('3'));
          assert.equal(await outer.locator('.carousel-count').textContent(), groupBefore);
        }
        const secondAfter = await current(1);
        await cards.first().locator('.product-colors button').nth(1).click();
        assert.ok((await current(0)).endsWith('1'));
        assert.equal(await cards.first().locator('.product-model').textContent(), 'DEMO-01/B');
        assert.equal(await current(1), secondAfter, 'Colour changed another gallery');
        assert.equal(await cards.first().locator('.product-colors button[aria-pressed="true"]').count(), 1);
        assert.ok(Math.abs((await outer.boundingBox()).height - heightBefore) < 2);
        if (width < 640) {
          const gallery = cards.first().locator('.product-gallery');
          await gallery.scrollIntoViewIfNeeded();
          const box = await gallery.boundingBox();
          const session = await context.newCDPSession(page);
          // Start on the image, clear of the overlaid arrow buttons.
          const y = Math.round(box.y + box.height * .25);
          for (const [type, fraction] of [['touchStart', .8], ['touchMove', .6], ['touchMove', .35], ['touchMove', .15], ['touchEnd', .15]]) {
            await session.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x: Math.round(box.x + box.width * fraction), y }] });
          }
          await page.waitForFunction(() => document.querySelector('.product-card .product-image-dots button[aria-current]')?.getAttribute('aria-label').endsWith('2'));
          assert.equal(await outer.locator('.carousel-count').textContent(), groupBefore, 'Touch moved outer product carousel');
          assert.equal(await current(1), secondAfter);
        }
        const firstSelected = await current(0);
        await outer.locator('.carousel-controls button').last().click();
        assert.notEqual(await outer.locator('.carousel-count').textContent(), groupBefore);
        await outer.locator('.carousel-controls button').first().click();
        assert.equal(await current(0), firstSelected, 'Outer navigation reset first gallery');
        assert.equal(await current(1), secondAfter, 'Outer navigation reset second gallery');
        await cards.first().locator('.product-image-dots button').first().click();
        await cards.first().locator('.product-colors button').first().click();
        await outer.screenshot({ path: path.join(output, `${locale}-${width}.png`) });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        assert.equal(errors.length, 0, errors.join('\n'));
        console.log(`${locale} ${width}: independent galleries, colour, keyboard/touch, outer navigation, stable height passed`);
        await context.close();
      }
    }
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' });
    assert.equal(await page.locator('.product-card').count(), 6);
    assert.ok((await page.locator('.product-card').first().textContent()).includes('DEMO-01/A'));
    await context.close();
    console.log(`Product gallery QA passed. Screenshots: ${output}`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });

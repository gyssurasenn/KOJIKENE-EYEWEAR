// Run with PLAYWRIGHT_MODULE pointing at an installed Playwright package.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const phase = process.env.QA_PHASE || 'phase1';
  const output = path.join(process.env.TEMP || '/tmp', 'kojikane-qa', phase);
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const results = [];
  try {
    for (const locale of ['th', 'en']) {
      for (const [name, width, height] of [['desktop', 1440, 900], ['tablet', 820, 1180], ['mobile', 390, 844], ['narrow', 320, 740]]) {
        const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.addInitScript(() => {
          window.__layoutShifts = [];
          new PerformanceObserver(list => {
            for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__layoutShifts.push(entry.value);
          }).observe({ type: 'layout-shift', buffered: true });
        });
        const response = await page.goto(`http://localhost:3001${locale === 'en' ? '/en' : '/'}`, { waitUntil: 'networkidle' });
        assert.equal(response.status(), 200);
        await page.locator('.carousel-hero[data-ready]').waitFor();
        await page.evaluate(() => document.fonts.ready);
        assert.equal(await page.locator('html').getAttribute('lang'), locale);
        assert.equal(await page.locator('h1').count(), 1);
        assert.ok(await page.locator('link[rel=canonical]').getAttribute('href'));
        assert.ok(await page.locator('meta[name=description]').getAttribute('content'));
        assert.ok(await page.locator('script[type="application/ld+json"]').count());
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
        assert.equal(overflow, false, `${name} ${locale}: horizontal overflow`);
        for (const carousel of await page.locator('.editorial-carousel').all()) {
          await carousel.scrollIntoViewIfNeeded();
          const before = await carousel.boundingBox();
          const next = carousel.locator('.carousel-controls button').last();
          if (await next.isEnabled()) {
            await next.click();
            const after = await carousel.boundingBox();
            assert.ok(Math.abs(before.height - after.height) < 2, 'Carousel height shifted');
            await carousel.focus();
            await page.keyboard.press('ArrowLeft');
          }
          const kind = (await carousel.getAttribute('class')).split(' ').find(value => value.startsWith('carousel-'));
          await carousel.screenshot({ path: path.join(output, `${locale}-${name}-${kind}.png`) });
        }
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: path.join(output, `${locale}-${name}.png`) });
        const hero = page.locator('.carousel-hero');
        for (let slide = 0; slide < 3; slide++) {
          const active = hero.locator('.swiper-slide-active');
          const actions = await active.locator('.hero-actions').boundingBox();
          const controls = await hero.locator('.carousel-controls').boundingBox();
          assert.ok(actions.y + actions.height <= controls.y, `${locale} ${name}: hero controls overlap`);
          assert.equal(await hero.locator('[inert]').count(), 2);
          if (slide < 2) await hero.locator('.carousel-controls button').last().click();
        }
        const links = await page.locator('main a[href]').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')));
        assert.ok(links.includes(locale === 'en' ? '/en/eyewear/fashion' : '/eyewear/fashion'));
        assert.ok(links.includes(locale === 'en' ? '/en/contact' : '/contact'));
        assert.equal(errors.length, 0, errors.join('\n'));
        const shifts = await page.evaluate(() => window.__layoutShifts);
        results.push({ locale, name, shifts, links: links.length, errors });
        console.log(`${phase}: ${locale} ${name} passed; CLS entries: ${JSON.stringify(shifts)}`);
        await context.close();
      }
    }
    const motionContext = await browser.newContext({ reducedMotion: 'no-preference' });
    const motionPage = await motionContext.newPage();
    await motionPage.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
    const reveal = motionPage.locator('[data-reveal-kind="image"]').first();
    if (await reveal.count()) {
      await reveal.scrollIntoViewIfNeeded();
      await motionPage.waitForFunction(() => document.querySelector('[data-reveal-kind="image"]')?.getAttribute('data-reveal') === 'shown');
      await motionPage.waitForTimeout(900);
      assert.equal(await reveal.evaluate(node => getComputedStyle(node).opacity), '1');
      await reveal.screenshot({ path: path.join(output, 'image-reveal.png') });
    }
    await motionPage.locator('.carousel-hero').scrollIntoViewIfNeeded();
    await motionPage.locator('.carousel-hero .carousel-controls button').last().click();
    await motionPage.waitForTimeout(1000);
    assert.equal(await motionPage.locator('.carousel-hero .swiper-slide-active .hero-actions').evaluate(node => getComputedStyle(node).opacity), '1');
    await motionContext.close();
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('http://localhost:3001/');
    assert.ok(await page.locator('h1').textContent());
    assert.equal(await page.locator('.hero-scene').count(), 3);
    assert.ok(await page.locator('main a[href="/contact"]').count());
    await context.close();
    fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify(results, null, 2));
    console.log(`Screenshots and results: ${output}`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });

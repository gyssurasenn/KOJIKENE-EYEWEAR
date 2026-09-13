const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const output = path.join(process.env.TEMP || '/tmp', 'kojikane-qa');
  fs.mkdirSync(output, { recursive: true });
  const baselinePath = path.join(output, 'seo-baseline.json');
  const baseline = fs.existsSync(baselinePath) ? JSON.parse(fs.readFileSync(baselinePath, 'utf8')) : null;
  const snapshots = {};
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    for (const locale of ['th', 'en']) {
      for (const width of [1440, 820, 390]) {
        const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce', hasTouch: width === 390, isMobile: width === 390 });
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        const prefix = locale === 'en' ? '/en' : '';
        for (const route of ['/eyewear/fashion', '/eyewear/prescription', '/services', '/about', '/contact', '/blog']) {
          const url = prefix + route;
          const response = await page.goto(`http://localhost:3001${url}`, { waitUntil: 'networkidle' });
          assert.equal(response.status(), 200, url);
          assert.equal(await page.locator('html').getAttribute('lang'), locale);
          assert.equal(await page.locator('h1').count(), 1);
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${url} ${width}: overflow`);
          const seo = await page.evaluate(() => ({
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.content,
            canonical: document.querySelector('link[rel="canonical"]')?.href,
            alternates: Array.from(document.querySelectorAll('link[hreflang]')).map(n => [n.hreflang, n.href]),
            schema: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(n => JSON.parse(n.textContent)),
          }));
          if (baseline) assert.deepEqual(seo, baseline[url], `SEO changed: ${url}`);
          snapshots[url] = seo;
          for (const carousel of await page.locator('.editorial-carousel').all()) {
            await carousel.scrollIntoViewIfNeeded();
            const next = carousel.locator('.carousel-controls button').last();
            if (await next.isEnabled()) {
              const before = await carousel.boundingBox();
              await next.click();
              assert.ok(Math.abs(before.height - (await carousel.boundingBox()).height) < 2);
              await carousel.focus();
              await page.keyboard.press('ArrowLeft');
            }
            const kind = (await carousel.getAttribute('class')).split(' ').find(value => value.startsWith('carousel-'));
            await carousel.screenshot({ path: path.join(output, `${baseline ? 'final' : 'baseline'}-${locale}-${width}-${route.replaceAll('/', '-')}-${kind}.png`) });
          }
          await page.evaluate(() => scrollTo(0, 0));
          await page.screenshot({ path: path.join(output, `${baseline ? 'final' : 'baseline'}-${locale}-${width}-${route.replaceAll('/', '-')}.png`) });
          console.log(`${url} ${width}: route, SEO, heading, layout passed`);
        }
        await page.goto(`http://localhost:3001${prefix || '/'}`, { waitUntil: 'networkidle' });
        if (width < 1024) {
          const toggle = page.locator('button[aria-controls="mobile-menu"]');
          await page.evaluate(() => scrollTo(0, 600));
          if (width === 390) {
            await page.locator('.mobile-contact-bar[data-visible]').waitFor();
            assert.ok((await page.locator('.mobile-contact-bar a').nth(1).getAttribute('href')).startsWith('tel:'));
          }
          await toggle.click();
          assert.equal(await page.locator('main').getAttribute('inert'), '');
          assert.equal(await page.locator('.mobile-contact-bar').getAttribute('aria-hidden'), 'true');
          await page.keyboard.press('Escape');
          assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
          assert.equal(await page.locator('main').getAttribute('inert'), null);
          await toggle.click();
          await page.locator(`#mobile-menu a[href="${prefix}/services"]`).click();
          await page.waitForURL(`**${prefix}/services`);
          assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
          await page.goto(`http://localhost:3001${prefix || '/'}`, { waitUntil: 'networkidle' });
        }
        const hero = page.locator('.carousel-hero');
        if (width === 390) {
          const bounds = await hero.locator('.hero-scene').first().boundingBox();
          const session = await context.newCDPSession(page);
          const y = Math.round(bounds.y + bounds.height * .72);
          for (const [type, x] of [['touchStart', 330], ['touchMove', 270], ['touchMove', 180], ['touchMove', 70], ['touchEnd', 70]]) {
            await session.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y }] });
          }
          await page.waitForFunction(() => document.querySelector('.carousel-hero .carousel-count')?.textContent.includes('02'));
          console.log(`${locale}: real touch swipe passed`);
        } else {
          await hero.locator('.carousel-controls button').last().click();
        }
        await hero.locator('.swiper-slide-active a').first().click();
        await page.waitForURL(`**${prefix}/eyewear/fashion`);
        assert.equal(errors.length, 0, errors.join('\n'));
        await context.close();
      }
    }
    if (!baseline) fs.writeFileSync(baselinePath, JSON.stringify(snapshots, null, 2));
    console.log('Navigation, mobile contact, menu and SEO checks passed.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });

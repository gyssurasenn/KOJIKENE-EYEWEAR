# KOJIKANE EYEWEAR

Editorial website for a family-owned optical shop in Nonthaburi, Thailand.
Fashion eyewear, prescription glasses, and the Journal.

**Bilingual: Thai (default) and English.** Both languages are fully translated,
statically generated, and separately indexable.

**This is not an e-commerce site.** There is no cart, no checkout, no prices.
Every page is built to move a reader towards visiting the shop.

---

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (all pages are statically generated) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript, no emit |
| `npm run placeholders` | Regenerate the temporary placeholder imagery |

Stack: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS.
Server Components throughout; the only Client Components are the header
(`components/layout/Header.tsx`) and the scroll reveal (`components/ui/Reveal.tsx`).

---

## The files you will actually edit

| File | Holds |
| --- | --- |
| `locales/th/translation.json` · `locales/en/translation.json` | **All visible copy**, in both languages |
| `lib/site.ts` | Address, phone, LINE, Facebook, opening hours, navigation, site URL |
| `lib/images.ts` | Every image on the site, in one place |
| `content/articles/th.ts` · `content/articles/en.ts` | Journal articles |
| `content/eyewear.ts` · `content/services.ts` | Frame and service ids, images, structure |

Nothing is hardcoded in components. Change it in one of these and it changes everywhere.

The split is deliberate: `/locales` holds **words**, `lib/site.ts` holds **facts**
(an address is not translated, it is the same address), and `/content` holds
**structure** (which frames exist, in what order, with which image).

---

## Languages

Thai is the default and is served without a prefix. English lives under `/en`.

| Thai | English |
| --- | --- |
| `/` | `/en` |
| `/eyewear` | `/en/eyewear` |
| `/blog/how-to-choose-glasses-for-your-face` | `/en/blog/how-to-choose-glasses-for-your-face` |

Slugs are shared between languages so the two versions pair up exactly for
`hreflang`. Every page carries `th-TH`, `en` and `x-default` alternates, in both
the `<head>` and the sitemap.

**How it fits together**

| File | Role |
| --- | --- |
| `i18n/config.ts` | Locale list, default, and the `localePath()` / `stripLocale()` helpers |
| `i18n/server.ts` | `getT(locale)` for Server Components — no client JS |
| `i18n/client.tsx` | `I18nProvider` + `useT()` for the header, using `react-i18next` and `LanguageDetector` |
| `middleware.ts` | Rewrites `/eyewear` → `/th/eyewear`, redirects `/th/*` → `/*` |
| `components/layout/LanguageSwitcher.tsx` | TH / EN toggle — real links, works without JS |

Server Components read translations directly through `getT()`, so page and
article copy never ships as client JavaScript. Only the `common` slice of the
dictionary is handed to the browser, for the header.

**On automatic language redirects.** Visitors are redirected to another language
*only* after explicitly choosing one in the switcher, which writes a `NEXT_LOCALE`
cookie that middleware honours on the next visit. `Accept-Language` and
`navigator.language` are deliberately **not** used to redirect — doing so would
bounce crawlers between languages and pull visitors off the Thai URLs, which are
the ones that should rank locally. (`LanguageDetector` is configured with
`caches: []` for exactly this reason.)

### Adding or changing copy

1. Edit the key in **both** `locales/th/translation.json` and `locales/en/translation.json`.
2. That is the whole job — the key tree is identical in both files.

Missing keys fall back to Thai rather than rendering a raw key.

### Adding a third language

Add the code to `locales` in `i18n/config.ts`, add its entry to `localeConfig`,
create `locales/<code>/translation.json`, add `content/articles/<code>.ts`, and
register both in `i18n/server.ts` and `content/blog.ts`. Routing, sitemap,
hreflang and the switcher all derive from `locales` and need no changes.

---

## Replacing the placeholder photography

All imagery is currently generated abstract placeholder art in the brand palette
(`public/images/placeholder-*.webp`). To swap in real photographs:

1. Drop the file into `public/images/` — e.g. `hero.jpg`, `store-front.jpg`,
   `store-interior.jpg`, `family.jpg`, `fashion/…`, `prescription/…`.
2. Open `lib/images.ts` and update that entry's `src`, `width`, `height`.
3. Rewrite `alt` to describe the actual photograph (this matters for SEO).
4. Remove `placeholder: true`.

**Do not change the layout.** It already reserves the right aspect ratios:

| Slot | Ratio |
| --- | --- |
| Hero, category cards, portrait frames | 4 : 5 |
| Store, family, journal artwork | 3 : 2 |
| Frame detail stills | 1 : 1 |
| Open Graph preview | 1200 × 630 |

Supply photographs at roughly twice the display size (≈1600px on the long edge is
plenty). `next/image` handles responsive sizes and converts to AVIF/WebP at request
time, so upload plain JPEGs — no need to pre-optimise.

Optional per-image `position` (e.g. `position: '50% 35%'`) shifts the crop focal
point without touching any component.

The logo is drawn as inline SVG in `components/brand/Logo.tsx` so it stays crisp.
Replace it with the real logo when it arrives; keep the same outer dimensions so
the header spacing does not shift. `public/favicon.svg` should be replaced too.

Once real photography is in, `scripts/generate-placeholders.mjs`, the
`placeholders` script and the `sharp` devDependency can all be deleted.

---

## Before launch

- [ ] `lib/site.ts` → set `SITE_URL` to the real domain (canonicals, sitemap and JSON-LD all read from it)
- [ ] `lib/site.ts` → confirm `openingHours` and set `isPlaceholder: false`
- [ ] `lib/site.ts` → paste the Google Maps embed URL into `address.mapsEmbedUrl`
      (Maps → Share → Embed a map → copy the `src` value). Until then a styled
      placeholder links out to Maps instead.
- [ ] `lib/site.ts` → add `contact.instagramUrl` when the account exists
- [ ] `lib/site.ts` → add `address.geo` coordinates once verified, for LocalBusiness schema
- [ ] Replace `public/images/placeholder-og.webp` with a real branded social preview
- [ ] Have the shop review `/privacy` and `/terms`
- [ ] `app/layout.tsx` → uncomment `verification.google` with the Search Console token
- [ ] Have a Thai speaker read `locales/th/translation.json` and the Thai
      articles once before launch — the copy is written to sound natural, not
      translated, and a native pass is worth it
- [ ] Submit `https://yourdomain/sitemap.xml` in Google Search Console (one
      property covers both languages; check the International Targeting report
      for hreflang errors after the first crawl)
- [ ] Claim and align the Google Business Profile (name, address and phone must
      match `lib/site.ts` exactly — consistency is most of local SEO)

---

## SEO

- Unique title, meta description and canonical **per page, per language** (`lib/seo.ts`)
- `hreflang` alternates (`th-TH`, `en`, `x-default`) in the head and the sitemap
- Open Graph + Twitter cards on every page, with the right `og:locale`
- JSON-LD (`lib/jsonld.ts`): `LocalBusiness`/`Optician` and `WebSite` site-wide,
  plus `BreadcrumbList`, `Article`, `Blog`, `FAQPage` and `ItemList` where
  relevant — all localised, with `inLanguage` set
- `sitemap.xml` and `robots.txt` generated from code — new articles and new
  languages appear automatically
- One `<h1>` per page, logical `<h2>`/`<h3>` hierarchy, descriptive alt text
- Clean URLs: `/eyewear`, `/eyewear/fashion`, `/blog/how-to-choose-glasses-for-your-face`
- `/th/*` 308-redirects to the unprefixed Thai URL, so each page has exactly one
  canonical address per language

### Adding an article

Append an entry to `articlesTh` in `content/articles/th.ts` **and** to
`articlesEn` in `content/articles/en.ts`, using the same `slug` in both, then add
its artwork to `images.journal` in `lib/images.ts` keyed by that slug. The
routes, sitemap entries, hreflang pair, related-article links and `Article`
schema are all generated from it.

Keep `category` in English in both files — it is a key, and the visible label
comes from `blog.categories.*` in the translation files.

Article bodies are typed blocks (`paragraph`, `heading`, `list`, `callout`,
`quote`, `image`) rendered by `components/journal/RichText.tsx`. Inline links use
markdown syntax — `[label](/services)` — and internal ones become `next/link`.

---

## Structure

```
app/
  [locale]/              every page, prerendered for th and en
  sitemap.ts robots.ts   metadata routes (locale-aware)
i18n/                    config, server getT(), client provider
locales/th|en/           all visible copy
middleware.ts            locale routing
components/
  brand/                 wordmark
  cards/                 EyewearCategoryCard, ServiceCard, BlogCard
  eyewear/               EyewearEditorial
  home/                  homepage sections
  journal/               BlogGrid, RichText
  layout/                Header, Footer, PageHeader
  sections/              VisitStore, ContactCTA
  seo/                   JsonLd
  ui/                    Button, SectionHeading, Breadcrumb, SocialLinks, Reveal
content/
  articles/th.ts en.ts   Journal articles per language
  eyewear.ts services.ts structure and ids only
lib/                     site facts, images, SEO helpers, JSON-LD, formatting
types/                   shared TypeScript types
public/images/           imagery
scripts/                 placeholder generator (delete after the real photos land)
```

## Design notes

Warm neutral palette only — off-white, bone, sand, clay, charcoal, ink — defined
in `tailwind.config.ts`. Type does the work: Zen Kaku Gothic New for display and
Inter for body on the English site; Noto Sans Thai carries both roles on the Thai
site, since the latin display face has no Thai glyphs.

Thai typography is tuned separately in `app/globals.css`: more leading, and no
negative tracking — tight letter-spacing collides with the vowel and tone marks
that sit above and below the Thai baseline.

Motion is deliberately restrained: one fade-and-rise on scroll, slow image scale
on hover, and underlines that draw in. Everything respects
`prefers-reduced-motion`, and no content depends on JavaScript to be visible —
the server-rendered HTML carries no hidden state.
# KOJIKENE-EYEWEAR

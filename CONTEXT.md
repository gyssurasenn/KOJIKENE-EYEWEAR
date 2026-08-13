# CONTEXT.md — บริบทโปรเจกต์ KOJIKANE EYEWEAR

> เอกสารนี้เขียนไว้ให้ทั้งเจ้าของโปรเจกต์และ AI coding agent อ่านก่อนแก้เว็บ  
> ภาษาในการคุยกับผู้ใช้: **ภาษาไทยเป็นหลัก**  
> โค้ด, ชื่อไฟล์, component name, prop name และ technical term ใช้ภาษาอังกฤษได้ตามปกติ

---

## 1. โปรเจกต์นี้คืออะไร

KOJIKANE EYEWEAR คือเว็บไซต์ editorial / brand website สำหรับร้านแว่นตาครอบครัวในจังหวัดนนทบุรี

เป้าหมายของเว็บ:

- แนะนำร้าน KOJIKANE EYEWEAR ให้ดูอบอุ่น น่าเชื่อถือ และพรีเมียม
- ให้ลูกค้าเข้าใจว่าร้านขายทั้งแว่นแฟชั่นและแว่นสายตา
- พาลูกค้าไปสู่การ “มาที่ร้าน”, “โทรหา”, หรือ “ติดต่อผ่าน LINE / Facebook”
- ทำ SEO ภาษาไทยและภาษาอังกฤษให้แต่ละหน้า index ได้ดี

เว็บนี้ **ไม่ใช่ e-commerce**

- ไม่มีตะกร้าสินค้า
- ไม่มี checkout
- ไม่มีระบบราคา
- ไม่มีการสั่งซื้อผ่านหน้าเว็บ

ทุกหน้าออกแบบมาเพื่อให้คนอยากเดินทางมาที่ร้านจริง

---

## 2. Stack ที่ใช้

โปรเจกต์นี้ใช้:

- **Next.js 15 App Router** — โครงสร้างหน้าเว็บอยู่ใน `app/`
- **React 19**
- **TypeScript / TSX** — component เขียนเป็น `.tsx`
- **Tailwind CSS** — แต่งหน้าตาด้วย className
- **i18next** — ระบบหลายภาษา ไทย/อังกฤษ
- **Server Components เป็นหลัก** — หน้าเว็บส่วนใหญ่ render ฝั่ง server

คำสั่งที่ใช้บ่อย:

| คำสั่ง | ใช้ทำอะไร |
|---|---|
| `npm run dev` | เปิดเว็บสำหรับพัฒนา |
| `npm run typecheck` | ตรวจ TypeScript |
| `npm run build` | build production |
| `npm run start` | เปิด production build |
| `npm run placeholders` | สร้างรูป placeholder ใหม่ |

---

## 3. ภาษาและ routing

เว็บมี 2 ภาษา:

- ไทย = ภาษาหลัก
- อังกฤษ = อยู่ใต้ `/en`

ตัวอย่าง URL:

| หน้าไทย | หน้าอังกฤษ |
|---|---|
| `/` | `/en` |
| `/eyewear` | `/en/eyewear` |
| `/services` | `/en/services` |
| `/about` | `/en/about` |
| `/contact` | `/en/contact` |
| `/blog` | `/en/blog` |

ไฟล์สำคัญของระบบภาษา:

| ไฟล์ | หน้าที่ |
|---|---|
| `i18n/config.ts` | กำหนดภาษาที่รองรับ และ helper สำหรับ path |
| `i18n/server.ts` | ใช้ `getT(locale)` เพื่อดึงคำแปลใน Server Component |
| `i18n/client.tsx` | ใช้กับ component ฝั่ง client เช่น header |
| `middleware.ts` | rewrite/redirect path ภาษา เช่น `/eyewear` → `/th/eyewear` ภายใน |
| `locales/th/translation.json` | copy ภาษาไทยทั้งหมด |
| `locales/en/translation.json` | copy ภาษาอังกฤษทั้งหมด |

กฎสำคัญ:

- ถ้าแก้ข้อความที่ผู้ใช้เห็น ให้แก้ใน `locales/th/translation.json` และ `locales/en/translation.json`
- อย่า hardcode ข้อความยาว ๆ ลง component ถ้าเป็นข้อความที่แสดงบนเว็บ
- key ของไทยและอังกฤษควรมีโครงสร้างเหมือนกัน

---

## 4. โครงสร้างโฟลเดอร์แบบเข้าใจง่าย

| โฟลเดอร์/ไฟล์ | ใช้ทำอะไร |
|---|---|
| `app/` | route และ page หลักของ Next.js |
| `app/[locale]/.../page.tsx` | หน้าเว็บแต่ละหน้า เช่น home, contact, services |
| `components/` | component ที่นำไปใช้ซ้ำ |
| `components/layout/` | header, footer, page header, language switcher |
| `components/home/` | section เฉพาะหน้าแรก |
| `components/sections/` | section ที่ใช้ข้ามหลายหน้า เช่น VisitStore, ContactCTA |
| `components/ui/` | component เล็ก ๆ เช่น Button, Reveal, SectionHeading |
| `content/` | ข้อมูลเชิงโครงสร้าง เช่น บทความ, eyewear category, services |
| `lib/` | helper และข้อมูลกลาง เช่น site info, seo, images |
| `locales/` | ข้อความแปลไทย/อังกฤษ |
| `public/` | asset ที่เปิดผ่าน browser ได้ เช่น รูป, favicon |
| `types/` | type กลางของ TypeScript |

---

## 5. ไฟล์ที่มักต้องแก้บ่อย

| อยากแก้อะไร | แก้ไฟล์ไหน |
|---|---|
| เบอร์โทร, LINE, Facebook, ที่อยู่, เวลาเปิด | `lib/site.ts` |
| ข้อความบนเว็บ | `locales/th/translation.json`, `locales/en/translation.json` |
| รูป hero, รูปร้าน, รูปสินค้า | `lib/images.ts` และไฟล์ใน `public/images/` |
| บทความ blog | `content/articles/th.ts`, `content/articles/en.ts` |
| หมวดแว่น / ข้อมูลแว่น | `content/eyewear.ts` |
| ข้อมูลบริการ | `content/services.ts` |
| หน้า Contact / Map | `app/[locale]/contact/page.tsx`, `components/sections/VisitStore.tsx`, `lib/site.ts` |
| Header / menu | `components/layout/Header.tsx`, `components/layout/LanguageSwitcher.tsx`, `lib/site.ts` |
| Footer | `components/layout/Footer.tsx`, `lib/site.ts` |
| SEO metadata | `lib/seo.ts`, `lib/site.ts`, page ที่เกี่ยวข้อง |

---

## 6. แนวคิดสำคัญของ Next.js + TSX ในโปรเจกต์นี้

### 6.1 `page.tsx` คือหน้าเว็บ

ใน App Router ของ Next.js ไฟล์ชื่อ `page.tsx` คือ route จริง

ตัวอย่าง:

| URL | ไฟล์ |
|---|---|
| `/contact` | `app/[locale]/contact/page.tsx` |
| `/services` | `app/[locale]/services/page.tsx` |
| `/about` | `app/[locale]/about/page.tsx` |
| `/eyewear` | `app/[locale]/eyewear/page.tsx` |

ถ้าจะเปลี่ยนลำดับ section ของหน้าใดหน้า หนึ่ง ให้เริ่มดูที่ `page.tsx` ของหน้านั้น

### 6.2 Component คือชิ้นส่วนของหน้า

ไฟล์ `.tsx` ใน `components/` คือชิ้นส่วน UI ที่นำไปประกอบเป็นหน้า

ตัวอย่าง:

- `VisitStore.tsx` = section แผนที่/ข้อมูลร้าน
- `ContactCTA.tsx` = section call-to-action ให้ติดต่อร้าน
- `Hero.tsx` = hero หน้าแรก
- `Footer.tsx` = footer ทุกหน้า

### 6.3 Props คือข้อมูลที่ส่งเข้า component

ตัวอย่าง:

```tsx
<VisitStore locale={locale} headingLevel="h2" showImage={false} />
```

ความหมาย:

- `locale={locale}` ส่งภาษาปัจจุบันเข้าไป
- `headingLevel="h2"` ให้หัวข้อใน section เป็น `<h2>`
- `showImage={false}` บอก component ว่าไม่ต้องแสดงรูปประกอบใต้ map

### 6.4 Server Component vs Client Component

โดย default component ใน `app/` และส่วนใหญ่ของ `components/` เป็น Server Component

Client Component จะมีบรรทัดนี้ด้านบนไฟล์:

```tsx
'use client';
```

ใช้ Client Component เมื่อจำเป็นต้องมี:

- state เช่น `useState`
- effect เช่น `useEffect`
- interaction ฝั่ง browser
- event เช่น click แล้วเปิด/ปิด menu

ถ้าไม่จำเป็น อย่าใส่ `'use client'` เพราะจะทำให้ JS ถูกส่งไป browser มากขึ้น

---

## 7. องค์ประกอบหลักของแต่ละหน้า

### 7.1 หน้าแรก — `app/[locale]/page.tsx`

หน้าที่: ทำให้คนเข้าใจร้านเร็วที่สุด และพาไปดูแว่น/บริการ/มาที่ร้าน

องค์ประกอบหลัก:

- Hero — ภาพใหญ่ + positioning ของแบรนด์
- Featured Eyewear — แนะนำหมวดแว่น
- Services — บริการของร้าน
- Why Kojikane — เหตุผลที่ควรเลือกร้าน
- Family Story — mood ของร้านครอบครัว
- Journal — บทความ
- Visit Store / Contact CTA — พาไปติดต่อหรือมาที่ร้าน

ไฟล์ที่เกี่ยวข้อง:

- `components/home/Hero.tsx`
- `components/home/FeaturedEyewear.tsx`
- `components/home/ServicesSection.tsx`
- `components/home/WhyKojikane.tsx`
- `components/home/FamilyStory.tsx`
- `components/home/JournalSection.tsx`

### 7.2 หน้าแว่น — `app/[locale]/eyewear/page.tsx`

หน้าที่: อธิบายหมวดสินค้าและพาไปดูแว่นแฟชั่น/แว่นสายตา

องค์ประกอบหลัก:

- PageHeader
- Eyewear category cards
- Editorial content
- Contact CTA

ข้อมูลสินค้า/หมวดอยู่ที่:

- `content/eyewear.ts`
- `locales/*/translation.json`

### 7.3 หน้าแว่นแฟชั่น — `app/[locale]/eyewear/fashion/page.tsx`

หน้าที่: ขาย mood/style ของแว่นแฟชั่น

ควรเน้น:

- ภาพ
- บุคลิกของทรงแว่น
- ความรู้สึกเวลาใส่
- ไม่ hard sell

### 7.4 หน้าแว่นสายตา — `app/[locale]/eyewear/prescription/page.tsx`

หน้าที่: สร้างความมั่นใจเรื่องการวัดสายตา เลนส์ และการฟิตกรอบ

ควรเน้น:

- ความละเอียด
- ความเข้าใจง่าย
- การดูแลหลังการขาย
- การมาลอง/วัดที่ร้าน

### 7.5 หน้าบริการ — `app/[locale]/services/page.tsx`

หน้าที่: บอกว่าร้านช่วยอะไรลูกค้าได้บ้าง

ข้อมูลบริการอยู่ที่:

- `content/services.ts`
- `locales/*/translation.json`

### 7.6 หน้าเกี่ยวกับเรา — `app/[locale]/about/page.tsx`

หน้าที่: เล่า story ของร้านและความเป็นร้านครอบครัว

ควรเน้น:

- ความอบอุ่น
- ความจริงใจ
- การเลือกแว่นแบบไม่รีบ
- local shop บนถนนสามัคคี นนทบุรี

### 7.7 หน้าติดต่อ / แผนที่ — `app/[locale]/contact/page.tsx`

หน้าที่: ทำให้ลูกค้ารู้ว่าจะติดต่อหรือมาที่ร้านอย่างไร

องค์ประกอบหลัก:

- PageHeader
- VisitStore — ข้อมูลร้าน + Google Map + ปุ่ม Get Directions
- Getting Here — คำแนะนำการเดินทาง
- Message CTA — LINE / โทร / Facebook

ไฟล์สำคัญ:

- `app/[locale]/contact/page.tsx`
- `components/sections/VisitStore.tsx`
- `lib/site.ts`

ข้อควรรู้:

- `mapsEmbedUrl` อยู่ใน `lib/site.ts`
- ปุ่มเส้นทางใช้ `address.mapsDirectionsUrl`
- ถ้าจะเปลี่ยนตำแหน่งร้าน ให้แก้ที่ `lib/site.ts` จุดเดียวก่อน
- อย่าแปะ iframe URL ซ้ำใน component หลายที่

### 7.8 หน้า Blog — `app/[locale]/blog/page.tsx`

หน้าที่: รวมบทความทั้งหมด

บทความอยู่ที่:

- `content/articles/th.ts`
- `content/articles/en.ts`

### 7.9 หน้า Blog Detail — `app/[locale]/blog/[slug]/page.tsx`

หน้าที่: แสดงบทความตาม slug

ข้อควรระวัง:

- slug ไทย/อังกฤษใช้ร่วมกันเพื่อ SEO และ hreflang
- ถ้าเพิ่มบทความ ต้องเพิ่มทั้ง `th.ts` และ `en.ts`

---

## 8. การจัดการข้อมูลร้าน

ข้อมูลร้านที่เป็น “ข้อเท็จจริง” ต้องอยู่ใน `lib/site.ts`

ตัวอย่าง:

- ชื่อร้าน
- เบอร์โทร
- LINE
- Facebook
- ที่อยู่
- เวลาเปิด
- Google Maps URL
- menu navigation

เหตุผล:

- แก้ที่เดียวแล้วเปลี่ยนทั้งเว็บ
- ลดความเสี่ยงข้อมูลไม่ตรงกัน
- component ไม่ต้องจำข้อมูลธุรกิจเอง

---

## 9. การจัดการข้อความ

ข้อความที่ผู้ใช้เห็นควรอยู่ใน `locales/`

ตัวอย่าง:

- หัวข้อ section
- คำอธิบาย
- ปุ่ม
- label
- SEO title/description

ถ้าเพิ่มข้อความใหม่:

1. เพิ่ม key ใน `locales/th/translation.json`
2. เพิ่ม key เดียวกันใน `locales/en/translation.json`
3. เรียกผ่าน `t('path.to.key')`

ตัวอย่าง:

```tsx
const t = await getT(locale);

<h1>{t('contact.title')}</h1>
```

---

## 10. การจัดการรูป

รูปทั้งหมดควรอ้างผ่าน `lib/images.ts`

ขั้นตอนเปลี่ยนรูป:

1. วางไฟล์จริงใน `public/images/`
2. เปิด `lib/images.ts`
3. เปลี่ยน `src`, `width`, `height`, `alt`
4. ถ้าเป็นรูปจริงแล้ว เอา `placeholder: true` ออก

อย่าเปลี่ยน path รูปตรงใน component ถ้าไม่จำเป็น

---

## 11. Tailwind CSS และการแก้หน้าตา

โปรเจกต์นี้แต่ง UI ด้วย Tailwind ผ่าน `className`

ตัวอย่าง:

```tsx
<section className="shell py-section">
```

ความหมาย:

- `shell` = container กลางของเว็บ กำหนดใน `app/globals.css`
- `py-section` = padding บน/ล่างของ section กำหนดใน `tailwind.config.ts`

ไฟล์ design token:

- `tailwind.config.ts` — สี, font, spacing, maxWidth
- `app/globals.css` — class กลาง เช่น `shell`, `eyebrow`, `link-underline`

สีหลักของโปรเจกต์:

- `paper` — พื้นหลัง off-white
- `ink` — สีตัวอักษรหลัก
- `graphite` — สีตัวอักษรรอง
- `stone` / `mist` — สีจาง
- `sand` / `bone` — พื้นหลัง warm neutral

---

## 12. SEO

SEO สำคัญมาก เพราะเว็บนี้ต้องให้คนหาร้านแว่นในนนทบุรีเจอ

ไฟล์ที่เกี่ยวข้อง:

- `lib/seo.ts`
- `lib/jsonld.ts`
- `app/sitemap.ts`
- `app/robots.ts`
- metadata ในแต่ละ `page.tsx`
- `locales/*/translation.json` หมวด `seo`

ข้อควรระวัง:

- อย่าลืม title/description ทั้งไทยและอังกฤษ
- อย่าใช้ข้อความ SEO ที่เกินจริง
- ข้อมูลธุรกิจต้องตรงกับ `lib/site.ts`
- หน้าไทยควรเป็น primary สำหรับ local SEO

---

## 13. กฎการแก้โค้ดในโปรเจกต์นี้

- แก้แบบ minimal เท่าที่จำเป็น
- อย่า hardcode business facts ซ้ำใน component
- อย่าเปลี่ยน route โดยไม่จำเป็น
- อย่าเปลี่ยน i18n key เดิมถ้าไม่จำเป็น เพราะอาจกระทบหลายหน้า
- ถ้าเพิ่ม component ใหม่ ให้ดู pattern component เดิมก่อน
- ถ้าแก้ UI ให้เช็ก responsive mobile ด้วย
- หลังแก้ควรรัน `npm run typecheck`
- ถ้าเป็นงานใหญ่หรือกระทบหลายหน้า ควรรัน `npm run build`

---

## 14. Glossary สำหรับมือใหม่

| คำ | ความหมาย |
|---|---|
| Page | ไฟล์ route จริงของ Next.js เช่น `page.tsx` |
| Component | ชิ้นส่วน UI ที่เอาไปประกอบหน้า |
| Props | ข้อมูลที่ส่งเข้า component |
| Server Component | component ที่ render ฝั่ง server |
| Client Component | component ที่ทำงานฝั่ง browser และมักมี `'use client'` |
| Locale | ภาษา เช่น `th`, `en` |
| Translation key | key สำหรับดึงข้อความจากไฟล์ภาษา |
| Metadata | title/description/SEO ของหน้า |
| Static generation | Next.js สร้างหน้า HTML ไว้ล่วงหน้า |
| Tailwind class | className สำเร็จรูปสำหรับแต่ง UI |

---

## 15. Open Questions / Assumptions Log

ใช้ section นี้บันทึกเรื่องที่ยังไม่แน่ใจ เพื่อไม่ให้ลืม

ตัวอย่าง:

| วันที่ | เรื่อง | สถานะ |
|---|---|---|
| 2026-08-13 | เวลาเปิดร้านควรยืนยันก่อน launch จริง | รอยืนยัน |
| 2026-08-13 | รูป placeholder ควรถูกแทนด้วยรูปถ่ายร้านจริง | รอดำเนินการ |


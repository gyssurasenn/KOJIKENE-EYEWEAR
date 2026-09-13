# Editorial / Product Carousel Implementation

วันที่ตรวจ: 2026-09-12

## โครงสร้างที่สำรวจ

| ส่วน | ไฟล์เดิม |
| --- | --- |
| หน้าแรก | `app/[locale]/page.tsx` |
| Hero | `components/home/Hero.tsx` |
| หมวดแว่น | `components/home/DiscoverFrame.tsx` |
| แว่นคัดสรร | `components/home/FeaturedEyewear.tsx`, `components/eyewear/EyewearEditorial.tsx` |
| Gallery เดิม | รูปคู่ใน `app/[locale]/about/page.tsx` |
| บทความหน้าแรก | `components/home/JournalSection.tsx` |
| Motion เดิม | CSS + IntersectionObserver ใน `components/ui/Reveal.tsx`; ไม่มี carousel library |
| คำแปล | `locales/th/translation.json`, `locales/en/translation.json` |
| ข้อมูลร้านและรูป | `lib/site.ts`, `lib/images.ts` |
| Breakpoint | Tailwind 640 / 768 / 1024 / 1280 / 1536px |

## การเปลี่ยนแปลงตามเฟส

1. Hero: 3 สไลด์, fade และลำดับข้อความ, ปุ่มลูกศร/progress ที่ออกแบบเอง, ไม่มี autoplay
2. Curated Eyewear: carousel ใช้เนื้อหาแว่นเดิม จากนั้นอัปเกรดเป็น Product Carousel ตามคำขอเพิ่มเติม
3. Shared Reveal/ImageReveal: ใช้ observer เดิม, motion token ร่วมกัน, reduced motion และ fallback เมื่อปิด JavaScript
4. Store Gallery: รูปหลายสัดส่วน เลื่อนด้วย mouse/touch/keyboard ใช้รูปอ้างอิงจากไฟล์กลาง
5. Mobile: แถบ LINE/โทร/แผนที่, safe area, เมนูมี focus management, Journal Carousel และลำดับขั้นตอนหน้าร้าน
6. Fashion/Prescription: FrameCarousel + FrameDetailCarousel; Services: ImageReveal; About: StoreGallery; ปรับ masthead ให้ใช้ภาษาภาพเดียวกัน

## คำขอเพิ่มเติม: Nested Product Gallery

- `content/products.ts` มีข้อมูลตัวอย่าง 6 รายการ ราคาเป็น optional
- แต่ละ `ProductCard` สร้าง Swiper instance และ state ของตัวเอง
- รูปที่เลือกและสีในสินค้าอื่นไม่เปลี่ยนตามกัน
- เปลี่ยนสีสามารถเปลี่ยน gallery, model และ price ของการ์ดนั้นได้
- Swiper ชั้นนอกไม่รับการลากที่เริ่มบน gallery ชั้นใน
- ลูกศรคีย์บอร์ดใน gallery ไม่ส่งต่อไป carousel ชั้นนอก
- เลื่อนชุดสินค้าออกไปแล้วกลับมา ยังเก็บ state รูปของแต่ละการ์ด
- ราคาและป้ายจัดส่งเป็นข้อมูลตัวอย่างที่ระบุชัด ไม่ได้เปิดระบบขายออนไลน์
- อ่านวิธีเปลี่ยนเป็นข้อมูลจริงใน `PRODUCT_GUIDE.md`

## ผลตรวจ

- `npm run typecheck`: ผ่าน
- Production build โดยใช้ `NEXT_DIST_DIR=.next-verify`: ผ่าน สร้าง 35 static pages
- ใช้ cache แยกเพื่อไม่รบกวน dev server ที่ใช้ `.next`
- ตรวจหน้าแรกไทย/อังกฤษที่ 1440, 820, 390, 320px พร้อม screenshot หลังแต่ละเฟส
- ตรวจ Fashion, Prescription, Services, About, Contact และ Blog ทั้งสองภาษาที่ 1440, 820, 390px
- ตรวจ touch ผ่าน Chromium touch events, keyboard navigation, menu Escape/focus และ mobile contact
- ตรวจ independent product galleries, color changes, outer navigation และการรักษา state ครบ 8 รูปแบบภาษา/ขนาดจอ
- ตรวจ semantic h1, crawlable links, server-rendered content เมื่อปิด JavaScript และ reduced motion
- เปรียบเทียบ title/description/canonical/hreflang/JSON-LD ของหน้ารองกับ snapshot ก่อน Phase 6: ตรงกัน
- ความสูง carousel ไม่เปลี่ยนเมื่อใช้ปุ่มเปลี่ยนสไลด์หรือสีในชุดข้อมูลทดสอบ
- ยังวัด layout shift ช่วงโหลดหน้าได้เล็กน้อย: สูงสุดประมาณ 0.0093 ในหน้าอังกฤษกว้าง 320px จึงไม่ได้อ้างว่า CLS เป็นศูนย์

สคริปต์ตรวจอยู่ใน `scripts/editorial-qa.cjs`, `scripts/editorial-navigation-qa.cjs`, `scripts/product-carousel-qa.cjs`
ใช้ Playwright ที่ติดตั้งใน runtime ของเครื่องผ่าน `PLAYWRIGHT_MODULE` และ Edge headless
ภาพและผลทดสอบเก็บใน `%TEMP%/kojikane-qa/`

## ข้อจำกัด

- ภาพส่วนใหญ่ยังเป็น placeholder; ลายผนังใช้รูปที่ผู้ใช้ให้ไว้
- ไม่สร้างรีวิวลูกค้า และไม่อ้างว่าภาพ placeholder เป็นภาพสินค้าจริงหลายมุม
- Gallery รายละเอียดเป็นภาพประกอบทั่วไป ยังต้องแทนด้วยภาพหน้าตรง ด้านข้าง บานพับ และภาพสวมจริงตามสินค้าที่มี
- ทดสอบ responsive ด้วย browser emulation ยังไม่ได้ทดสอบบน iPhone/Android จริงหรือทำ screen-reader audit เต็มรูปแบบ
- ผล performance เป็นการวัดใน local dev browser ไม่ใช่ข้อมูล Core Web Vitals จากผู้เข้าชมจริง

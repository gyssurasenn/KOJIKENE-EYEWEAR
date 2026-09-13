# คู่มือเปลี่ยนรูปแต่ละ section

ไฟล์รูปอยู่ใน `public/images/` ส่วนรายการอ้างอิงอยู่ใน `lib/images.ts`
เว็บนี้ยังไม่มีระบบอัปโหลดหลังบ้าน: เพิ่มไฟล์ในโปรเจกต์แล้ว deploy จึงจะขึ้นเว็บจริง

## เปลี่ยนรูปโดยไม่แก้ layout

1. เพิ่มไฟล์จริงใน `public/images/` ใช้ชื่อภาษาอังกฤษ ไม่มีช่องว่าง
2. เปิด `lib/images.ts` แล้วหา key ตามตาราง
3. เปลี่ยน `src`, `alt`, `width`, `height` ให้ตรงกับไฟล์จริง และนำ `placeholder: true` ออก
4. ตรวจการครอปรูปบน desktop และ mobile เพราะส่วนที่ใช้ `object-cover` จะตัดภาพให้เต็มกรอบ

| ส่วน | Key ใน lib/images.ts | Component |
| --- | --- | --- |
| Hero รูปแรก | images.hero | components/home/Hero.tsx |
| Hero แฟชั่น | images.fashionEyewear | components/home/Hero.tsx |
| Hero สายตา | images.prescriptionEyewear | components/home/Hero.tsx |
| ประสบการณ์หน้าร้าน รูปใหญ่ | images.family | components/home/FamilyStory.tsx |
| ประสบการณ์หน้าร้าน รูปเล็ก | images.storeInterior | components/home/FamilyStory.tsx |
| บริการหน้าแรก | images.fitting | components/home/ServicesSection.tsx |
| บทความ | images.journal ตาม slug | content/articles/th.ts และ en.ts |
| กรอบแว่น editorial เดิม | images.frames | content/eyewear.ts |
| สินค้าหน้าแรก | รายการรูปที่ products อ้างถึง | content/products.ts |

ชื่อ `family` เป็น key เดิมในโค้ด ไม่ได้หมายความว่าต้องใช้รูปครอบครัว ใช้ภาพปรึกษาหรือ fitting หน้าร้านได้
บาง key ใช้ร่วมหลายหน้า เปลี่ยนครั้งเดียวจึงอาจเปลี่ยนหลายตำแหน่ง
ค้นหา `images.ชื่อKey` เพื่อดูจุดใช้งานทั้งหมดก่อนเปลี่ยน

## พื้นหลัง

ปัจจุบัน wallpaper เป็น CSS `background-image` ใน `app/globals.css`
เปลี่ยน URL ของ `.wallpaper-section` หรือ `.wallpaper2-section` ให้ตรงกับไฟล์ใน `public/images/`
พื้นหลังเต็มจอให้อยู่ section ชั้นนอก ส่วน `shell` อยู่ div ชั้นใน

## แบรนด์ในร้าน

แถบแบรนด์แทนขั้นตอน 6 ข้อด้านล่างส่วนแนะนำร้านหน้าแรก ใช้รูปจริง 11 แบรนด์ใน `public/images/brandInstore/`
เพิ่ม/เปลี่ยน/เรียงแบรนด์ที่ `inStoreBrands` ใน `lib/images.ts` โดยใส่ชื่อไฟล์ตรงตัวพิมพ์ใหญ่เล็ก และขนาดจริง
ตัวเลื่อนอยู่ใน `components/home/InStoreBrands.tsx`: `delay: 3000` คือเวลารอ และ `speed: 1200` คือเวลาขยับ หน่วยมิลลิวินาที
หยุดเมื่อวางเมาส์หรือโฟกัสภายใน มีปุ่มหยุด/เล่น และไม่เล่นอัตโนมัติเมื่อเปิด reduced motion

## เพิ่มชุดสินค้า (ขั้นตอน)

ดูตัวอย่างครบใน [PRODUCT_GUIDE.md](./PRODUCT_GUIDE.md)

1. เพิ่มรูปแต่ละมุม เช่น `public/images/products/bolon-bj5036/01.webp`
2. ประกาศชุดรูปใน `lib/images.ts` โดยแต่ละรูปมี src, alt, width, height
3. นำเข้าชุดรูปแล้วเพิ่ม object ใน array `products` ของ `content/products.ts`
4. ใส่ id ไม่ซ้ำ, brand, name, model, images และ colors; price กับ freeShipping เป็น optional
5. คง `isDemo: true` ระหว่างทดลอง เปลี่ยนเป็น false เมื่อข้อมูลสินค้า ราคา และเงื่อนไขยืนยันแล้ว

การเพิ่มสินค้าใน array จะเพิ่มการ์ดและชุดเลื่อนอัตโนมัติ ไม่ต้องสร้าง ProductCard หรือ Swiper ใหม่เอง
สินค้าแต่ละสีใส่ images, model, price ของตัวเองได้ รูปจะเปลี่ยนเฉพาะการ์ดนั้น
ข้อมูลสินค้าหน้าแรกใน `content/products.ts` แยกจากรายการ editorial ใน `content/eyewear.ts`

## ตรวจหลังเปลี่ยน

- รัน `npm run typecheck`
- เปิดหน้าไทยและ `/en` ทั้งจอกว้างและมือถือ
- ตรวจรูปโหลดครบ ขอบแว่นไม่ถูกตัด และการเลือกสี/เลื่อนรูปทำงาน
- อย่าลบรูปเก่าจนแน่ใจว่าไม่มีหน้าอื่นอ้างอิง

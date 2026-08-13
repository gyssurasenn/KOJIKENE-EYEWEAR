# AGENTS.md — ข้อตกลงการทำงานของ AI Agent ในโปรเจกต์ KOJIKANE EYEWEAR

> เอกสารนี้บอกวิธีที่ AI coding agent ควรทำงานกับ repo นี้  
> ให้ตอบผู้ใช้เป็น **ภาษาไทย** เป็นหลัก ยกเว้นชื่อไฟล์ โค้ด command และ technical term

---

## 1. ก่อนเริ่มแก้โค้ด

ให้อ่านไฟล์เหล่านี้ก่อนเสมอเมื่อเกี่ยวข้อง:

1. `CONTEXT.md` — บริบทโปรเจกต์, โครงสร้าง, กฎธุรกิจ, คำอธิบายสำหรับมือใหม่
2. `README.md` — วิธีรันโปรเจกต์และรายละเอียด architecture
3. `lib/site.ts` — ข้อมูลร้านจริง เช่น เบอร์โทร ที่อยู่ LINE Facebook เวลาเปิด
4. ไฟล์ `page.tsx` หรือ component ที่กำลังจะแก้

ถ้างานเป็นแค่แก้เล็กน้อย เช่น typo หรือ className จุดเดียว อ่านเฉพาะส่วนที่เกี่ยวข้องก็พอ

---

## 2. ภาษาและการสื่อสาร

- คุยกับผู้ใช้เป็นภาษาไทย
- อธิบายเหตุผลแบบเข้าใจง่าย เพราะเจ้าของโปรเจกต์กำลังเริ่ม Next.js + TSX
- ถ้าใช้คำ technical ให้ตามด้วยคำอธิบายสั้น ๆ เมื่อเหมาะสม
- อย่าตอบแค่ “แก้แล้ว” ให้บอกด้วยว่าแก้ไฟล์ไหนและกระทบอะไร
- ถ้างานมีความเสี่ยง ให้บอกก่อนลงมือ

---

## 3. กฎสำคัญของโปรเจกต์

### 3.1 ข้อมูลร้านอยู่ที่เดียว

ข้อมูลจริงของร้านต้องอยู่ใน `lib/site.ts`

เช่น:

- เบอร์โทร
- LINE
- Facebook
- ที่อยู่
- เวลาเปิด
- Google Maps URL
- navigation

ห้าม hardcode ข้อมูลเหล่านี้ซ้ำใน component ถ้าไม่จำเป็น

### 3.2 ข้อความบนเว็บอยู่ใน locales

ข้อความที่ผู้ใช้เห็นควรอยู่ใน:

- `locales/th/translation.json`
- `locales/en/translation.json`

ถ้าเพิ่ม key ภาษาไทย ต้องเพิ่ม key ภาษาอังกฤษด้วย

### 3.3 รูปอยู่ใน `lib/images.ts`

ถ้าจะเปลี่ยนรูป:

1. ใส่รูปใน `public/images/`
2. แก้ reference ใน `lib/images.ts`
3. เขียน `alt` ให้ถูกกับภาพจริง

อย่าแปะ path รูปมั่ว ๆ ลงหลาย component

---

## 4. แนวทางการแก้ Next.js + TSX

### 4.1 เริ่มจาก route ก่อน

ถ้าผู้ใช้บอกว่า “หน้า contact” ให้เริ่มดู:

```txt
app/[locale]/contact/page.tsx
```

จากนั้นดูว่า page เรียก component อะไรบ้าง

### 4.2 แก้ component ให้เล็กและชัด

ถ้า component เริ่มใหญ่เกินไป ให้แยกเป็น helper component ภายในไฟล์เดียวกันก่อน เช่น:

```tsx
function ContactMapPanel() {
  return (...);
}
```

ยังไม่ต้องสร้างไฟล์ใหม่ถ้าใช้เฉพาะหน้าเดียว

### 4.3 อย่าใส่ `'use client'` ถ้าไม่จำเป็น

ใช้ `'use client'` เฉพาะเมื่อจำเป็นต้องใช้:

- `useState`
- `useEffect`
- event/interaction ที่ต้องทำงานใน browser
- browser API

เว็บนี้ตั้งใจใช้ Server Components เป็นหลัก

---

## 5. Workflow เมื่อต้องแก้ UI

1. หาไฟล์ page/component ที่เกี่ยวข้อง
2. ดูว่าข้อมูลมาจาก `lib/site.ts`, `content/`, หรือ `locales/`
3. แก้เฉพาะจุดที่จำเป็น
4. เช็ก responsive class เช่น mobile/desktop
5. รัน `npm run typecheck`
6. ถ้าแก้ใหญ่หรือกระทบหลายหน้า ค่อยรัน `npm run build`

ถ้า build ติดเพราะ sandbox/permission ให้บอกผู้ใช้ตรง ๆ และขออนุญาตก่อนรันนอก sandbox

---

## 6. Workflow เมื่อต้องแก้ copy

1. หา key ใน `locales/th/translation.json`
2. แก้ภาษาไทย
3. แก้ key เดียวกันใน `locales/en/translation.json`
4. อย่าเปลี่ยน key name ถ้าไม่จำเป็น
5. ถ้า copy เป็นข้อมูลจริง เช่น เบอร์/ที่อยู่ ให้ไปแก้ที่ `lib/site.ts` แทน

---

## 7. Workflow เมื่อต้องแก้ Contact / Map

ไฟล์หลัก:

- `app/[locale]/contact/page.tsx`
- `components/sections/VisitStore.tsx`
- `lib/site.ts`

กฎ:

- `mapsEmbedUrl` และ `mapsDirectionsUrl` ต้องมาจาก `lib/site.ts`
- ถ้าเปลี่ยน layout map ให้แก้ใน `VisitStore.tsx`
- ถ้าเพิ่ม/ลบ section บนหน้า contact ให้แก้ใน `contact/page.tsx`
- อย่าใส่ iframe Google Maps ซ้ำในหลายไฟล์

---

## 8. Workflow เมื่อต้องเพิ่มบทความ

ไฟล์:

- `content/articles/th.ts`
- `content/articles/en.ts`

กฎ:

- ต้องเพิ่มทั้งภาษาไทยและอังกฤษ
- slug ควรตรงกันทั้งสองภาษา
- รูปบทความต้องอ้างผ่าน `lib/images.ts`
- SEO title/description ต้องเหมาะกับแต่ละภาษา

---

## 9. สิ่งที่ควรหลีกเลี่ยง

- อย่าแก้หลายเรื่องใน turn เดียวถ้าผู้ใช้ไม่ได้ขอ
- อย่า refactor ใหญ่โดยไม่จำเป็น
- อย่าเปลี่ยน route/path โดยไม่ถามก่อน
- อย่าเปลี่ยน i18n key เดิมแบบสุ่ม
- อย่า hardcode business facts ซ้ำ
- อย่าเพิ่ม dependency ใหม่ถ้าใช้ CSS/React เดิมทำได้
- อย่าลบไฟล์หรือรูปจำนวนมากโดยไม่ขออนุญาต
- อย่า claim ว่า build ผ่าน ถ้ายังไม่ได้รันจริง

---

## 10. การตรวจงานก่อนตอบผู้ใช้

อย่างน้อยควรทำ:

```bash
npm run typecheck
```

ถ้าเป็นงาน layout/หน้าเว็บ ควรบอกผู้ใช้ว่า:

- แก้ไฟล์ไหน
- ผลลัพธ์ที่คาดว่าจะเห็นคืออะไร
- มีอะไรที่ยังไม่ได้ทดสอบ เช่น production build หรือ visual browser check

ถ้ารัน build ได้:

```bash
npm run build
```

---

## 11. วิธีอธิบายให้เจ้าของโปรเจกต์เข้าใจ

เจ้าของโปรเจกต์เพิ่งเริ่ม Next.js + TSX ดังนั้นเวลาอธิบายให้ใช้โครงแบบนี้:

1. “ไฟล์นี้คือหน้า”
2. “ไฟล์นี้คือ component”
3. “ข้อมูลจริงมาจากไฟล์นี้”
4. “ข้อความมาจากไฟล์ภาษา”
5. “ถ้าจะปรับเอง ให้เริ่มที่จุดนี้”

ตัวอย่าง:

> หน้า Contact อยู่ที่ `app/[locale]/contact/page.tsx`  
> แต่แผนที่จริงถูกวาดจาก component `components/sections/VisitStore.tsx`  
> ส่วน URL แผนที่มาจาก `lib/site.ts`

---

## 12. เมื่อเจอบริบทใหม่

ถ้าผู้ใช้บอกข้อมูลธุรกิจใหม่ เช่น:

- เวลาเปิดร้านจริง
- บริการใหม่
- จุดขายใหม่
- ข้อมูลการเดินทาง
- วิธีเรียกสินค้า/บริการของร้าน

ให้พิจารณาอัปเดต `CONTEXT.md` ด้วย เพื่อให้ครั้งต่อไปไม่ต้องถามซ้ำ


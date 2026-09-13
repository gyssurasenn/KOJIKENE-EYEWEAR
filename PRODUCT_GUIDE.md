# การเพิ่มสินค้าและรูปใน KOJIKANE

ส่วนแว่นคัดสรรหน้าแรกเป็น Product Carousel ที่แต่ละการ์ดมี Image Swiper ของตัวเอง
ปุ่มด้านล่างเลื่อนชุดสินค้า ส่วนลูกศรและจุดบนรูปเลื่อนเฉพาะรูปในการ์ดนั้น
ข้อมูลปัจจุบันติดป้ายสินค้าตัวอย่าง และยังไม่ใช่ข้อมูลจำหน่ายจริง

## ไฟล์ที่ใช้

| งาน | ไฟล์ |
| --- | --- |
| เพิ่มสินค้า ชื่อ รุ่น ราคา สี ป้ายจัดส่ง | `content/products.ts` |
| กำหนดรายการรูป | `lib/images.ts` |
| วางไฟล์รูปจริง | `public/images/products/` |
| หน้าตาการ์ดและ gallery ภายในการ์ด | `components/eyewear/ProductCard.tsx` |
| รวมการ์ดเป็น carousel | `components/eyewear/ProductCarousel.tsx` |
| ตำแหน่ง section บนหน้าแรก | `components/home/FeaturedEyewear.tsx` |
| ขนาด ระยะห่าง สี และปุ่ม | `app/editorial.css` |
| คำบนปุ่มและป้าย | `locales/th/translation.json`, `locales/en/translation.json` → `common.products` |

## 1. เพิ่มรูปจริง

ตัวอย่างที่เก็บรูป:

```text
public/images/products/bolon-bj5036/01.webp
public/images/products/bolon-bj5036/02.webp
public/images/products/bolon-bj5036/03.webp
public/images/products/bolon-bj5036/04.webp
```

แต่ละสินค้าใช้จำนวนรูปต่างกันได้ ไม่จำเป็นต้องมี 4 รูปเสมอไป
ถ้ามีรูปเดียว จะซ่อนลูกศรและจุด; ถ้าไม่มีรูป จะแสดงพื้นที่รอรูปที่มีขนาดคงที่
ใช้ภาพสี่เหลี่ยมประมาณ 1000–1400px ให้มีพื้นที่รอบแว่นใกล้เคียงกันทุกมุม
การ์ดใช้ `object-contain` เพื่อไม่ตัดขอบแว่น

เพิ่มรายการอ้างอิงใน `lib/images.ts` เช่น:

```ts
export const productImages = {
  bolonBJ5036: [
    {
      src: '/images/products/bolon-bj5036/01.webp',
      alt: 'BOLON BJ5036 frame, front view',
      width: 1200,
      height: 1200,
    },
    {
      src: '/images/products/bolon-bj5036/02.webp',
      alt: 'BOLON BJ5036 frame, side view',
      width: 1200,
      height: 1200,
    },
  ],
};
```

ชื่อรุ่นและขนาดด้านบนเป็นตัวอย่าง ต้องใส่ข้อมูลให้ตรงกับสินค้าและไฟล์จริง

## 2. เพิ่มข้อมูลสินค้า

นำเข้า `productImages` ใน `content/products.ts` แล้วเพิ่มรายการใน `products`:

```ts
{
  id: 'bolon-bj5036',
  brand: 'BOLON',
  name: 'BJ5036',
  model: 'BJ5036/B60/52',
  price: 4490,
  images: productImages.bolonBJ5036,
  colors: [
    { id: 'b60', hex: '#eef5f5' },
  ],
  isDemo: true,
  freeShipping: false,
}
```

- `id` ต้องไม่ซ้ำ และควรคงเดิมเมื่อแก้ข้อมูล
- `price` เป็นตัวเลขหน่วยบาท ถ้ายังไม่ระบุให้ละ property นี้ จะแสดง “สอบถามราคา”
- `isDemo: true` แสดงป้ายสินค้าตัวอย่าง; เปลี่ยนเป็น `false` เมื่อยืนยันข้อมูลจริงแล้ว
- `freeShipping: true` แสดงป้ายจัดส่งฟรีเฉพาะสินค้านั้น เมื่อยังเป็น demo ป้ายจะบอกว่าเป็นตัวอย่าง
- `colors: []` ใช้ได้ถ้ายังไม่มีสีให้เลือก
- `descriptionKey` เป็น optional key ในไฟล์ภาษา สำหรับคำอธิบายที่เปิดอ่านได้ใต้การ์ด

ตัวอย่างสีที่มีรูป รหัสรุ่น และราคาของตัวเอง:

```ts
colors: [
  { id: 'b60', hex: '#eef5f5' },
  {
    id: 'black',
    hex: '#252525',
    model: 'MODEL-BLACK',
    images: productImages.blackVariant,
    price: 4590,
  },
]
```

เมื่อเลือกสี จะเปลี่ยนข้อมูลเฉพาะการ์ดนั้น และเริ่มรูปที่ 1 ของสีใหม่
ถ้าไม่ใส่ `images`, `model`, หรือ `price` ในสี จะใช้ค่าหลักของสินค้า
รูปใน `demoProductGalleries` เป็นภาพประกอบหลายแบบสำหรับทดสอบ UI ไม่ใช่มุมต่าง ๆ ของสินค้าจริง

## การทำงาน

- Desktop: แสดง 4 การ์ดต่อชุด
- Tablet: ประมาณ 2 การ์ดและขอบใบถัดไป
- Mobile: 1 การ์ดและขอบใบถัดไป
- ลากบนภาพ: เปลี่ยนรูปเฉพาะการ์ดนั้น
- ลูกศรใต้ section: เปลี่ยนชุดสินค้า
- โฟกัส gallery แล้วกดลูกศรซ้าย/ขวา: เปลี่ยนรูปภายใน ไม่ส่งคำสั่งไป carousel ชั้นนอก
- ไม่มี autoplay, cart, checkout หรือการรับชำระเงิน

หลังแก้ให้รัน `npm run typecheck` และตรวจทั้งหน้าไทยกับ `/en`

# TEKA NEXUS — پکیج کامل SEO و ASO 🚀

> هرچی لازمه تا تکا نکسوس تو گوگل، شبکه‌های اجتماعی و مایکت بدرخشه.
> آخرین به‌روزرسانی: اکتبر ۲۰۲۶

---

## ۱. چی توی کد پیاده شده؟ (خودکار)

| مورد | فایل | توضیح |
|---|---|---|
| متاتگ‌های کامل (title, description, keywords فارسی+انگلیسی) | `src/app/layout.tsx` | با `metadataBase` درست — **عنوان فارسی‌محور: «تکا نکسوس — آموزش رایگان برنامه‌نویسی…»** |
| محتوای فارسی SSR (h1 + توضیح برند) | `src/app/page.tsx` | متن فارسی مستقیم توی HTML خام — برای گوگل و اسکرین‌ریدر (بلاک sr-only + noscript) |
| `alternateName` فارسی («تکا نکسوس»، «تکا») | `src/app/layout.tsx` JSON-LD | به گوگل یاد می‌ده اسم فارسی برند چیه → جستجوی «تکا» به ما وصل می‌شه |
| hreflang fa-IR / en-US | `src/app/layout.tsx` | گوگل می‌فهمه سایت برای مخاطب فارسیه |
| Open Graph + Twitter Card بزرگ (summary_large_image) | `src/app/layout.tsx` | لینک‌ها تو تلگرام/واتساپ/X خوشگل دیده می‌شن |
| تصویر اشتراک‌گذاری `public/og.png` (۱۴۴۰×۷۳۶) | AI-generated | بنر تیره نئونی متناسب با برند |
| `sitemap.xml` | `src/app/sitemap.ts` | به‌صورت خودکار ساخته می‌شه: `/sitemap.xml` |
| `robots.txt` (با Disallow برای /api/) | `public/robots.txt` | + آدرس سایت‌مپ |
| دادهٔ ساختاریافته JSON-LD (WebSite + MobileApplication) | `src/app/layout.tsx` | شانس Rich Result تو گوگل |
| canonical + max-image-preview:large | `src/app/layout.tsx` | کنترل ایندکس و نمایش بزرگ عکس تو سرچ |

### بعد از دیپلوی — دو قدم دستی (۵ دقیقه):
1. **Google Search Console**: برو به [search.google.com/search-console](https://search.google.com/search-console) → Add Property → `https://teka-nexus.vercel.app` → Submit sitemap: `sitemap.xml`
2. **Bing Webmaster Tools** (اختیاری ولی تو ایران Bing و Google هر دو مهم‌ان): [bing.com/webmasters](https://www.bing.com/webmasters) → ایمپورت از Search Console.

### چقدر طول می‌کشه تا «تکا» رو بیاره؟ (انتظار واقعی)
- **فقط اگه تو Search Console ثبت کنی** گوگل سریع ایندکس می‌کنه. بدون ثبت، ممکنه هفته‌ها طول بکشه یا اصلاً پیدا نشه.
- بعد از ثبت: اول **«تکا نکسوس»** رو بیاره (چند روز تا ۲ هفته) — بعد کم‌کم **«تکا»** تنها هم جواب می‌ده (چند هفته تا چند ماه، بستگی به بک‌لینک و اشتراک‌گذاری داره).
- «تکا» یه کلمه‌ی رقابتیه؛ برای رتبه بهتر تو این کوئری، لینک سایت رو تو بایو تلگرام/اینستاگرام/گیت‌هاب بذار (بک‌لینک = مهم‌ترین سیگنال).
- ترفند: تو Search Console بعد از ثبت، بالاترین سرعت ایندکس رو با URL Inspection → Request Indexing بگیر.

### تأیید مالکیت (Verification) بدون تغییر کد:
- موقع Add Property، روش **HTML file** رو انتخاب کن → فایل `googleXXXX.html` رو دانلود کن → بذار توی `public/` → پوش کن. تمام!
- یا: تو Vercel متغیر محیطی `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` رو با مقدار `content` تگ متا ست کن (کد آماده‌ست، خودش تگ رو می‌سازه).

---

## ۲. متن‌های آمادهٔ SEO (کپی/پیست)

### Title (حدود ۶۰ کاراکتر — برای گوگل):
```
TEKA NEXUS — آموزش رایگان برنامه‌نویسی و ساخت پروژه واقعی
```

### Meta Description (حدود ۱۵۵ کاراکتر):
```
تکا نکسوس: آکادمی رایگان برنامه‌نویسی (پایتون و وب) + شبکه اجتماعی برای پیدا کردن هم‌تیمی و ساخت پروژه واقعی. امضای دیجیتال مهارتت رو بگیر. ایده‌ها رو به تکنولوژی واقعی تبدیل کن.
```

### نسخهٔ انگلیسی:
```
Title: TEKA NEXUS — Learn Programming Free, Build Real Projects
Description: Free Python & web dev academy + a social platform to find teammates and ship real projects. Earn a verified reputation. Where ideas become real technology.
```

### هشتگ‌های شبکه‌های اجتماعی:
```
#تکا_نکسوس #آموزش_برنامه_نویسی #پایتون #برنامه_نویسی #کدنویسی #TEKANexus #LearnToCode #Python
```

### متن معرفی کوتاه (برای بایو و تبادل):
```
🚀 تکا نکسوس — اونجایی که ایده‌ها به تکنولوژی واقعی تبدیل می‌شن.
✅ آکادمی رایگان پایتون و وب (با آزمون و گواهینامه)
✅ پیدا کردن هم‌تیمی برای پروژه‌های واقعی
✅ سیستم اعتبار تأییدشده
🔗 teka-nexus.vercel.app
```

---

## ۳. ASO مایکت (App Store Optimization)

### عنوان اپ در مایکت (حداکثر ۵۰ کاراکتر):
```
تکا نکسوس — آموزش رایگان برنامه‌نویسی و تیم‌سازی
```

### توضیح کوتاه مایکت (حداکثر ۸۰ کاراکتر):
```
یادگیری رایگان پایتون و وب + پیدا کردن هم‌تیمی برای پروژه واقعی
```

### کلمات کلیدی هدف (تو متن توضیحات تکرارشون طبیعی باشن):
```
آموزش برنامه نویسی رایگان، آموزش پایتون از صفر، یادگیری کدنویسی،
هم‌تیمی پروژه، تیم برنامه نویسی، گواهینامه برنامه نویسی،
پروژه برنامه نویسی، شبکه اجتماعی برنامه نویسان، آکادمی برنامه نویسی
```

### نکتهٔ طلایی مایکت:
- تو **۳ خط اول** توضیحات، کلمات کلیدی اصلی رو بذار (قبل از «بیشتر» دیده می‌شن)
- اسکرین‌شات اول = مهم‌ترین تصویر؛ صفحهٔ آکادمی یا داشبورد رو بذار
- هر آپدیت، متن توضیحات رو کمی به‌روز کن (مایکت تازگی متن رو دوست داره)

---

## ۴. چک‌لیست رشد (اختیاری، ولی خفن)

- [ ] دامنهٔ اختصاصی بخر (`tekanexus.ir` یا `teka-nexus.com`) — دامنهٔ اختصاصی تو گوگل اعتبار بیشتری داره تا `vercel.app`
- [ ] بعد از خرید دامنه: تو Vercel → Settings → Domains اضافه‌ش کن و `NEXT_PUBLIC_SITE_URL` رو تو env آپدیت کن (metadata و sitemap خودکار آپدیت می‌شن)
- [ ] هر هفته ۲–۳ پروژهٔ نمونهٔ عمومی جذاب تو سایت داشته باش (محتوای ایندکس‌شدنی)
- [ ] لینک مایکت رو تو سایت (فوتر) بذار — سئوی متقابل اپ و سایت
- [ ] آپدیت `privacy.html` اگه دامنه عوض شد

---

## ۵. تست سریع بعد از دیپلوی

```bash
# متاتگ‌ها
curl -s https://teka-nexus.vercel.app | rg -o '<title>[^<]*|og:image[^>]*|twitter:card[^>]*'

# سایت‌مپ
curl -s https://teka-nexus.vercel.app/sitemap.xml | head -5

# robots
curl -s https://teka-nexus.vercel.app/robots.txt

# تصویر OG
curl -sI https://teka-nexus.vercel.app/og.png | head -3
```

پیش‌نمایش اشتراک‌گذاری: آدرس سایت رو تو [opengraph.xyz](https://www.opengraph.xyz) یا تلگرام (فقط پیست کن تو چت) تست کن.

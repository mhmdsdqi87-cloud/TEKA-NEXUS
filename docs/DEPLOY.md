# انتشار TEKA NEXUS — راهنمای انتشار / Publishing Guide

این سند دقیقاً مراحل «زنده و روشن شدن برای انتشار» است: گیت‌هاب → دیتابیس → دپلوی → نصب‌شدن روی گوشی (مایکت/PWA).

---

## ۱. اتصال گیت‌هاب / GitHub

ریپو محلی آماده است (initial commit زده شده). برای وصل‌کردن اکانت گیت‌هاب خودتان:

```bash
# گزینهٔ الف — با gh CLI (ساده‌ترین):
gh auth login                      # مرورگر باز می‌شود، لاگین کنید
gh repo create teka-nexus --public --source=. --push

# گزینهٔ ب — بدون gh:
# 1) در github.com یک ریپوی خالی بسازید (مثلاً teka-nexus)
git remote add origin https://github.com/USERNAME/teka-nexus.git
git push -u origin main
```

CI (GitHub Actions) از قبل گذاشته شده: `.github/workflows/ci.yml` روی هر push
`lint` + `tsc` را اجرا می‌کند.

> در سندباکس هیچ توکن گیت‌هابی موجود نبود، پس push از اینجا انجام نشد — دستورهای بالا
> روی سیستم خودتان ۳۰ ثانیه بیشتر نمی‌گیرد.

## ۲. دیتابیس production (Supabase)

طبق `docs/SUPABASE.md` — فقط رمز دیتابیس لازم است:

```bash
bun run db:switch:postgres && bunx prisma db push
```

## ۳. دپلوی / Deploy

### گزینهٔ الف — Vercel (پیشنهادی، ۵ دقیقه)

1. ریپو را به Vercel وصل کنید (vercel.com → New Project → import از گیت‌هاب)
2. Environment Variables → `DATABASE_URL` (رشتهٔ Supabase با رمز واقعی)
3. Deploy. تمام.

### گزینهٔ ب — سرور خودتان (VPS)

```bash
bun install
bun run build:standalone # خروجی standalone در .next/standalone
DATABASE_URL="postgresql://..." bun run start   # پورت ۳۰۰۰
# جلوی آن Caddy/Nginx با HTTPS بگذارید (فایل Caddyfile همین ریپو یک نمونهٔ آماده است)
```

## ۴. PWA — نصب روی گوشی / Installable app

همه‌چیز آماده است:

- `public/manifest.webmanifest` (نام، آیکون‌ها، standalone، رنگ برند)
- آیکون‌های 192/512/maskable + apple-touch-icon (رندرشده از لوگوی واقعی TEKA — `bun run icons` برای ساخت مجدد)
- `public/sw.js` سرویس‌ورکر امن (فقط production رجیستر می‌شود — `src/components/shared/pwa-register.tsx`)
- متادیتای کامل SEO/OG/Twitter در `src/app/layout.tsx`

بعد از دپلوی: کاربر با کروم موبایل «Add to Home screen» می‌زند و اپ مثل یک اپلیکیشن
تمام‌صفحه باز می‌شود — بدون Nothing Phone، روی همهٔ اندرویدها/آیفون‌ها.

### مایکت / Myket

مایکت اپ اندروید می‌خواهد. دو راه:

1. **TWA (پیشنهادی)** — با [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) از همین PWA یک فایل AAB بسازید:
   ```bash
   npm i -g @bubblewrap/cli
   bubblewrap init --manifest https://YOUR-DOMAIN/manifest.webmanifest
   bubblewrap build        # خروجی: app-release-bundle.aab → آپلود در مایکت
   ```
   (دامنه باید HTTPS + تعریف `assetlinks.json` باشد که Bubblewrap خودش راهنمایی می‌کند.)
2. وب‌اپ مستقیم: مایکت لینک وب را به‌عنوان اپ ساده قبول نمی‌کند؛ حتماً TWA بسازید.

## ۵. چک‌لیست انتشار / Pre-launch checklist

- [x] tsc و eslint بدون خطا (dev.log بدون 5xx)
- [x] ثبت‌نام/لاگین در iframe و مرورگر واقعی تست شده
- [x] founder console، آواتار، امتحان + لایسنس، چت تیمی — همه E2E تست شده
- [x] PWA + SEO + robots
- [ ] `DATABASE_URL` واقعی Supabase + `prisma db push`
- [ ] دامنه + HTTPS
- [ ] AAB برای مایکت (بند ۴)

## ۶. محدودیت‌های شناخته‌شده / Known limitations (صادقانه)

- اجرای Python در آکادمی **زیرمجموعه‌ای از پایتون** است (pylite داخل مرورگر؛ بدون شبکه/فایل) — در UI هم شفاف اعلام شده.
- چت تیمی روی سرویس socket.io مجزا (پورت 3030) اجرا می‌شود؛ در دپلوی باید کنار اپ اصلی بالا بیاید (توجه به CORS/gateway).
- AI tutor به سرویس LLM متصل است؛ بدون آن باکس‌ها پیام خطای شفاف می‌دهند، نه نتیجهٔ جعلی.

# اتصال TEKA NEXUS به Supabase — راهنمای کامل / Supabase Connection Guide

> وضعیت صادقانه (Honest status): اتصال HTTPS به پروژه Supabase شما **برقرار است و تست شد**
> (`https://ljevcviygnknjmhzvtjk.supabase.co/auth/v1/health` → HTTP 200 ✅) ولی:
> 1. رشتهٔ اتصال دیتابیس که فرستادید `[YOUR-PASSWORD]` دارد — یعنی **رمز واقعی هنوز به ما داده نشده**.
> 2. در محیط ساخت (سندباکس فعلی) پورت 5432 بسته است، پس اتصال مستقیم PostgreSQL اینجا ممکن نیست.
>
> پس طبق قانون خود سند («اگر اعتبارنامه در دسترس نیست، مرز اتصال بساز و جعلی نساز») همه‌چیز
> **آمادهٔ اتصال** ساخته شد؛ فقط رمز را بگذارید و ۳ دستور زیر را اجرا کنید.

---

## ۱. رمز دیتابیس را پیدا کن / Find your database password

پنل Supabase → پروژهٔ `ljevcviygnknjmhzvtjk` → **Settings → Database → Connection string → URI**

اگر رمز را یادتان نیست: همان صفحه دکمهٔ **Reset database password** را بزنید.

رشتهٔ نهایی باید این شکلی باشد (بدون هیچ `[]`):

```
postgresql://postgres:RAMZ_VAGHEI_SHOMA@db.ljevcviygnknjmhzvtjk.supabase.co:5432/postgres
```

## ۲. آن را در `.env` بگذار / Put it in .env

```bash
cp .env.example .env   # اگر .env از قبل نیست
# فایل .env را باز کنید و DATABASE_URL را با رشتهٔ بالا (با رمز واقعی) عوض کنید
```

## ۳. Prisma را به Postgres سوئیچ کن و جدول‌ها را بساز / Switch & push

```bash
bun run db:switch:postgres   # provider را در prisma/schema.prisma به postgresql عوض می‌کند
bunx prisma db push          # همهٔ ۲۰+ جدول TEKA را در Supabase می‌سازد
bun run dev                  # اجرا — حالا کل سایت (ثبت‌نام، پروژه‌ها، آکادمی، امتحان، چت) روی Supabase است
```

برگشت به SQLite محلی (برای توسعهٔ آفلاین):

```bash
bun run db:switch:sqlite && bunx prisma db push
```

## ۴. Supabase CLI (اختیاری) / Supabase CLI

دستورهایی که خودتان فرستادید، به ترتیب درست:

```bash
supabase login                                   # با اکانت Supabase خودتان لاگین می‌کند
supabase init                                    # فقط یک‌بار، در ریشهٔ پروژه (پوشهٔ supabase/ می‌سازد)
supabase link --project-ref ljevcviygnknjmhzvtjk # پروژه را به کد وصل می‌کند
```

> نکته: چون Prisma مایگریشن‌ها را مدیریت می‌کند، برای ساخت جدول‌ها لازم به `supabase db push` نیست —
> `bunx prisma db push` کافی و دقیق‌تر است. CLI برای بکاپ و برنچ‌کردن خوب است:
> `supabase db dump -f backup.sql`

## ۵. امنیت / Security (از سند اصلی §16 و §18)

- کلید `sb_publishable_...` فقط برای مرورگر است (جایگزین anon key) — مشکلی ندارد.
- **هیچ‌وقت** `service_role` را در کد کلاینت یا گیت‌هاب نگذارید.
- رمز دیتابیس فقط در `.env` می‌ماند و `.env` در `.gitignore` است ✅
- اگر بعداً Supabase Auth/RLS خواستید: RLS را روی جدول‌های exposed فعال کنید و عملیات privileged
  سمت سرور ولیدیت شود (معماری فعلی TEKA همه‌چیز را سمت سرور با سشن خودش کنترل می‌کند، پس
  نیازی به RLS برای همین معماری نیست).

## ۶. چک‌لیست بعد از اتصال / Post-switch checklist

- [ ] ثبت‌نام یک کاربر تستی از UI → رکورد در جدول `User` دیده می‌شود (Table Editor)
- [ ] `/api/academy/leaderboard` کار می‌کند (یعنی کوئری‌های `contains` فارسی/متن OK است)
- [ ] بکاپ: `supabase db dump -f backup.sql` هر چند وقت یک‌بار

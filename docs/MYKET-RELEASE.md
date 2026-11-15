# انتشار نسخهٔ جدید در مایکت — راهنمای کامل

> پاسخ به دو ایراد کارشناس بررسی مایکت (دستگاه‌های تست: Xiaomi Poco X5 / Android 14 و Samsung Galaxy A51 / Android 12)

---

## ۱) ایراد اول: «انتشار پروژه» در بخش ثبت پروژه عملکرد نداشت

**علت ریشه‌ای (سمت وب‌اپ):** مسیر «انتشار پروژه» برای کاربران **واردنشده** در لیست مسیرهای محافظت‌شده بود. محافظ روتینگ، کاربر مهمان را بلافاصله به صفحهٔ فرود برمی‌گرداند؛ بنابراین کل محتوای این بخش از دید بررسی‌کننده (و هر کاربر مهمان) غیرقابل دسترس بود و کلیک روی دکمه، عملاً هیچ اتفاقی نمی‌انداخت.

**اصلاح انجام‌شده (روی سایت — deploy می‌شود):**

1. `projectNew` از لیست مسیرهای «فقط کاربر واردشده» حذف شد — فرم برای همه باز است.
2. حالت مهمان: فرم به‌طور کامل نمایش داده و قابل پر کردن است؛ در بالای فرم یک اعلان شفاف «ورود لازم است» با دکمهٔ ورود دیده می‌شود.
3. دکمهٔ «انتشار پروژه» برای مهمان: اعتبارسنجی فرم اجرا می‌شود → پیش‌نویس روی همان دستگاه ذخیره می‌ماند → کاربر به صفحهٔ ورود هدایت می‌شود (همراه پیام روشن، بدون هیچ رفتار خاموشی).
4. پس از ورود موفق یا اتمام ثبت‌نام + راه‌اندازی، کاربر **به‌طور خودکار به همان فرم برمی‌گردد** و پیش‌نویسِ ذخیره‌شده بازیابی می‌شود؛ یعنی زنجیرهٔ «پر کردن فرم ← ورود ← انتشار» کامل و بدون گلوگاه کار می‌کند.
5. پنل «دستیار هوشمند» (نیازمند حساب) فقط برای کاربران واردشده نمایش داده می‌شود تا هیچ دکمهٔ بی‌عملکردی برای مهمان دیده نشود.

این تغییرات با نسخهٔ جدید سایت روی `teka-nexus.vercel.app` منتشر می‌شود و داخل WebView اپ هم همان رفتار را خواهد داشت.

---

## ۲) ایراد دوم: استفاده از «اینتنت‌های مایکت»

مستند رسمی: `https://myket.ir/docs/technical/intents/` — چهار URI رسمی:

| کاربرد | الگو |
|---|---|
| ثبت امتیاز و نظر | `myket://comment?id=APP_PACKAGE_NAME` |
| باز کردن صفحهٔ برنامه | `myket://details?id=APP_PACKAGE_NAME` |
| نمایش برنامه‌های توسعه‌دهنده | `myket://developer/APP_PACKAGE_NAME` |
| بررسی به‌روزرسانی (مایکت ≥ ۹.۸.۹) | `myket://check-update?id=APP_PACKAGE_NAME` |

`APP_PACKAGE_NAME` = شناسهٔ بستهٔ اپلیکیشن خودت (همان package در پنل مایکت).

### ۲.۱ سمت وب (در همین ریپو، منتشرشده)

- `src/lib/myket.ts` — سازنده‌های چهار اینتنت + پرچم `myketEnabled`.
- کارت «امتیاز در مایکت» در صفحهٔ درباره (`/` → About): فقط وقتی متغیر محیطی تنظیم شده باشد رندر می‌شود، و کلیک روی آن لینک `myket://comment` را فرامی‌خواند.

**تنظیم یک‌بار:** در پنل Vercel (و `.env.local` برای تست محلی):

```
NEXT_PUBLIC_MYKET_PACKAGE_NAME = <شناسهٔ بستهٔ اپ مایکت>
```

تا قبل از تنظیم شدن، هیچ UI مایکتی رندر نمی‌شود (بدون لینک ساختگی یا خراب).

### ۲.۲ سمت اندروید (پروژهٔ WebView — کد آماده)

**الف) اجازهٔ دسترسی به پکیج مایکت در AndroidManifest.xml** (الزامی در Android 11+):

```xml
<queries>
    <package android:name="ir.mservices.market" />
    <intent>
        <action android:name="android.intent.action.VIEW" />
        <data android:scheme="myket" />
    </intent>
</queries>
```

**ب) رهگیری لینک‌های `myket://` داخل WebView — Kotlin:**

```kotlin
webView.webViewClient = object : WebViewClient() {
    override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
        if (url.startsWith("myket://")) {
            return try {
                startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
                true //handled
            } catch (e: ActivityNotFoundException) {
                // Myket client not installed — open the store page instead
                startActivity(
                    Intent(Intent.ACTION_VIEW, Uri.parse("https://myket.ir/"))
                )
                true
            }
        }
        // keep everything else inside the WebView
        return url.startsWith("http") == false && super.shouldOverrideUrlLoading(view, url)
    }
}
```

**نسخهٔ Java (اگر wrapper جاوا است):**

```java
webView.setWebViewClient(new WebViewClient() {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        if (url.startsWith("myket://")) {
            try {
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
            } catch (ActivityNotFoundException e) {
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("https://myket.ir/")));
            }
            return true;
        }
        return !url.startsWith("http") && super.shouldOverrideUrlLoading(view, url);
    }
});
```

**ج) دعوت به امتیازدهی (داخل Activity/Kotlin)** — طبق مستند مایکت، اول از کاربر اجازه بگیر، بعد اینتنت را اجرا کن:

```kotlin
private val RATE_AFTER_LAUNCH_COUNT = 4
private val prefs by lazy { getSharedPreferences("teka", MODE_PRIVATE) }

fun maybeAskForRating() {
    val launches = prefs.getInt("launches", 0) + 1
    prefs.edit().putInt("launches", launches).apply()
    val asked = prefs.getBoolean("asked_rating", false)
    if (launches < RATE_AFTER_LAUNCH_COUNT || asked) return

    AlertDialog.Builder(this)
        .setTitle("از تکا خوشت آمده؟")
        .setMessage("در مایکت به ما امتیاز بده 🌟")
        .setPositiveButton("امتیاز در مایکت") { _, _ ->
            startActivity(
                Intent(Intent.ACTION_VIEW, Uri.parse("myket://comment?id=APP_PACKAGE_NAME"))
            )
        }
        .setNegativeButton("بعداً", null)
        .show()
    prefs.edit().putBoolean("asked_rating", true).apply()
}
```

(`APP_PACKAGE_NAME` را با شناسهٔ بستهٔ واقعی جایگزین کن؛ این کد را یک‌بار در `onCreate` صدا بزن.)

**د) بررسی به‌روزرسانی درون‌برنامه‌ای (اختیاری اما مفید برای بررسی‌های بعدی):**

```kotlin
startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("myket://check-update?id=APP_PACKAGE_NAME")))
```

> نکتهٔ مستند مایکت: برای تست اینتنت‌ها، برنامه باید در مایکت «تأییدشده» باشد؛ در بازبینی بعدی، کارشناس همین مسیرها را می‌بیند.

---

## ۳) چک‌لیست انتشار نسخهٔ جدید

1. [ ] `versionCode` را `+1` کن و `versionName` را افزایش بده (مثلاً `1.1`).
2. [ ] کدهای بخش ۲.۲ (manifest `<queries>` + `shouldOverrideUrlLoading` + دیالوگ امتیاز) را در wrapper اعمال کن.
3. [ ] `NEXT_PUBLIC_MYKET_PACKAGE_NAME` را در Vercel با شناسهٔ بستهٔ واقعی تنظیم کن و صبر کن تا deploy تمام شود (کارت «امتیاز در مایکت» در صفحهٔ درباره ظاهر می‌شود).
4. [ ] روی سایت، مسیر زیر را بدون لاگین تست کن: دکمهٔ «پروژه جدید» ← فرم کامل باز می‌شود + اعلان «ورود لازم است» دیده می‌شود + پس از ورود به فرم برگردی و پیش‌نویس سر جایش باشد.
5. [ ] APK/AAB جدید را در پنل توسعه‌دهندهٔ مایکت بارگذاری کن و برای «بررسی مجدد» ارسال کن.
6. [ ] در توضیحات نسخه، به دو مورد اصلاح‌شده اشاره کن:
   - «رفع مشکل عدم دسترسی به بخش انتشار پروژه برای کاربران واردنشده»
   - «افزودن اینتنت‌های رسمی مایکت (امتیازدهی، صفحهٔ برنامه، برنامه‌های توسعه‌دهنده، به‌روزرسانی درون‌برنامه‌ای)»

---

## ۴) اگر خطای دیگری از سمت بررسی‌کننده رسید

متن دقیق پیام + نام دستگاه و نسخهٔ اندروید را ارسال کن؛ می‌توان از طریق `chrome://inspect` (WebView Debugging وقتی `setWebContentsDebuggingEnabled(true)` باشد) خطاهای کنسول WebView را هم گرفت و دقیق رفع کرد.

# TEKA NEXUS — Google Sign-In Activation Guide

ورود با گوگل در TEKA NEXUS کاملاً پیاده‌سازی شده است؛ فقط باید دو کلید OAuth در
محیط استقرار (Vercel) ثبت شود. این راهنما دقیقاً همان مراحلی است که داخل
پنجره‌ی «راهنمای فعال‌سازی» در صفحه‌ی ورود هم نمایش داده می‌شود.

Google sign-in is fully implemented server-side (Authorization Code flow).
It activates the moment the environment variables below are added — no code
changes needed.

---

## 1) Environment Variables (Vercel)

Open **Vercel → your project → Settings → Environment Variables** and add:

| Variable | Value |
| --- | --- |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console (step 2 below) |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console (step 2 below) |
| `NEXT_PUBLIC_APP_URL` | `https://teka-nexus.vercel.app` |

Then **Redeploy** the project (Deployments → latest → Redeploy).

## 2) Google Cloud Console (free)

1. Go to <https://console.cloud.google.com> → create a project (free).
2. **APIs & Services → OAuth consent screen → External** → fill the app name
   (`TEKA NEXUS`) and save.
3. **Credentials → Create credentials → OAuth client ID → Web application**.
4. Under **Authorized redirect URIs** add exactly:

   ```text
   https://teka-nexus.vercel.app/api/auth/google/callback
   ```

5. Copy the **Client ID** and **Client secret** into the Vercel env vars above.

## 3) Verify

- Visit `/api/auth/google/status` → should return `{"enabled":true}`.
- On the login page, “Continue with Google” now redirects to Google instead of
  showing the activation guide.

## Endpoints

| Route | Purpose |
| --- | --- |
| `GET /api/auth/google/status` | `{ enabled }` probe used by the auth view |
| `GET /api/auth/google/start` | Redirects to Google consent (CSRF state cookie) |
| `GET /api/auth/google/callback` | Code exchange → link-or-create user → session cookie |

## Notes

- Existing email accounts with the same address are **linked** automatically
  (no duplicate accounts).
- New users get a generated username and go through onboarding.
- Without the env vars, `start` bounces back with `?authError=google_disabled`
  and the UI shows this guide.

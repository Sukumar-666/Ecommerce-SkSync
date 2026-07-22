# SkSync Enterprise — Auth, 2FA, Gender Personalization, Blue Theme

Separate `backend/` and `frontend/` folders. All existing business logic, routes,
orders, products, and page content preserved — this pass adds security/auth
infrastructure, gender-based personalization, and a full color re-theme on top.

## What's genuinely new and working

**Backend**
- `gender` is now a required field on signup (male/female), stored on `User`
- Email verification: signup → verification email → account inactive until clicked
- 2FA: login step 1 (password) emails a 6-digit OTP; step 2 verifies it before
  issuing a session — OTP expires in 5 min, max 5 attempts, 45s resend cooldown
- JWT access token (15 min) + refresh token (7 days) in an **httpOnly cookie**,
  rotated on every refresh, revocable (logout / logout-all-devices)
- Security middleware: Helmet headers, rate limiting on auth/OTP routes,
  NoSQL-injection sanitization, bcrypt (cost 12) password hashing
- `Product.gender` field (`male` / `female` / `unisex`) + `GET /api/products?gender=`
  filtering, so the catalog API itself is personalization-ready
- Existing `userController`, `orderController`, `Order` model — untouched, just
  copied over into the new folder structure

**Frontend**
- Full color re-theme: pink palette replaced with royal blue / navy / indigo
  everywhere (verified — zero leftover pink hex values anywhere in `src/`)
- New pages: `Signup` (Male/Female now mandatory, no more free-text "other"),
  `OtpVerification` (2FA step), `VerifyEmail` (the link from the verification
  email lands here)
- `AuthContext` rewritten for the 2-step login flow + silent session restore
  from the refresh cookie on page load
- `genderContent.js` — the single reusable personalization pattern (hero
  images/tagline, category list, category cards, offer banner, recommendations
  title) driven by `session.gender`
- Applied end-to-end on **Homepage** and **Products** (hero, categories, offer
  banner, recommendations title, and actual product filtering by gender)

## Honest scope — what's NOT done

The original request listed Wishlist, Notification Center, Saved Addresses,
Order Tracking, and a full personalized Dashboard — **none of these exist as
pages in your current project**, so they weren't retrofitted; building them
from scratch is a separate, large effort. The gender-personalization pattern
(`useGenderContent()`) is applied to Homepage + Products as the reference
implementation — the same 3-line pattern needs to be repeated on Categories,
Offers, Gallery, Search, ProductDetails, etc. to reach "every page."
CSRF protection specifically was not added (SameSite=lax cookies + CORS
allowlist cover most of the same risk for this architecture, but a dedicated
CSRF token was out of scope this pass). Skeleton loaders and toast
notifications were also not added — the existing `FormStatusAlert` and
`ScrollReveal`/loading patterns from the previous pass still apply.

## Run order

### 1. Backend
```bash
cd backend
cp .env.example .env
# fill in MONGO_URI, three different JWT_*_SECRET values, and SMTP_* (see below)
npm install
npm run seed        # demo admin: admin@sksync.com / Admin@123 (pre-verified)
npm run dev          # or: node server.js
```
Should print `SkSync API running on port 5000` then `Connected to MongoDB`.

**SMTP setup (required for real verification/OTP emails):** for Gmail, create
an App Password at https://myaccount.google.com/apppasswords, then set
`SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_USER=you@gmail.com`,
`SMTP_PASS=<app password>`. Without SMTP configured, the backend logs a
warning to the console with what it *would* have sent instead of failing —
useful for local testing without email set up yet.

### 2. Frontend
```bash
cd frontend
cp .env.example .env   # REACT_APP_API_URL=http://localhost:5000/api
npm install --legacy-peer-deps
npm start
```

### 3. Test the flow
1. Sign up, selecting Male or Female
2. Check the backend console (or your inbox, if SMTP is set up) for the
   verification link → click it → redirected to a success screen
3. Log in → check console/inbox for the OTP → enter it on `/verify-otp`
4. Land on `/home` — hero image, tagline, categories, and offer banner should
   match the gender you selected at signup

## Known pre-existing caveat (unrelated to this pass)
`npm run build` (not `npm start`) can hit a known `react-scripts@5.0.1` /
`ajv` dependency conflict — this reproduces on a clean install of the
original, unmodified project too. See earlier conversation for the
`ajv`-as-direct-devDependency workaround if you hit it.

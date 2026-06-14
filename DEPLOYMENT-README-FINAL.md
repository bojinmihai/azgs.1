# AZ Grand Solutions — Deployment Guide

**Complete static HTML website for `azgs.nl`**
Status: ✅ **READY FOR PRODUCTION**

---

## 📦 File Inventory (18 files total)

### HTML Pages (17)
```
index.html                    Home page
diensten.html                 Services umbrella page
spoed.html                    24/7 emergency service
over-ons.html                 About us + KvK details
blog.html                     Blog placeholder (SEO-optimized)
contact.html                  Contact form (Formspree)
bedankt.html                  Thank-you after form submit

gipsplaten.html               Afwerking — Drywall
schilderwerk.html             Afwerking — Painting
parket.html                   Afwerking — Parquet flooring
tegelwerk.html                Afwerking — Tiling

sanitair.html                 Installaties — Plumbing
verwarming.html               Installaties — Heating
vloerverwarming.html          Installaties — Underfloor heating
elektra.html                  Installaties — Electrical

privacybeleid.html            GDPR Privacy Policy
cookiebeleid.html             Cookie Policy
algemene-voorwaarden.html     General Terms & Conditions (17 articles)
```

### Technical (2)
```
sitemap.xml                   XML sitemap (17 URLs, hreflang NL+EN)
robots.txt                    Crawler instructions + sitemap reference
```

### Assets
```
favicon.ico + 6 favicon PNGs  All sizes (16, 32, 48, 180, 192, 512)
assets/img/logo/              Primary + white-orange SVG logos
assets/img/hero/              Home hero image
assets/img/services/          9 service images × 3 sizes (800/1200/1600) × 2 formats (webp/jpg)
```

---

## 🚀 Deployment Checklist

### 1. Pre-deployment (LOCAL TESTING)

```bash
# Test locally with Python's built-in server (all pages)
cd /path/to/azgs-home
python -m http.server 8000

# Open http://localhost:8000 and verify:
```

- [ ] All 17 pages load (no 404s)
- [ ] Header dropdown "Diensten" shows all 8 services
- [ ] Mobile hamburger menu works (resize browser or use device mode)
- [ ] Google Maps iframe loads on `/over-ons.html` and `/contact.html`
- [ ] WhatsApp floating button appears on all pages
- [ ] Footer legal links work (privacybeleid, cookiebeleid, algemene-voorwaarden)
- [ ] Contact form pre-selects service when coming from `/sanitair.html?dienst=sanitair`

### 2. Upload to Hosting

**Recommended hosts:** Netlify, Vercel, Cloudflare Pages, Hostnet, TransIP (NL hosters)

**File structure on server** (root):
```
/ (webroot)
├── index.html
├── diensten.html
├── spoed.html
├── ... (all HTML files)
├── sitemap.xml
├── robots.txt
├── favicon.ico
├── favicon-16.png, favicon-32.png, etc.
├── apple-touch-icon.png
└── assets/
    └── img/
        ├── logo/
        ├── hero/
        └── services/
```

### 3. Post-deployment Verification

- [ ] Visit `https://azgs.nl/` — HTTPS works, SSL certificate valid
- [ ] Test contact form submission — goes to `aanvragen@azgs.nl`
- [ ] Test on mobile device (actual phone, not just resize)
- [ ] Test all 17 pages return HTTP 200 (not 404)
- [ ] Check `https://azgs.nl/sitemap.xml` loads correctly
- [ ] Check `https://azgs.nl/robots.txt` loads correctly

### 4. Google Search Console Setup

1. Register **https://azgs.nl** at [search.google.com/search-console](https://search.google.com/search-console)
2. Verify ownership via DNS or HTML file
3. Submit sitemap: `https://azgs.nl/sitemap.xml`
4. Request indexing for top pages: Home, Diensten, Spoed, Contact, top 3 services

### 5. Google Business Profile (OPTIONAL but POWERFUL for local SEO)

Create at [business.google.com](https://business.google.com):
- Business name: **AZ Grand Solutions**
- Address: **Alpenstraat 12, 3446 DN Woerden**
- Phone: **+31 6 13636925**
- Category: **General contractor** or **Handyman**
- Service area: **regio Utrecht** (set as radius)
- Website: **https://azgs.nl**

---

## 📞 Critical Business Details (verify ALL are correct before launch)

| Field | Value |
|-------|-------|
| Bedrijfsnaam | AZ Grand Solutions |
| Handelsnaam | AZGS |
| KvK | 42064891 |
| Adres | Alpenstraat 12, 3446 DN Woerden |
| Telefoon | +31 6 13636925 |
| Email algemeen | info@azgs.nl |
| Email offertes | aanvragen@azgs.nl |
| Website | https://azgs.nl |
| Servicegebied | regio Utrecht, 60 km rond Woerden |

---

## 🛠️ Formspree Configuration

**Endpoint:** `https://formspree.io/f/xjgjryzn`

Form submissions → `aanvragen@azgs.nl`

**Settings configured:**
- `_subject`: "Nieuwe offerte-aanvraag via azgs.nl"
- `_next`: `https://azgs.nl/bedankt.html`
- `_language`: `nl`
- Anti-spam: Akismet AI + hidden honeypot field

**After go-live:** Log in to [formspree.io](https://formspree.io) and:
1. Verify `aanvragen@azgs.nl` is receiving submissions
2. Enable reCAPTCHA if spam becomes an issue
3. Upgrade to paid plan if >50 submissions/month expected (free tier limit)

---

## 🎨 Design System Reference

**Brand colors:**
- Navy: `#1E3A5F` (primary)
- Orange: `#F5A623` (accent/CTA)
- Red: `#C8392E` (spoed/emergency only)
- Background: `#FBFAF7` (off-white)

**Typography:**
- Display: **Outfit** (headings)
- Body: **Source Sans 3** (paragraphs)
- Both from Google Fonts

**Slogan:** "Rust, warmte en comfort in uw woning"

---

## 🌐 Bilingual Structure (hreflang)

All pages have `<link rel="alternate" hreflang="en" ...>` pointing to `/en/*.html` paths.

**⚠️ IMPORTANT:** The English versions are NOT yet built. When an English visitor switches to EN, they will hit a 404.

**Options:**
1. **Build /en/ versions later** — translate all 17 pages to English, place in `/en/` folder
2. **Remove EN hreflang temporarily** — if you don't want to confuse Google, remove the `hreflang` tags and EN switcher buttons from all pages until English version is ready
3. **Leave as-is** — Google will simply not use hreflang, users see 404. Not ideal but not catastrophic

**Recommendation:** Build Dutch version first (DONE), get traffic + feedback, then invest in English translation if international/expat customers prove valuable.

---

## 📊 SEO Strategy Summary

**Primary keywords** (already integrated):
- "afwerkings- en installatiebedrijf regio Utrecht"
- "[service] regio Utrecht" (e.g., "tegelwerk regio Utrecht")
- "spoedservice 24/7 Woerden"

**Internal linking structure:**
- Home → Diensten (umbrella) → 8 service pages
- Blog.html → all 8 service pages (SEO hub)
- Each service page cross-sells 3 related services
- Footer links to all pages from every page

**Schema.org markup:**
- `LocalBusiness` on homepage + over-ons + spoed
- `Service` on each service page
- `BreadcrumbList` on all inner pages
- `ItemList` on diensten.html
- `Blog` on blog.html

**Cities targeted** (in footer + FAQ):
Utrecht, Woerden, Amersfoort, Nieuwegein, Zeist, Houten, IJsselstein, Gouda, Alphen aan den Rijn, Hilversum, Veenendaal, Bunnik.

---

## 🔒 Legal Compliance Checklist

- [x] **Privacy Policy** (AVG/GDPR) — mentions Formspree (US), Google Fonts, Google Maps, WhatsApp, SCC
- [x] **Cookie Policy** — lists all 4 third-party cookies (Maps, Fonts, WhatsApp, Formspree)
- [x] **General Terms & Conditions** — 17 articles for B2C consumers in NL
- [x] **KvK number** (42064891) visible on Over ons + footer
- [x] **Address** visible on Over ons + footer + Contact page
- [x] **Contact options:** phone + 2 emails + WhatsApp
- [x] **Clear pricing statement:** "Vrijblijvende offerte" (not "gratis offerte")
- [x] **No false certifications** — no "gecertificeerd", "NEN 1010", etc.

---

## 🧪 Pre-launch Final Test (5 minute checklist)

On real device (mobile phone):

1. Open `https://azgs.nl/` → loads fast?
2. Tap hamburger menu → opens?
3. Navigate to Diensten → dropdown shows?
4. Tap a service (e.g. Sanitair) → page loads?
5. Tap "Vrijblijvende offerte" button → Contact form with service pre-selected?
6. Fill form → submits → goes to bedankt.html?
7. Check email at aanvragen@azgs.nl → received?
8. Tap footer "Privacybeleid" → page loads?
9. Tap WhatsApp float → opens WhatsApp to your number?
10. Tap "+31 6 13636925" in header → opens phone dialer?

If all 10 pass → **LIVE READY**.

---

## 📈 After Launch — First Week

1. **Monitor Formspree** daily for form submissions
2. **Check Google Search Console** daily for crawl errors
3. **Request indexing** for all 17 pages in Search Console
4. **Test from different devices** (phone, tablet, desktop)
5. **Ask 3 trusted contacts** to click through and report bugs
6. **Set up Google Business Profile** (see above)

## 📈 After Launch — First Month

1. Add **first blog article** — replace the placeholder with real content
2. Start collecting **customer reviews** (Google Business)
3. Consider **Google Analytics 4** — if you want traffic data (will require adding consent banner)
4. Monitor **form spam** — add reCAPTCHA if needed
5. Update `lastmod` in sitemap.xml when you add new content

---

## 💡 Quick Wins for More SEO Traffic

1. **Claim Google Business Profile** (free, 1 hour work, huge impact for local SEO)
2. **Get 5 Google reviews** from happy customers
3. **Write 1 blog article** about a specific project (with photos if possible)
4. **Join local Facebook groups** in Utrecht and answer DIY questions professionally
5. **Add structured FAQ to top service pages** (already done for most)

---

## 🆘 Troubleshooting

**Problem:** Google Maps doesn't load
→ Make sure site is served over HTTPS. Google Maps iframe requires HTTPS in production.

**Problem:** Fonts look wrong
→ Google Fonts may be slow on first visit. `<link rel="preconnect">` is already in all `<head>`.

**Problem:** Form doesn't submit
→ Check Formspree dashboard; endpoint `xjgjryzn` must be active and verified.

**Problem:** 404 on legal pages
→ Make sure `privacybeleid.html`, `cookiebeleid.html`, `algemene-voorwaarden.html` are in webroot.

**Problem:** Mobile menu doesn't open
→ JavaScript might be blocked. Test without browser extensions.

---

## 🎯 Success Metrics (first 3 months)

- **Indexed pages:** Target all 17 indexed by Google (check Search Console)
- **Form submissions:** Target 5-10/month minimum
- **Phone calls:** Impossible to track without tracking, but expect 5-15/month if local SEO works
- **Google Business profile views:** Target 100+/month after 30 days
- **Organic keyword rankings:** "[service] regio Utrecht" should rank in top 20 within 60 days

---

## Contact for website technical issues

All HTML is static, self-contained, and version-controlled in this package.
No backend, no database — just upload files to any web host.

If content needs to be updated later, edit the HTML files directly.
Common updates:
- **Phone number change** → search & replace `+31613636925` in all HTML
- **Address change** → update `over-ons.html` + all 3 legal pages + footer
- **New service** → copy an existing service page as template + update meta/content
- **New blog article** → replace placeholder section in `blog.html`

---

**Built with care, ready for deployment. Good luck with the launch!** 🚀

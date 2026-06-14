# Cum publici un blog nou

Un singur folder, un fișier de text per limbă. Restul (lista de pe `/blog`, sitemap, hreflang) se actualizează automat la build.

## Pași

1. **Creează folderul postului** în `content/blog/<cheie>/`
   Cheia este un identificator stabil (ex: `nieuwe-keuken-2026`). Folosit doar intern — nu apare în URL.

2. **Adaugă imaginea de copertă** în `public/assets/img/blog/<cheie>/cover.webp` (și opțional `cover.jpg` ca fallback).

3. **Creează `meta.nl.json`** cu acest șablon:
   ```json
   {
     "slug": "slug-din-url-nl",
     "altSlug": "slug-from-url-en",
     "title": "Titlul afișat al articolului",
     "pageTitle": "Titlu SEO | AZGS",
     "description": "Descriere meta de 120-160 caractere.",
     "intro": "Paragraful introductiv (HTML permis).",
     "date": "2026-05-12",
     "category": "Afwerking",
     "readTime": 7,
     "cover": "/assets/img/blog/cheie/cover.webp",
     "coverFallback": "/assets/img/blog/cheie/cover.jpg",
     "toc": "<ol><li><a href=\"#sectiune\">Secțiunea 1</a></li></ol>"
   }
   ```

4. **Creează `body.nl.html`** cu corpul articolului:
   ```html
   <h2 id="sectiune">Secțiunea 1</h2>
   <p>Conținutul articolului...</p>
   <p>Imagini inline: <img src="/assets/img/blog/cheie/poza.webp" alt="..."></p>
   ```

5. **Pentru versiunea engleză**, repetă cu `meta.en.json` și `body.en.html`.
   Dacă nu vrei traducere, omite — articolul va apărea doar în NL.

6. **Commit & push** pe ramura ta. Cloudflare Pages va publica automat.

## Ce se întâmplă automat

- Pagina `/blog` (NL) și `/en/blog` (EN) listează automat toate posturile, sortate descrescător după dată.
- Fiecare post primește o pagină proprie la `/blog/<slug>` (NL) sau `/en/blog/<slug>` (EN).
- `sitemap.xml` se regenerează cu noul post și hreflang corect.
- Schema.org `Article` + `BreadcrumbList` se generează automat din metadate.
- Comutatorul de limbă din header trimite la perechea NL ↔ EN dacă există.

## Nu mai trebuie să modifici

- `app/(nl)/blog/page.tsx` sau `app/(en)/en/blog/page.tsx` (lista)
- `_redirects` (URL-urile noi sunt curate, fără `.html`)
- Header/footer (link-urile sunt deja prezente)
- Niciun alt fișier HTML/TSX

## Comenzi de dev

```bash
npm install        # o dată, la prima clonare
npm run dev        # server local pe http://localhost:3000
npm run build      # generează site-ul static în out/
```

# AZ Grand Solutions — vizibilitate organică și măsurare

Ultima actualizare: 3 septembrie 2026
Stare: release-candidat local verificat și nepublicat; acțiunile din conturi așteaptă publicarea aprobată și confirmările explicite de mai jos

## Domeniul acestei etape

Această etapă acoperă SEO tehnic și local, Google Search Console, Google Business Profile, GA4 cu consimțământ, Bing Webmaster Tools și IndexNow. Google Ads, remarketingul și orice cheltuială publicitară sunt excluse expres. Contul Google Ads vechi nu se modifică și nu se șterge până la o evaluare separată.

Nu este necesar un plan plătit pentru această etapă. Search Console, Google Business Profile, GA4 Standard, Bing Webmaster Tools și IndexNow pot fi folosite gratuit. Un serviciu plătit va fi propus numai dacă apare o limită reală sau o nevoie măsurabilă.

## Situația confirmată

### Website și indexare

- `https://azgs.nl` este originea canonică; `www` redirecționează permanent spre domeniul fără `www`.
- Site-ul live publică `robots.txt`, `sitemap.xml`, canonical și perechi hreflang NL/EN.
- Sitemap-ul live conține 104 URL-uri, însă Search Console citise ultima dată versiunea veche cu 50 de URL-uri.
- Proprietatea Domain `azgs.nl` este verificată și accesibilă în Search Console.
- La audit, Search Console raporta 44 de pagini indexate și 77 neindexate. Cea mai mare parte a excluderilor provenea din redirecturi și URL-uri vechi; validările trebuie reluate după recitirea sitemap-ului curent.
- Pentru ultimele trei luni disponibile, Search Console afișa 74 clickuri, 8.164 afișări, CTR 0,9% și poziție medie 23. Acestea sunt date istorice, nu promisiuni de performanță.
- Rezultatele Google încă afișau fragmente vechi cu afirmații și date eliminate din site-ul actual. Prioritatea este recrawl-ul, nu reintroducerea acelor texte.

### Google Analytics 4

- Fluxul web și meetcode-ul `G-DK6FZHQRCB` există, dar proprietatea afișa „No data received from site”.
- Codul respectă Basic Consent Mode: înainte de accept nu se încarcă tagul și nu se trimite ping Google.
- Corecția locală adaugă pageviews manuale pentru navigarea Next.js, first-touch sigur, origine CTA, selectare serviciu, sector B2B și o categorie distinctă pentru Google Business Profile.
- Scriptul GA4 este limitat la `azgs.nl` și `www.azgs.nl`; hostname-urile de preview nu pot contamina proprietatea live.
- Google Signals este dezactivat, redacția adreselor de e-mail este activă, iar retenția configurată este de 14 luni. Enhanced Measurement și dimensiunile custom trebuie ajustate înaintea testului real.

### Google Business Profile

- Profilul verificat este `A-Z Grand Solutions`, cu website-ul și telefonul corecte.
- Profilul afișa o descriere cu „24/7 bereikbaar”, afirmație care nu mai corespunde poziționării aprobate și trebuie eliminată.
- Ariile publice includeau toate Țările de Jos și întreaga provincie Noord-Brabant, prea largi față de delimitarea aprobată.
- Programul afișat era luni–vineri 08:00–17:00; nu se publică SLA sau disponibilitate permanentă.
- Adresa este publică. Înainte de a decide păstrarea ei trebuie confirmat dacă clienții pot fi primiți efectiv la locație, cu prezență și semnalizare permanentă în programul afișat. Dacă nu, regulile Google cer ascunderea adresei și folosirea profilului de service-area business.
- Profilul are o recenzie Google reală. Nu se copiază textul, nu se inventează recenzii și nu se adaugă `Review`/`AggregateRating` pe site.

### Bing și IndexNow

- Cheia IndexNow este deja publicată și răspunde corect; scriptul de submit există în repository.
- În sesiunea de audit nu exista autentificare activă în Bing Webmaster Tools. Varianta recomandată este importul proprietății verificate din Google Search Console după autentificare, apoi confirmarea sitemap-ului.
- IndexNow se rulează numai după publicarea release-ului aprobat, pentru URL-urile efectiv modificate.

## Acțiuni locale din release-candidat

1. pageviews GA4 manuale și fără query/hash, inclusiv navigarea Next.js;
2. atribuirea controlată `google_business_profile / organic / local_profile`;
3. first-touch și origine CTA păstrate numai după consimțământ;
4. eveniment `service_select` și sector B2B pe fluxul formularului;
5. parametrul custom `content_language`, fără suprascrierea câmpului standard GA4 `language`;
6. blocarea traficului GA4 din preview-uri;
7. actualizarea specificației analytics și a politicilor NL/EN conform implementării reale;
8. eliminarea redirectului automat de limbă de pe homepage; `/` rămâne pagina NL, `/en` rămâne pagina EN, iar utilizatorul poate alege explicit din selector;
9. adăugarea unei date `lastmod` exacte pentru conținutul static al release-ului în sitemap, cu păstrarea datelor proprii ale articolelor;
10. consolidarea prin 301 a celor șase rute duplicate de finisare sub URL-urile scurte deja indexate; release-candidatul scade de la 104 la 98 URL-uri canonice în sitemap, fără pierdere de conținut unic;
11. numele entității din schema `LocalBusiness` este aliniat cu handelsnaam și profilul Google: `A-Z Grand Solutions`; proprietățile Schema.org neaplicabile au fost eliminate;
12. titluri blog diferențiate NL/EN, dimensiuni Open Graph declarate numai când sunt cunoscute corect și semnal NAP compact `A-Z Grand Solutions · Woerden` în footer;
13. build, audit export și test local fără trimiterea unui formular real.

Paginile B2C păstrează raza istorică de aproximativ 60 km din jurul Woerden. Aceasta este separată de limita pentru mentenanță — maximum 50 km sau circa 1 oră — și de evaluarea urgențelor — maximum 50 km sau circa 40 de minute. Raza B2C nu este extinsă automat către B2B și nu este folosită ca promisiune de acceptare a unei lucrări.

## Acțiuni externe pregătite, dar nesalvate încă

Aceste acțiuni modifică servicii externe sau informații publice. Înainte de execuție se prezintă valorile exacte și se cere aprobarea la momentul acțiunii.

1. Search Console: retrimiterea `https://azgs.nl/sitemap.xml`, apoi verificarea numărului de URL-uri descoperite și reluarea validărilor relevante.
2. GA4: dezactivarea evenimentelor automate care ar dubla implementarea controlată, activarea redacției query-urilor sensibile, crearea dimensiunilor custom, asocierea Search Console și marcarea `generate_lead` drept key event numai după verificare.
3. Google Business Profile: descriere conformă, arii limitate, categorii/servicii reale și URL website cu UTM controlat. Nu se schimbă adresa până la confirmarea condițiilor fizice.
4. Bing Webmaster Tools: autentificare/import din Search Console, confirmarea sitemap-ului și verificarea proprietății.
5. Bing Places for Business: verificarea existenței unei listări și revendicarea/actualizarea ei separat de Bing Webmaster Tools; Microsoft permite listări gratuite și ascunderea adresei pentru anumite companii de servicii.
6. Apple Business Connect: creare/revendicare doar cu un Apple Account destinat companiei și după stabilirea modului corect de afișare a adresei; serviciul este gratuit și poate controla prezența în Apple Maps și Siri.
7. După deploy: IndexNow, verificări HTTP și conținut, apoi control GA4 Realtime/DebugView fără lead real.

## Verificarea release-candidatului local

- `npm run lint`: trecut;
- `npx tsc --noEmit --incremental false`: trecut;
- `npm audit`: trecut, zero vulnerabilități;
- `npm run build`: trecut cu 103 pagini publice, 98 URL-uri canonice în sitemap, 184 blocuri JSON-LD, 4.205 legături interne, 2.322 referințe la assets locale și 6 PDF-uri; zero avertismente;
- `npm run audit:export`: trecut pentru toate cele 103 pagini;
- `git diff --check`: trecut; mesajele Windows despre conversia LF/CRLF sunt notificări, nu erori;
- test local: niciun script GA4 înainte de consimțământ sau după refuz, un singur `page_view` la acceptare, un singur `page_view` suplimentar la navigarea Next.js, URL-uri fără query și câmpuri de atribuire în formular numai cu consimțământ;
- test local: `/` rămâne în neerlandeză și `/en` în engleză, fără redirect după limba browserului;
- nu s-a trimis nicio solicitare reală prin Formspree și nu s-a transmis trafic local către proprietatea GA4.

## Text Google Business Profile propus

> A-Z Grand Solutions voert vanuit Woerden technische installaties en gebouwonderhoud uit. Voor zakelijke projecten verzorgen wij uitsluitend sanitaire en thermische installaties, inclusief vloerverwarming, en ventilatie. Zakelijke projectlocaties worden per aanvraag beoordeeld binnen het beschreven werkgebied vanuit Woerden. Gebouwonderhoud is beschikbaar tot maximaal 50 km of circa 1 uur reistijd. Spoedaanvragen worden afzonderlijk beoordeeld tot maximaal 50 km of circa 40 minuten rijden; zakelijke spoed is alleen mogelijk voor installaties die door AZGS zijn uitgevoerd. Scope, planning en bereikbaarheid worden altijd vooraf afgestemd.

Website-URL propus pentru profil:

`https://azgs.nl/?utm_source=google_business_profile&utm_medium=organic&utm_campaign=local_profile`

Textul și URL-ul sunt pregătite, nu publicate. Descrierea nu conține certificări, garanții, SLA-uri, clienți sau rezultate neverificate.

## Surse oficiale

- Google Search Console — sitemaps: https://support.google.com/webmasters/answer/7451001
- Google — reguli pentru reprezentarea unei companii: https://support.google.com/business/answer/3038177?hl=nl
- Google — arii de servicii: https://support.google.com/business/answer/9157481?hl=nl
- Google — LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google Analytics — pageviews manuale: https://developers.google.com/analytics/devguides/collection/ga4/views
- Google Analytics — conectarea Search Console: https://support.google.com/analytics/answer/10737381
- Bing Webmaster Tools — importul din Search Console: https://www2.bing.com/webmasters/help/add-and-verify-site-12184f8b
- Bing Webmaster Tools — sitemaps: https://www.bing.com/webmasters/help/Sitemaps-3b5cf6ed
- Microsoft — Bing Places for Business: https://support.microsoft.com/nl-nl/bing/add-and-manage-your-business-listing
- Apple — Business Connect: https://businessconnect.apple.com/promote/assets/getting-started.pdf

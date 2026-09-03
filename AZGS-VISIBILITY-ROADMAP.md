# AZ Grand Solutions — vizibilitate organică și măsurare

Ultima actualizare: 3 septembrie 2026
Stare: release-ul de vizibilitate și măsurare din commitul `c88ea5d` este publicat și verificat pe `azgs.nl`; IndexNow a acceptat lista post-deploy, iar rezultatele operațiunilor din Search Console, GA4 și Google Business Profile sunt consemnate mai jos numai după confirmarea directă în interfețele lor

## Domeniul acestei etape

Această etapă acoperă SEO tehnic și local, Google Search Console, Google Business Profile, GA4 cu consimțământ, Bing Webmaster Tools, IndexNow și prezența organică în Apple Business. Google Ads, remarketingul și orice cheltuială publicitară sunt excluse expres. Asocierile Google Ads vechi nu se modifică și nu se șterg până la o evaluare separată.

Nu este necesar un plan plătit pentru această etapă. Search Console, Google Business Profile, GA4 Standard, Bing Webmaster Tools, IndexNow și funcțiile de bază Apple Business pot fi folosite gratuit. Un serviciu plătit va fi propus numai dacă apare o limită reală sau o nevoie măsurabilă.

## Situația confirmată

### Website și indexare

- `https://azgs.nl` este originea canonică; `www` redirecționează permanent spre domeniul fără `www`.
- Site-ul live publică `robots.txt`, `sitemap.xml`, canonical și perechi hreflang NL/EN.
- Release-ul live conține 103 pagini publice. `sitemap.xml` conține 98 de elemente `<loc>` și 98 de elemente `lastmod`: 88 de pagini statice au data `2026-09-03`, iar cele 10 articole își păstrează datele proprii.
- Homepage-urile `/` și `/en` răspund `200`. Titlurile blog sunt `Installatie- en renovatieblog | AZ Grand Solutions` și `Installation and renovation blog | AZ Grand Solutions`; canonical, hreflang, NAP-ul compact `A-Z Grand Solutions · Woerden`, CSP și headerele de securitate au fost confirmate live.
- Cele șase surse duplicate răspund `301`: `/particulier/schilderwerk` spre `/schilderwerk`, `/particulier/parket` spre `/parket`, `/particulier/tegelwerk` spre `/tegelwerk`, `/en/private/painting` spre `/en/painting`, `/en/private/parquet` spre `/en/parquet` și `/en/private/tiling` spre `/en/tiling`.
- Proprietatea Domain `azgs.nl` este verificată și accesibilă în Search Console.

**Baseline istoric înainte de release:** Search Console citise o versiune veche a sitemapului cu 50 de URL-uri și raporta 44 de pagini indexate și 77 neindexate. Pentru ultimele trei luni disponibile afișa 74 clickuri, 8.164 afișări, CTR 0,9% și poziție medie 23. Acestea sunt date istorice, nu promisiuni de performanță.

- Sitemapul `https://azgs.nl/sitemap.xml` a fost retrimis la 3 septembrie 2026. Ultima citire este din aceeași zi, starea este `Succes`, iar Search Console afișează 98 de pagini și 0 videoclipuri descoperite.
- Recrawl-ul a fost solicitat cu dialog de succes pentru zece URL-uri prioritare: `/`, `/en`, `/blog`, `/en/blog`, `/schilderwerk`, `/parket`, `/tegelwerk`, `/en/painting`, `/en/parquet` și `/en/tiling`.
- La inspecție, nouă dintre cele zece URL-uri erau indexate. `/en` era neindexat ca duplicat: canonical declarat `/en`, canonical ales de Google `/`. Această alegere trebuie monitorizată după recrawl; nu se schimbă canonicalul declarat pe baza unei singure citiri.
- Nu s-a folosit Removals și nu s-a pornit Validate Fix pentru redirecturi ori canonical, deoarece 301-urile și semnalele canonice curente sunt mecanismele potrivite.
- Rezultatele Google încă afișau fragmente vechi cu afirmații și date eliminate din site-ul actual. Prioritatea este recrawl-ul, nu reintroducerea acelor texte.

### Google Analytics 4

- Fluxul web `azgs.nl`, cu ID `12841759030` și meetcode `G-DK6FZHQRCB`, există. La auditul inițial proprietatea afișa „No data received from site”; aceasta este o observație istorică anterioară testului post-deploy.
- Codul respectă Basic Consent Mode: înainte de accept nu se încarcă tagul și nu se trimite ping Google.
- Implementarea publicată în `c88ea5d` adaugă pageviews manuale pentru navigarea Next.js, first-touch sigur, origine CTA, selectare serviciu, sector B2B și o categorie distinctă pentru Google Business Profile.
- Scriptul GA4 este limitat la `azgs.nl` și `www.azgs.nl`; hostname-urile de preview nu pot contamina proprietatea live.
- Verificarea live a confirmat că înainte de consimțământ nu există request sau script GA4.
- Enhanced Measurement master este activ, dar numai `Page loads` și `Scrolls` au rămas active. `Browser history events`, `Outbound clicks`, `Site search`, `Form interactions`, `Video engagement` și `File downloads` sunt dezactivate.
- Redacția adreselor de e-mail și redacția parametrilor query sunt active. Lista explicită are 19 chei: `name`, `email`, `email_address`, `phone`, `contact_method`, `company`, `organization`, `contact_role`, `kvk`, `project_location`, `postcode`, `postal_code`, `address`, `planning_notes`, `message`, `first_name`, `last_name`, `firstname` și `lastname`.
- Google Signals este dezactivat. Personalizarea publicitară este dezactivată global pentru toate cele 307 regiuni, iar codul păstrează parametrii `ad_*` refuzați.
- Există două asocieri Google Ads legacy preexistente: una afișează personalizarea activată la nivelul legăturii, iar cealaltă dezactivată. Ambele au rămas neatinse conform domeniului aprobat; nu s-a creat nicio asociere Ads nouă.
- Au fost create cele 12 dimensiuni custom event-scoped aprobate: `content_language`, `audience_context`, `service_context`, `request_type`, `business_sector`, `contact_location`, `document_type`, `document_audience`, `traffic_source`, `traffic_medium`, `entry_page` și `cta_origin`.
- Asocierea Search Console a fost creată la 3 septembrie 2026 între proprietatea Domain `azgs.nl` și fluxul web `azgs.nl`, ID `12841759030`.
- Testul Realtime/DebugView nu este finalizat. Browserul public păstra consimțământul în starea `rejected`, site-ul nu oferă o interfață pentru redeschiderea bannerului, iar browsere separate Chrome/Edge nu au fost disponibile. Realtime a rămas la 0 și nu s-a transmis nimic.
- `generate_lead` nu a fost observat și nu a fost marcat drept key event. Auditul read-only pentru Data sharing, roluri și termenii de prelucrare rămâne pentru o etapă ulterioară.

### Google Business Profile

- Profilul verificat este `A-Z Grand Solutions`, cu website-ul și telefonul corecte.
- Categoria principală `Instalator`, adresa Alpenstraat 12 și programul luni–vineri 08:00–17:00, cu weekendul închis, au rămas neatinse.
- Descrierea aprobată, de 643 de caractere, este publicată integral în profil și nu mai conține afirmația „24/7 bereikbaar”.
- URL-ul `https://azgs.nl/?utm_source=google_business_profile&utm_medium=organic&utm_campaign=local_profile` este valoarea curentă publicată în profil.
- Ariile generale Țările de Jos și Noord-Brabant au fost eliminate. Profilul afișează exact 14 localități normalizate: Lopik, Utrecht, Woerden, Zegveld, Montfoort, Oudewater, Bodegraven, Nieuwegein, IJsselstein, Kamerik, Reeuwijk, Harmelen, Nieuwkoop și Breukelen.
- Serviciul neconfirmat `Instalare încălzitoare de apă` a fost eliminat. Au rămas șapte servicii reale: `Detectare scurgeri instalații`, `Instalare robineți`, `Instalare toalete`, `Montaj sisteme de duș`, `Reparare țevi`, `Reparații robinete` și `Reparații toalete`.
- Adresa este publică. Înainte de a decide păstrarea ei trebuie confirmat dacă clienții pot fi primiți efectiv la locație, cu prezență și semnalizare permanentă în programul afișat. Dacă nu, regulile Google cer ascunderea adresei și folosirea profilului de service-area business.
- Profilul are o recenzie Google reală. Nu se copiază textul, nu se inventează recenzii și nu se adaugă `Review`/`AggregateRating` pe site.

### Bing și IndexNow

- Cheia IndexNow este deja publicată și răspunde corect; scriptul de submit există în repository.
- După confirmarea deploy-ului au fost trimise separat 98 de URL-uri canonice și cele șase surse care redirecționează. Ambele submituri au primit HTTP `200`, pentru 104 URL-uri în total. Răspunsul confirmă acceptarea solicitărilor, nu crawlarea sau indexarea.
- În sesiunea de configurare nu exista autentificare activă în Bing Webmaster Tools. Proprietatea nu a fost importată și sitemapul nu a fost modificat în cont; varianta recomandată rămâne importul proprietății verificate din Google Search Console după autentificare.
- IndexNow nu se repetă doar din cauza lipsei accesului la Bing Webmaster Tools.

### Apple Business

- Din 14 aprilie 2026, Apple Business Connect, Apple Business Manager și Apple Business Essentials au fost consolidate în `Apple Business`, disponibil la `https://business.apple.com/`; datele Business Connect existente s-au migrat automat.
- Pentru AZGS se poate crea organizația și un brand de tip `Single brand` înainte de răspunsul despre adresă. Verificarea organizației trebuie finalizată în 60 de zile și cere două metode de verificare.
- Crearea sau revendicarea unei locații Apple Maps rămâne blocată până la confirmarea unei locații fizice reale unde sunt serviți clienții. Nu se transpun regulile Google Business Profile despre service areas ori ascunderea adresei, deoarece documentația Apple nu descrie un echivalent.
- Apple Business nu a fost început în această sesiune. Funcțiile de bază sunt gratuite; serviciile Apple plătite și publicitatea în Maps rămân în afara acestei etape.

## Implementare publicată în `c88ea5d`

1. pageviews GA4 manuale și fără query/hash, inclusiv navigarea Next.js;
2. atribuirea controlată `google_business_profile / organic / local_profile`;
3. first-touch și origine CTA păstrate numai după consimțământ;
4. eveniment `service_select` și sector B2B pe fluxul formularului;
5. parametrul custom `content_language`, fără suprascrierea câmpului standard GA4 `language`;
6. blocarea traficului GA4 din preview-uri;
7. actualizarea specificației analytics și a politicilor NL/EN conform implementării reale;
8. eliminarea redirectului automat de limbă de pe homepage; `/` rămâne pagina NL, `/en` rămâne pagina EN, iar utilizatorul poate alege explicit din selector;
9. adăugarea unei date `lastmod` exacte pentru conținutul static al release-ului în sitemap, cu păstrarea datelor proprii ale articolelor;
10. consolidarea prin 301 a celor șase rute duplicate de finisare sub URL-urile scurte deja indexate; release-ul publicat are 98 URL-uri canonice în sitemap, față de 104 înaintea consolidării, fără pierdere de conținut unic;
11. numele entității din schema `LocalBusiness` este aliniat cu handelsnaam și profilul Google: `A-Z Grand Solutions`; proprietățile Schema.org neaplicabile au fost eliminate;
12. titluri blog diferențiate NL/EN, dimensiuni Open Graph declarate numai când sunt cunoscute corect și semnal NAP compact `A-Z Grand Solutions · Woerden` în footer;
13. build, audit export și test local fără trimiterea unui formular real.

Paginile B2C păstrează raza istorică de aproximativ 60 km din jurul Woerden. Aceasta este separată de limita pentru mentenanță — maximum 50 km sau circa 1 oră — și de evaluarea urgențelor — maximum 50 km sau circa 40 de minute. Raza B2C nu este extinsă automat către B2B și nu este folosită ca promisiune de acceptare a unei lucrări.

## Operațiuni externe post-deploy

Pachetul a fost executat după aprobarea explicită. Stările de mai jos separă schimbările confirmate prin readback de pașii care au rămas blocați sau în așteptare.

1. **Search Console — finalizat:** sitemapul a fost retrimis și citit cu succes cu 98 de pagini; recrawl-ul celor zece URL-uri prioritare a fost acceptat. Nu s-au folosit Removals sau Validate Fix.
2. **GA4 — configurare principală finalizată, test pending:** măsurările automate care ar dubla implementarea au fost dezactivate, redacția query-urilor a fost configurată, cele 12 dimensiuni au fost create și Search Console a fost asociat. Realtime/DebugView nu a putut fi finalizat, iar `generate_lead` a rămas neobservat și nemarcat.
3. **Google Business Profile — finalizat pentru câmpurile aprobate:** readback-ul confirmă descrierea, URL-ul UTM, exact cele 14 localități și cele șapte servicii curente. Adresa, categoria principală și programul au rămas neatinse; decizia privind afișarea adresei așteaptă răspunsul factual despre condițiile fizice.
4. **Bing Webmaster Tools — în așteptare:** nu exista autentificare, deci nu s-a făcut importul din Search Console și nu s-a modificat sitemapul în cont.
5. **Bing Places for Business — neînceput:** listarea se verifică și se revendică numai cu un cont potrivit, separat de Bing Webmaster Tools.
6. **Apple Business — neînceput:** organizația și un `Single brand` pot fi create cu un cont destinat companiei; o locație Apple Maps așteaptă confirmarea factuală privind locația fizică.
7. **Verificări live și IndexNow — finalizat:** conținutul și răspunsurile HTTP au fost verificate, iar cele două submituri IndexNow au primit HTTP `200`. Testul GA4 real rămâne separat și nu s-a trimis un lead.

## Verificări pre-deploy și post-deploy

- `npm run lint`: trecut;
- `npx tsc --noEmit --incremental false`: trecut;
- `npm audit`: trecut, zero vulnerabilități;
- `npm run build`: trecut cu 103 pagini publice, 98 URL-uri canonice în sitemap, 184 blocuri JSON-LD, 4.205 legături interne, 2.322 referințe la assets locale și 6 PDF-uri; zero avertismente;
- `npm run audit:export`: trecut pentru toate cele 103 pagini;
- `git diff --check`: trecut; mesajele Windows despre conversia LF/CRLF sunt notificări, nu erori;
- test local: niciun script GA4 înainte de consimțământ sau după refuz, un singur `page_view` la acceptare, un singur `page_view` suplimentar la navigarea Next.js, URL-uri fără query și câmpuri de atribuire în formular numai cu consimțământ;
- test local: `/` rămâne în neerlandeză și `/en` în engleză, fără redirect după limba browserului;
- nu s-a trimis nicio solicitare reală prin Formspree și nu s-a transmis trafic local către proprietatea GA4.
- post-deploy: `/` și `/en` răspund `200`; sitemapul are 98 `loc` și 98 `lastmod`, distribuite între 88 de pagini statice și 10 articole;
- post-deploy: cele șase rute duplicate răspund `301` spre destinațiile canonice, iar titlurile blog NL/EN și footerul au conținutul așteptat;
- post-deploy: canonical, hreflang, CSP și headerele de securitate sunt prezente; înainte de consimțământ nu există request sau script GA4;
- post-deploy: IndexNow a acceptat prin HTTP `200` submitul celor 98 de URL-uri canonice și submitul separat al celor șase surse 301.

## Text Google Business Profile publicat

> A-Z Grand Solutions voert vanuit Woerden technische installaties en gebouwonderhoud uit. Voor zakelijke projecten verzorgen wij uitsluitend sanitaire en thermische installaties, inclusief vloerverwarming, en ventilatie. Zakelijke projectlocaties worden per aanvraag beoordeeld binnen het beschreven werkgebied vanuit Woerden. Gebouwonderhoud is beschikbaar tot maximaal 50 km of circa 1 uur reistijd. Spoedaanvragen worden afzonderlijk beoordeeld tot maximaal 50 km of circa 40 minuten rijden; zakelijke spoed is alleen mogelijk voor installaties die door AZGS zijn uitgevoerd. Scope, planning en bereikbaarheid worden altijd vooraf afgestemd.

Website-URL publicat în profil:

`https://azgs.nl/?utm_source=google_business_profile&utm_medium=organic&utm_campaign=local_profile`

Descrierea de 643 de caractere și URL-ul sunt publicate și au fost confirmate prin readback. Descrierea nu conține certificări, garanții, SLA-uri, clienți sau rezultate neverificate.

## Surse oficiale

- Google Search Console — sitemaps: https://support.google.com/webmasters/answer/7451001
- Google — reguli pentru reprezentarea unei companii: https://support.google.com/business/answer/3038177?hl=nl
- Google — arii de servicii: https://support.google.com/business/answer/9157481?hl=nl
- Google — LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google Analytics — pageviews manuale: https://developers.google.com/analytics/devguides/collection/ga4/views
- Google Analytics — conectarea Search Console: https://support.google.com/analytics/answer/10737381
- IndexNow — documentație: https://www.indexnow.org/documentation
- Bing Webmaster Tools — importul din Search Console: https://www2.bing.com/webmasters/help/add-and-verify-site-12184f8b
- Bing Webmaster Tools — sitemaps: https://www.bing.com/webmasters/help/Sitemaps-3b5cf6ed
- Microsoft — Bing Places for Business: https://support.microsoft.com/nl-nl/bing/add-and-manage-your-business-listing
- Apple — lansarea Apple Business în 2026: https://www.apple.com/newsroom/2026/03/introducing-apple-business-a-new-all-in-one-platform-for-businesses-of-all-sizes/
- Apple — înscriere și verificarea organizației: https://support.apple.com/nl-nl/guide/business/axm402206497/web
- Apple — eligibilitate și tipuri de organizații: https://support.apple.com/guide/business/axm7909096bf/1/web/1
- Apple — adăugarea unui brand: https://support.apple.com/guide/business/add-a-brand-abcba97d099e/1/web/1
- Apple — adăugarea unei locații: https://support.apple.com/guide/business/add-a-single-location-abcb98816a34/1/web/1

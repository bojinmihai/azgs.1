# AZ Grand Solutions — roadmap și checkpoint-uri

Ultima actualizare: 3 septembrie 2026

Repository: site Next.js 15 cu export static, bilingv NL/EN

Ramură de lucru: `main`

Baseline public verificat în Git: `1c63315` — `Add B2B terms and conditions`

## Reguli de lucru

- Publicarea se face exclusiv prin GitHub, nu prin Wrangler sau Cloudflare CLI.
- Înainte de publicare se verifică separat `origin` și `live`; la acest checkpoint ambele ramuri `main` indică `1c63315`.
- Textul juridic neerlandez este principal; traducerea engleză este informativă.
- ZIP-urile, `tmp/`, rezultatele build-ului și alte fișiere locale nelegate de lucrare nu se includ în commit.
- Modificările existente ale utilizatorului se păstrează.
- Nu se publică afirmații neverificate despre certificări, asigurări, clienți, proiecte, recenzii, SLA-uri, garanții sau capabilități.
- Fiecare grupă se încheie cu verificări, fișiere modificate, decizii și puncte care necesită confirmare.
- Nu se publică înainte de build, audit și prezentarea exactă a conținutului ce urmează să fie publicat.

## Inventar tehnic — checkpoint Grupa 0

### Git și publicare

- `main`, `origin/main` și `live/main` indică toate commitul `1c63315`.
- `origin`: `https://github.com/bojinmihai/azgs.1.git`
- `live`: `https://github.com/bojinmihai/azgs.git`
- Fișiere locale neversionate și excluse din lucrare: `azgs-production-20260831.zip`, `out.zip`, `tmp/`.
- Nu există modificări locale în fișiere versionate la începutul Grupei 0.

### Arhitectură și conținut

- Next.js App Router, React 19, TypeScript, `output: 'export'`.
- Conținutul paginilor principale este păstrat în `content/pages/*.html` și randat prin `LegacyPage`.
- Există rute NL la rădăcină și rute EN sub `/en`.
- Există pagini pentru home, servicii, contact, B2C, B2B, întreținere, urgențe, blog, politici și condiții.
- Există pagini dinamice de servicii pe audiențe (`particulier`, `zakelijk`, `onderhoud`) și servicii, dar nu pagini comerciale distincte pe sectoarele din Grupa 4.
- Pagina de proiecte este în principal infrastructură/editorial guidance, fără proiecte inventate; rămâne în afara lucrării curente.

### Identitate juridică

- Configurația centrală conține: `AZ Grand Solutions vof`, handelsnaam `A-Z Grand Solutions`, KvK `42064891`, Alpenstraat 12, 3446 DN Woerden.
- Vestigingsnummer `000053925335` apare în condițiile B2B, dar nu este încă definit în configurația centrală.
- Condițiile B2B NL/EN sunt implementate ca versiunea 1.0 din 2 septembrie 2026, cu NL declarat text autentic și obligatoriu.
- Condițiile B2C există în NL/EN, însă nu au versiune și dată clare și folosesc pe alocuri identitatea scurtă `AZ Grand Solutions (AZGS)` în locul identității juridice complete.
- Nu există PDF-uri juridice descărcabile în `public/`.
- `B2B-TERMS-REVIEW.md` conține formularea pentru ofertele B2B și punctele pentru jurist; lipsește echivalentul complet B2C.

### Formular și confidențialitate

- Formularul NL/EN este un formular HTML generic trimis către Formspree (`xjgjryzn`).
- Câmpuri actuale: nume, e-mail, telefon opțional, localitate/cod poștal opțional, tip cerere, serviciu, mesaj și acord privind confidențialitatea.
- Există honeypot și redirect către pagina de mulțumire.
- Nu există ramuri adaptive separate pentru B2C, B2B, Onderhoud și Spoed.
- Nu există upload de documente, câmpuri B2B/întreținere, captură UTM sau validare/mesaje de eroare personalizate.
- Politica de confidențialitate descrie Formspree, Google, Meta și transferurile internaționale; trebuie reverificată când se schimbă formularul.

### Analytics și consimțământ

- GA4 (`G-DK6FZHQRCB`) este injectat numai după consimțământul stocat în `azgs-consent-v1`.
- Refuzul nu încarcă scriptul GA4; preferința poate fi resetată din pagina cookie.
- Google Maps este separat și se încarcă numai la cererea utilizatorului.
- Singurul eveniment personalizat găsit este `audience_select`.
- Lipsesc evenimentele de formular, telefon, WhatsApp, e-mail și descărcări, precum și schema documentată de parametri și sursa/UTM fără PII.

### SEO și structură tehnică

- Helper-ul comun generează canonical, hreflang NL/EN/x-default, Open Graph și Twitter metadata.
- `sitemap.ts` include rutele statice, paginile audiență-serviciu și blogul; pagina de mulțumire este exclusă.
- `robots.ts`, JSON-LD LocalBusiness/Service, redirecturile statice și scriptul de audit al exportului există.
- CSP este întărit după build prin `scripts/harden-csp.mjs`.
- Auditul final trebuie să verifice dacă toate afirmațiile din JSON-LD (inclusiv program, arie, servicii și `priceRange`) sunt confirmate și dacă noile rute sunt incluse corect.

## Stare pe grupe

| Grupa | Stare la checkpoint-ul 0 | Implementat deja | Lucru rămas principal |
|---|---|---|---|
| 0 — Inventar și plan | Finalizat | Git, arhitectură și funcții inventariate; baseline valid | Niciun rest în Grupa 0 |
| 1 — Juridic B2C/B2B | Finalizat tehnic; draft juridic | B2C NL principal + EN informativ v1.0 și B2B NL principal + EN informativ v1.1; identitate unificată; 4 PDF-uri; butoane; clauze de ofertă; control de consistență și surse oficiale | validare de către un jurist neerlandez și confirmarea deciziilor comerciale înainte de utilizarea contractuală sau publicare |
| 2 — Formular adaptiv | Finalizat tehnic local; integrare de confirmat | formular adaptiv NL/EN pentru B2C, B2B, Onderhoud și Spoed; validare accesibilă; flux local fără POST; politici și CSP actualizate | confirmarea dashboardului Formspree, o probă manuală completă cu tastatură și o singură trimitere end-to-end controlată înainte de publicare |
| 3 — Analytics | Finalizat tehnic local; dashboard de confirmat | consent mode Basic, evenimente de conversie, parametri fără PII, atribuire categorială sigură, politici și specificație | setările reale din GA4, dimensiunile custom și un test Realtime/DebugView după un deploy aprobat |
| 4 — Sectoare B2B | Finalizat tehnic local; conținut comercial de confirmat | 12 pagini NL/EN pentru șase sectoare, conținut distinct, limite de responsabilitate, CTA B2B, metadata, hreflang, sitemap și legături interne | confirmarea de către utilizator a serviciilor și delimitărilor pentru fiecare sector înainte de publicare |
| 5 — Întreținere | Poartă comercială/juridică pregătită; confirmare necesară | audit complet, structură cu trei forme de colaborare, delimitări, 16 decizii recomandate și analiză oficială actualizată în `AZGS-MAINTENANCE-DECISION.md` | confirmarea modelului și capabilităților; apoi rescrierea NL/EN, remedierile de consistență, metadata, sitemap, legături și testele complete |
| 6 — Werkwijze | Parțial | secțiuni de proces pe mai multe pagini de servicii | pagină dedicată NL/EN, diferențiere pe audiențe, CTA, metadata, sitemap și legături interne |
| 7 — Capabilities statement | Neînceput | identitate și conținut B2B reutilizabil | document NL/EN de 1–2 pagini, PDF-uri verificate vizual și linkuri pe pagina Business |
| 8 — Recenzii | Infrastructură minimă | pagina proiecte descrie câmpuri de dovadă/review | verificare sursă reală, structură și flux de solicitare; nimic public fără conținut și permisiune verificabile |
| 9 — Audit final | Parțial ca infrastructură | build static, lint, audit export, CSP, sitemap/robots/metadata | audit complet, remedieri, build final, preview exact, commit/push aprobat și verificare HTTP post-deploy |

## Ordinea de execuție și porțile de decizie

1. **Grupa 0 — MEDIU:** baseline și acest checkpoint.
2. **Grupa 1 — ULTRA:** cercetare numai din surse oficiale actualizate; redactare NL principală, traducere EN, PDF-uri și verificare vizuală. Textele rămân draft pentru verificare juridică externă.
3. **Grupa 2 — MAXIM:** auditarea limitelor planului Formspree înainte de orice upload; implementare și teste locale fără cereri reale.
4. **Grupa 3 — RIDICAT:** strat unic de analytics, evenimente fără PII și documentație.
5. **Grupa 4 — RIDICAT:** inventar factual al capabilităților înainte de a decide ce pagini sectoriale pot fi publicate legitim.
6. **Grupa 5 — ULTRA:** mai întâi structură și listă de decizii comerciale; NL/EN final numai după confirmarea utilizatorului privind modelul de serviciu.
7. **Grupa 6 — MEDIU:** pagină de proces construită din fluxurile confirmate anterior.
8. **Grupa 7 — RIDICAT:** capabilities statement bazat exclusiv pe conținut confirmat; render și control vizual pagină cu pagină.
9. **Grupa 8 — RIDICAT:** surse/permisiuni înainte de afișare; fără schema Review/AggregateRating în lipsa dovezilor conforme.
10. **Grupa 9 — MAXIM:** audit complet, prezentare pre-deploy, apoi publicare GitHub numai cu acord și verificare post-deploy.

## Jurnal de checkpoint

### Grupa 0 — 3 septembrie 2026

- Inventar repository și Git: finalizat.
- Inventar funcțional: finalizat.
- `npm run lint`: trecut fără erori.
- `npm run build`: trecut; 101 pagini statice generate, 97 pagini publice exportate și CSP strict regenerat pentru cele 97 de pagini.
- `npm run audit:export`: trecut; metadata, structura H1 și linkurile interne sunt valide pe toate cele 97 de pagini exportate.
- Fișier creat: `AZGS-ROADMAP.md`.
- Nu s-au modificat pagini publice și nu s-a făcut deploy.
- Următoarea grupă: Grupa 1 — necesită modul `ULTRA` înainte de începerea cercetării și redactării juridice.

### Grupa 1 — 3 septembrie 2026

**Rezultat:** implementarea tehnică este finalizată local. Textele sunt drafturi contractuale și nu sunt prezentate ca fiind aprobate juridic. Nu se folosesc contractual și nu se publică înainte de verificarea unui jurist neerlandez și de confirmarea deciziilor deschise.

**Versiuni pregătite**

- B2C NL, text juridic principal: v1.0, data versiunii 3 septembrie 2026.
- B2C EN, traducere informativă: v1.0, data versiunii 3 septembrie 2026.
- B2B NL, text juridic principal: v1.1, data versiunii 3 septembrie 2026.
- B2B EN, traducere informativă: v1.1, data versiunii 3 septembrie 2026.
- Identitate folosită consecvent: `AZ Grand Solutions vof`, handelsnaam `A-Z Grand Solutions`, KvK `42064891`, vestigingsnummer `000053925335`, Alpenstraat 12, 3446 DN Woerden.

**Implementare**

- Condițiile B2C NL/EN au fost rescrise pentru delimitarea contractului, terhandstelling, dreptul de retragere aplicabil, preț și plată, lucrări suplimentare, avertizare, recepție, dosar, răspundere după recepție, reclamații și încetare.
- Condițiile B2B NL/EN au fost actualizate și armonizate cu B2C unde regimurile juridice se suprapun.
- Art. 7:758 alin. 4 BW nu este exclus prin condițiile generale. Pentru B2B este menționată numai posibilitatea unei eventuale abateri valabile, exprese și specifice proiectului într-un acord individual, supusă verificării juridice.
- Pagina NL este declarată versiunea juridică principală; pagina EN este etichetată drept traducere informativă.
- Au fost adăugate butoane de descărcare și patru PDF-uri A4 cu fonturi încorporate, marcaje, cuprins, metadate de limbă și numerotare.
- A fost eliminat scriptul generic de acceptare a condițiilor din paginile web. Formularul v4 cere numai confirmarea citirii versiunii indicate și o include în email; nu este acceptare contractuală. Aplicabilitatea se stabilește în continuare în fluxul ofertă/contract, cu furnizarea documentului înainte sau la încheiere și păstrarea dovezii.
- `AZGS-LEGAL-REVIEW.md` conține textele exacte NL/EN pentru oferte B2C/B2B, pașii de terhandstelling, variantele pentru începere anticipată și reparații urgente, sursele oficiale și checklist-ul pentru jurist.

**Fișiere de conținut și integrare modificate/create**

- `content/pages/terms.nl.html`, `content/pages/terms.en.html`
- `content/pages/termsBusiness.nl.html`, `content/pages/termsBusiness.en.html`
- `content/pages/about.nl.html`, `content/pages/about.en.html`
- `content/pages/privacy.nl.html`, `content/pages/privacy.en.html`
- `content/pages/cookies.en.html`, `content/pages/meta.json`
- `app/globals.css`, `components/SiteShell.tsx`; `components/TermsConsentScript.tsx` eliminat
- `lib/site.ts`, `lib/seo.ts`, `public/llms.txt`, `DEPLOYMENT-README-FINAL.md`
- `AZGS-LEGAL-REVIEW.md`, `B2B-TERMS-REVIEW.md`
- `scripts/generate-legal-pdfs.py`, `scripts/verify-legal-pdfs.py`
- `output/pdf/*.pdf` și copiile pentru site din `public/downloads/legal/*.pdf`

**Verificări efectuate**

- `npm run lint`: trecut.
- `npx tsc --noEmit --incremental false`: trecut.
- `git diff --check`: trecut; numai avertismentele Git existente despre conversia LF/CRLF.
- `npm run build`: trecut; 101 pagini statice generate și CSP strict regenerat pentru 97 de pagini publice.
- `npm run audit:export`: trecut; metadata, H1 și linkurile interne sunt valide pe toate cele 97 de pagini exportate.
- Verificator PDF: trecut pentru toate cele patru originale și copiile publice; 7 pagini pentru fiecare document B2C și 8 pagini pentru fiecare document B2B.
- Control vizual: toate cele 30 de pagini PDF au fost randate și inspectate pagină cu pagină; nu s-au observat tăieri, suprapuneri sau probleme de lizibilitate.

**Decizii care necesită confirmare înainte de utilizare contractuală**

- validitatea și caracterul complet al întregului text NL, inclusiv clasificarea corectă B2C/B2B pentru fiecare client și proiect;
- limita și arhitectura răspunderii B2B, inclusiv corelarea cu polița reală de asigurare, fără a afirma public existența sau acoperirea unei polițe neverificate;
- termenele B2B propuse pentru inspecție și notificare, dobânda, costurile de colectare, competența instanței, autoritatea reprezentantului de proiect, materialele înlocuite și lucrările suplimentare;
- aplicarea regulilor speciale pentru construirea unei locuințe noi pentru consumator, inclusiv perioada de 3 zile, informația privind protecția financiară și schema de 5%, atunci când un proiect intră efectiv în acea categorie;
- aplicarea Wkb și obligațiile concrete de avertizare/dosar/recepție pentru tipul real de lucrare;
- textele pentru începerea serviciilor în perioada de retragere și pentru reparațiile urgente solicitate de consumator;
- efectul reflex pentru profesioniști foarte mici și orice abatere B2B individuală de la art. 7:758 alin. 4 BW.

**Stare Git/publicare**

- Nu s-a creat commit, nu s-a făcut push și nu s-a făcut deploy.
- `origin/main` și `live/main` rămân la baseline-ul public `1c63315` până la aprobarea unei publicări.
- `azgs-production-20260831.zip`, `out.zip` și `tmp/` au rămas în afara lucrării și nu vor fi incluse în commit.
- Următoarea grupă: Grupa 2 — necesită modul `MAXIM` înainte de implementarea formularului adaptiv.

### Grupa 2 — 3 septembrie 2026

**Rezultat:** formularul adaptiv bilingv este finalizat tehnic și verificat local. Nu s-a trimis nicio solicitare reală către Formspree sau AZ Grand Solutions și nu s-a publicat nimic.

**Implementare**

- Sunt disponibile patru trasee distincte: `Particulier/B2C`, `Zakelijk/B2B`, `Gebouwonderhoud` și `Spoed`.
- Câmpurile inactive nu sunt randate, nu sunt validate și nu intră în payload. Valorile tehnice sunt stabile în NL/EN, iar parametrii `type`/`requester_type` și `service`/`dienst` sunt acceptați numai prin allowlist.
- Formularul B2C rămâne scurt. Formularul B2B include companie, contact, rol, KvK opțional, locație aproximativă, clădire, lucrare, fază, perioadă, planning, documente disponibile și tipul colaborării. Formularul de întreținere include tipul clădirii, numărul de locații, urgența dorită, accesul și modelul punctual/periodic.
- Fluxul Spoed afișează apelul telefonic înaintea câmpurilor și precizează că formularul nu este monitorizat imediat și nu garantează un răspuns imediat. Pentru pericol direct sunt indicate 112 sau serviciul competent.
- Nu a fost adăugat upload. Planul și cota Formspree nu pot fi confirmate din repository, iar documentele pot conține date inutile pentru prima evaluare. Formularul întreabă numai ce documente există.
- Validarea este localizată și folosește erori lângă câmp, rezumat focalizabil, `aria-invalid`, `aria-describedby`, live regions, stare de trimitere și mesaje distincte pentru 429, HTTP și rețea.
- Pe `localhost`, `127.0.0.1`, `[::1]` și `file:` orice trimitere validă este oprită local și confirmă explicit că nu s-a făcut POST.
- Trimiterea reușită de producție emite numai `requestType` și `service` prin evenimentul local `azgs:form-success`; integrarea analytics rămâne pentru Grupa 3 și nu include PII.
- Politicile de confidențialitate și cookies descriu câmpurile adaptive, minimizarea, rolul Formspree și faptul că nu se încarcă script/iframe Formspree la simpla vizitare. CSP permite conexiunea către Formspree numai la submit.
- CTA-urile B2C, B2B și Onderhoud deschid direct traseul relevant. Pe pagina Contact, butonul WhatsApp flotant duplicat a fost ascuns după verificarea vizuală mobilă; cardul WhatsApp din contact rămâne disponibil.
- Afirmațiile neverificate despre program 24/7 sau un răspuns într-o zi lucrătoare au fost eliminate din paginile Contact și Mulțumire.

**Fișiere modificate/create în Grupa 2**

- `components/AdaptiveContactSection.tsx`, `components/ContactPage.tsx`, `components/SiteShell.tsx`
- `app/(nl)/contact/page.tsx`, `app/(en)/en/contact/page.tsx`, `app/globals.css`
- `content/pages/contact.nl.html`, `content/pages/contact.en.html`
- `content/pages/privacy.nl.html`, `content/pages/privacy.en.html`
- `content/pages/cookies.nl.html`, `content/pages/cookies.en.html`
- `content/pages/private.nl.html`, `content/pages/private.en.html`
- `content/pages/business.nl.html`, `content/pages/business.en.html`
- `content/pages/maintenance.nl.html`, `content/pages/maintenance.en.html`
- `content/pages/thankYou.nl.html`, `content/pages/thankYou.en.html`
- `scripts/harden-csp.mjs`, `AZGS-FORM-SPEC.md`, `AZGS-ROADMAP.md`

**Verificări efectuate**

- `npm run lint`: trecut.
- `npx tsc --noEmit --incremental false`: trecut.
- `git diff --check`: trecut; numai avertismentele Git existente despre conversia LF/CRLF.
- `npm run build`: trecut; 101 pagini statice generate, 97 pagini publice exportate și CSP strict regenerat cu 949 hash-uri unice.
- `npm run audit:export`: trecut; metadata, H1 și linkurile interne sunt valide pe toate cele 97 de pagini exportate.
- Verificatorul PDF din Grupa 1: trecut din nou pentru toate cele patru originale și copiile publice.
- Teste funcționale locale NL/EN: selecție și validare pe toate cele patru trasee, email invalid, regula email-sau-telefon pentru Spoed, query aliases și ignorarea valorilor necunoscute.
- Teste locale de submit valid pentru B2C, B2B, Onderhoud și Spoed: mesaj de succes local și zero resurse încărcate de la `formspree.io`.
- Verificare payload/DOM: numai câmpurile traseului activ; fără upload; fără ID-uri duplicate; fără controale vizibile neetichetate; honeypot scos din ordinea de tabulare.
- Verificare responsive la 320, 375, 768 și 1280 px: fără overflow orizontal, grilă cu o coloană pe mobil și două la breakpointurile mai mari. Fluxul Spoed și apelul telefonic au fost inspectate vizual.
- Focusul pe rezumatul de erori și live regions a fost verificat. Automatizarea browserului folosită aici nu a reprodus acțiunea implicită Tab/săgeți pe grupul radio; controlul este un grup nativ `fieldset` + `input type="radio"`, dar o probă manuală completă cu tastatură rămâne obligatorie înainte de publicare.
- Scanare țintită: niciun `<input type="file">` și nicio promisiune 24/7, „o zi lucrătoare” sau răspuns garantat în noul formular și paginile Contact/Mulțumire.

**Decizii asumate**

- Fără upload în această etapă; documentele se cer ulterior printr-un canal convenit.
- Fără checkbox generic de „consimțământ” pentru politica de confidențialitate și fără acceptarea condițiilor prin simpla trimitere a formularului. Checkboxul separat din v4 confirmă numai citirea condițiilor identificate și este inclus în email.
- Locația inițială este limitată la localitate sau cod poștal; nu se solicită adresa completă, coduri de alarmă, chei sau date sensibile.
- Pentru Spoed, telefonul este CTA principal; formularul este numai o cerere secundară de contact/retur apel.

**De confirmat înainte de publicare**

1. Planul Formspree, cota lunară, destinația endpointului și adresele de notificare.
2. CAPTCHA/Turnstile, `Restrict to Domain`, validările workflow și retenția reală din dashboard.
3. O probă manuală completă cu tastatură într-un browser obișnuit.
4. O singură trimitere end-to-end controlată și convenită în prealabil; Formspree nu oferă un dry-run general.

**Stare Git/publicare**

- Nu s-a creat commit, nu s-a făcut push și nu s-a făcut deploy.
- `HEAD`, `origin/main` și `live/main` rămân la `1c63315`; remote-urile sunt `bojinmihai/azgs.1.git` și `bojinmihai/azgs.git`.
- `azgs-production-20260831.zip`, `out.zip` și `tmp/` au rămas neatinse și în afara lucrării.
- Următoarea grupă: Grupa 3 — necesită modul `RIDICAT` înainte de auditul și implementarea analytics.

### Grupa 3 — 3 septembrie 2026

**Rezultat:** stratul local de analytics și urmărire a conversiilor este finalizat tehnic. Implementarea folosește consent mode de tip Basic: înainte de accept nu se creează `gtag`, nu se încarcă scriptul Google, nu se plasează cookie-uri GA4 și nu se trimit evenimente. Nu s-a făcut deploy și nu s-a trimis trafic de test către proprietatea GA4.

**Implementare**

- Un modul central allowlist-ează numele evenimentelor și parametrii; toate apelurile personalizate trec prin el și sunt blocate dacă nu există consimțământ acceptat.
- Sunt implementate: `audience_select`, `request_type_select`, `contact_form_start`, `contact_form_abandon`, `generate_lead`, `phone_click`, `whatsapp_click`, `email_click`, `legal_document_download` și infrastructura pentru viitorul `b2b_document_download` din Grupa 7.
- `generate_lead` se emite numai după confirmarea de succes a formularului. Abandonul se măsoară numai după o interacțiune reală și nu include valori de câmp, durată sau număr de câmpuri completate.
- Nu se trimit în GA4 nume, e-mailuri, telefoane, localități/coduri poștale, mesaje, URL-uri cu query/fragment, valori UTM libere sau referrer extern complet.
- Sursa, mediul și referrerul sunt reduse la categorii fixe. Din campanie se păstrează numai `campaign_present=yes/no`; valorile brute nu sunt persistate sau trimise.
- Formularul primește doar câmpurile tehnice sigure `origin_page`, `traffic_source`, `traffic_medium`, `campaign_present` și `referrer_type`.
- La refuz/retragere se opresc evenimentele noi, se setează `ga-disable-*`, se elimină scriptul GA4, se șterge atribuirea din sesiune și se încearcă ștergerea cookie-urilor proprii `_ga`/`_ga_*`.
- Refuzul și acceptarea sunt afișate la același nivel vizual. Footerul oferă permanent retragerea consimțământului printr-un singur clic.
- Configurația din cod dezactivează Google Signals și personalizarea publicitară și păstrează toate stările de advertising consent pe `denied`.
- Politicile NL/EN explică evenimentele, minimizarea, atribuirea, retragerea și setările care trebuie confirmate în contul GA4.
- `AZGS-ANALYTICS-SPEC.md` documentează schema evenimentelor, parametrii comuni, regulile fără PII, checklist-ul de dashboard și sursele oficiale.

**Fișiere modificate/create în Grupa 3**

- `lib/analytics.ts`, `components/AnalyticsTracker.tsx`
- `components/CookieConsent.tsx`, `components/AudienceChoiceLink.tsx`
- `components/SiteShell.tsx`, `components/Footer.tsx`, `components/AdaptiveContactSection.tsx`
- `app/globals.css`, `messages/nl.json`, `messages/en.json`
- `content/pages/cookies.nl.html`, `content/pages/cookies.en.html`
- `content/pages/privacy.nl.html`, `content/pages/privacy.en.html`
- `AZGS-ANALYTICS-SPEC.md`, `AZGS-FORM-SPEC.md`, `AZGS-ROADMAP.md`

**Verificări efectuate**

- `npm run lint`: trecut.
- `npx tsc --noEmit --incremental false`: trecut.
- `git diff --check`: trecut; numai avertismentele Git existente despre conversia LF/CRLF.
- `npm run build`: trecut; 101 pagini statice generate, 97 pagini publice exportate și CSP strict regenerat cu 960 de hash-uri unice.
- `npm run audit:export`: trecut; metadata, H1 și linkurile interne sunt valide pe toate cele 97 de pagini exportate.
- Teste fără consimțământ și după refuz: zero evenimente, zero script GA4 și zero resurse Google.
- Teste locale după acceptare: start, selecție B2C/B2B/Onderhoud, abandon, succes simulat, telefon, e-mail, WhatsApp, alegere de audiență și descărcare condiții.
- Test de minimizare: valori UTM necunoscute sau cu aspect de date personale devin `other`; numele campaniei nu apare în payload, iar query-ul nu apare în `origin_page`.
- Testul local de submit a emis `generate_lead` fără POST către Formspree și fără cerere către Google.
- Bannerul de consimțământ a fost inspectat vizual la 375 × 812 px; ambele opțiuni sunt vizibile și echivalente.
- Exportul static conține câmpurile tehnice sigure în formularele NL și EN.

**Decizii asumate**

- GA4 Standard/gratuit este suficient pentru volumul și funcțiile actuale; GA4 360 nu este justificat.
- Nu se activează un plan Formspree plătit în această grupă. Acesta va fi reevaluat numai când există o nevoie reală de upload, cotă, retenție sau workflow-uri avansate.
- Nu se păstrează valori UTM brute, chiar dacă acest lucru reduce granularitatea rapoartelor de campanie; minimizarea și protecția împotriva PII accidental prevalează.
- Enhanced Measurement pentru interacțiuni cu formulare trebuie dezactivat în dashboard pentru a evita dublarea evenimentelor personalizate.

**De confirmat înainte de publicare**

1. Proprietatea și measurement ID-ul GA4 corecte, accesul administratorului și setările reale ale contului.
2. Google Signals, personalizarea publicitară și legăturile cu produse de advertising sunt dezactivate și în dashboard.
3. Enhanced Measurement pentru formulare este dezactivat; comportamentul automat pentru file downloads este fie documentat, fie dezactivat pentru a evita dublarea.
4. `generate_lead` este marcat ca key event și dimensiunile custom necesare sunt înregistrate după primul eveniment controlat.
5. Retenția este aleasă și documentată (recomandare minimizată: 2 luni, dacă nu există o nevoie justificată pentru 14 luni), împreună cu setările de partajare și transfer.
6. Un singur test controlat Realtime/DebugView se face numai după un deploy aprobat; nu este necesară trimiterea de trafic real în această etapă locală.

**Stare Git/publicare**

- Nu s-a creat commit, nu s-a făcut push și nu s-a făcut deploy.
- `HEAD`, `origin/main` și `live/main` rămân la `1c63315`.
- ZIP-urile și `tmp/` au rămas neatinse și nu vor fi incluse în commit.
- Următoarea grupă: Grupa 4 — necesită modul `RIDICAT` înainte de inventarul factual și paginile sectoriale B2B.

### Grupa 4 — 3 septembrie 2026

**Rezultat:** implementarea tehnică locală a paginilor comerciale B2B este finalizată. Au fost create șase perechi NL/EN cu conținut adaptat sectorului, fără fotografii noi, clienți, proiecte, recenzii, certificări, rezultate sau SLA-uri inventate. Nu s-a publicat nimic.

**Pagini create**

1. Aannemers en bouwbedrijven / Contractors and construction companies:
   - `/zakelijk/aannemers-bouwbedrijven`
   - `/en/business/contractors-construction-companies`
2. Vastgoedbeheerders / Property managers:
   - `/zakelijk/vastgoedbeheerders`
   - `/en/business/property-managers`
3. Horeca en hotels / Hospitality and hotels:
   - `/zakelijk/horeca-hotels`
   - `/en/business/hospitality-hotels`
4. Kantoren en winkels / Offices and retail:
   - `/zakelijk/kantoren-winkels`
   - `/en/business/offices-retail`
5. VvE / Owners associations:
   - `/zakelijk/vve`
   - `/en/business/owners-associations`
6. Installatie- en ventilatiebedrijven / Installation and ventilation companies:
   - `/zakelijk/installatie-ventilatiebedrijven`
   - `/en/business/installation-ventilation-companies`

**Implementare și decizii**

- Fiecare sector are probleme și cerințe proprii, lucrări relevante, informații necesare evaluării, împărțirea responsabilităților și limite explicite.
- Conținutul este structurat pe două direcții reale din site: execuție de proiect pentru aannemers/installation partners și lucru în clădiri utilizate pentru vastgoed, horeca, office/retail și VvE.
- Nu se afirmă că AZGS preia automat rolul de hoofdaannemer, proiectant, responsabil de sistem, organism de inspecție sau specialist pentru certificare, commissioning ori fire stopping.
- Lucrările specializate, proiectarea, calculele, inspecțiile și punerea în funcțiune rămân la partea competentă desemnată; paginile explică numai interfețele necesare.
- Nu sunt promise intervenții în afara programului, continuitate operațională sau timpi de răspuns. Acestea pot exista numai după evaluare și acord scris.
- Pagina Business NL și EN include acum o grilă cu toate cele șase sectoare. Fiecare pagină sectorială leagă servicii relevante și alte trei sectoare conexe.
- CTA-ul folosește formularul adaptiv cu `type=business` și un `sector` din allowlist. Formularul trimite câmpul tehnic `business_sector` numai pentru una dintre cele șase valori fixe; orice valoare necunoscută este ignorată.
- Toate paginile folosesc canonical, hreflang NL/EN/x-default, metadata distinctă și breadcrumb JSON-LD fără afirmații comerciale suplimentare.
- Sitemapul include toate cele 12 URL-uri și perechile lor lingvistice.

**Fișiere modificate/create în Grupa 4**

- `lib/business-sectors.ts`
- `components/BusinessSectorPage.tsx`
- `app/(nl)/zakelijk/[sector]/page.tsx`
- `app/(en)/en/business/[sector]/page.tsx`
- `app/sitemap.ts`, `app/globals.css`
- `content/pages/business.nl.html`, `content/pages/business.en.html`
- `components/AdaptiveContactSection.tsx`
- `AZGS-FORM-SPEC.md`, `AZGS-ROADMAP.md`

**Verificări efectuate**

- `npm run lint`: trecut.
- `npx tsc --noEmit --incremental false`: trecut.
- `git diff --check`: trecut; numai avertismentele Git existente despre conversia LF/CRLF.
- `npm run build`: trecut; 113 pagini statice generate, 109 pagini publice exportate și CSP strict regenerat cu 1152 hash-uri unice.
- `npm run audit:export`: trecut; metadata, H1 și toate legăturile interne sunt valide pe cele 109 pagini exportate.
- Toate cele 12 rute sectoriale au răspuns local cu HTTP 200 și exact un H1.
- Titlurile și descrierile sunt unice pe toate cele 12 pagini; titlurile au maximum 57 de caractere, iar descrierile maximum 160.
- Canonical-ul corespunde fiecărei rute; fiecare pereche NL/EN are hreflang `nl`, `en` și `x-default` corect.
- Sitemap: 12 blocuri sectoriale, fiecare cu trei alternates.
- CTA NL și EN, preselectarea B2B și existența contextului sectorial allowlist-uit au fost verificate local. O valoare sectorială necunoscută nu produce câmp ascuns.
- Verificare Browser la 375 × 812 și 1280 × 800 px: structură lizibilă, CTA accesibile și zero overflow orizontal pe mobil. Schimbarea limbii deschide perechea corectă.
- Nu a fost făcut niciun POST către Formspree și nicio cerere de analytics către Google.

**De confirmat înainte de publicare**

1. AZGS dorește și poate accepta în mod real cereri din toate cele șase sectoare enumerate.
2. Sunt corecte lucrările descrise pentru fiecare sector, în special conducte/kanalen de ventilatie, warmtepompvoorbereiding, vloerverwarming, gipsplaten/metalstud și herstelafwerking.
3. Pentru vastgoedbeheerders, VvE, horeca și office/retail, formularul B2B este traseul principal corect; formularul Onderhoud rămâne alternativa pentru o sesizare concretă.
4. Împărțirea propusă pentru materiale, acces, desene, inspecții, decizii, commissioning și lucrările specializate corespunde modului real de colaborare.
5. Regiunea Utrecht este formularea comercială corectă pentru aceste pagini; nu s-a extins aria și nu s-a promis acoperire națională.

**Planuri plătite**

- Nu este necesar niciun plan plătit pentru aceste pagini, pentru SEO sau pentru testarea locală.
- Nu s-a activat și nu s-a recomandat cumpărarea unui serviciu suplimentar.

**Stare Git/publicare**

- Nu s-a creat commit, nu s-a făcut push și nu s-a făcut deploy.
- `HEAD`, `origin/main` și `live/main` rămân la `1c63315`.
- ZIP-urile și `tmp/` au rămas neatinse și nu vor fi incluse în commit.
- Următoarea grupă: Grupa 5 — necesită modul `ULTRA` înainte de analiza contractuală și structura serviciilor de întreținere.

### Grupa 5 — poarta de decizie — 3 septembrie 2026

**Rezultat intermediar:** structura comercială și analiza juridică pentru întreținere sunt pregătite local. Conform porții stabilite în plan, paginile publice NL/EN nu au fost încă redactate sau modificate; implementarea continuă numai după confirmarea structurii de către utilizator.

**Structura recomandată**

- Trei forme de colaborare, nu planuri cu SLA: `Losse interventie`, `Planmatig onderhoud` și `Onderhoud voor meerdere locaties`.
- Intervențiile punctuale pot fi B2C sau B2B. Întreținerea planificată și multi-location sunt recomandate inițial numai B2B.
- Acordul-cadru, anexele de locație și comenzile individuale sunt separate. Lucrările reactive neincluse se acceptă separat.
- Programul se stabilește prin ferestre convenite; nu se publică încă ore fixe.
- Urgențele folosesc telefonul pentru evaluare, fără acceptare, sosire, remediere ori disponibilitate garantată.
- Materialele, accesul, plafoanele de autorizare, raportarea, deplasarea și facturarea se stabilesc în ofertă/acord.
- Durata și data finală se stabilesc individual. Recomandarea inițială este fără reînnoire automată.
- Nu se oferă public capacitate rezervată, disponibilitate 24/7, număr de intervenții sau SLA.

**Constatări juridice care influențează modelul**

- Întreținerea poate combina `opdracht` și `aanneming van werk`; calificarea fiecărei activități schimbă regulile de încetare și remunerație.
- Un contract periodic B2C necesită reguli distincte pentru durata inițială, continuare, preaviz, canalul de încetare, retragere și prețul inclusiv TVA/costuri inevitabile.
- Din 25 iunie 2026, art. 6:230oa BW cere o funcție online vizibilă de retragere pentru contractele B2C încheiate printr-o interfață online. Formularul actual rămâne numai cerere neobligatorie; orice viitoare acceptare, semnare sau plată online trebuie reevaluată înainte de lansare.
- Condițiile generale trebuie transmise înainte de acceptare și trebuie păstrată dovada versiunii. Scopul, frecvența, prețul, durata și încetarea se pun în acord/anexă, nu numai în condiții.
- Pentru `bouwwerken`, avertizarea scrisă din art. 7:754(2) și răspunderea din art. 7:758(4) trebuie tratate corect. Nu se introduce o abatere B2C și nici o abatere B2B ascunsă numai în condițiile generale.
- Limita de răspundere B2B și orice raportare la o asigurare necesită verificare de jurist și confirmarea acoperirii reale; nu se afirmă existența unei asigurări.

**Auditul conținutului existent**

- Pagina maintenance susține bine fluxul de intervenție punctuală, dar unele formulări sugerează rezultate/viteză și un singur interlocutor dincolo de scope-ul acceptat.
- Rutele maintenance pentru schilderherstel și tegelherstel reutilizează corp de pagină orientat B2C și CTA generic; trebuie rescrise sau nelinkate.
- La momentul acestui audit, alte pagini și `public/llms.txt` conțineau afirmații 24/7 și, uneori, sosire aproximativ într-o oră. Aceste afirmații au fost eliminate în release-ul final; formularul și termenii nu garantează răspuns imediat.
- Afirmațiile `35+ ani` și `VCA` nu au dovezi găsite în repository și rămân excluse din noul conținut.
- Pagina Business și marcajul de draft al termenilor B2B trebuie aliniate înainte de publicare.

**Fișier creat în această fază**

- `AZGS-MAINTENANCE-DECISION.md`: structură inclus/exclus, program, urgențe, materiale, acces, raportare, facturare, niveluri fără SLA, implicații juridice, surse oficiale, audit și 16 decizii recomandate.

**Verificări efectuate în această fază**

- Cercetare din surse oficiale actuale: BW Boek 6/7, Staatsblad 2026 nr. 153, ACM/ConsuWijzer, RVO/Business.gov.nl și IPLO.
- Audit read-only al paginilor maintenance, formularului, conținutului sectorial și termenilor B2C/B2B.
- `git diff --check` pentru documentele acestei faze: trecut.
- Control structural: 16 rânduri de decizie, 15 surse oficiale/primare legate și ierarhie Markdown validă.
- Nu s-a rerulat build-ul în această poartă deoarece nu a fost modificat codul sau conținutul public. Ultimul build complet din Grupa 4 rămâne trecut: 113 pagini statice, 109 publice și audit export valid.

**De confirmat pentru continuarea Grupei 5**

1. Pachetul recomandat G5-D01–G5-D16 din `AZGS-MAINTENANCE-DECISION.md`.
2. Lista exactă de capabilități: sanitair/leidingen, încălzire, vloerverwarming, ventilatie/luchtdoorvoeren, componente warmtepomp, gipsplaten/metalstud și tegel-/kit-/schilderherstel, inclusiv limita dintre evaluare, diagnostic și lucrări specializate.
3. Dacă `regio Utrecht` este aria comercială corectă, cu evaluare individuală în afara ei.

**Stare Git/publicare**

- Nu s-a creat commit, nu s-a făcut push și nu s-a făcut deploy.
- `HEAD`, `origin/main` și `live/main` rămân la `1c63315`.
- ZIP-urile, `tmp/` și celelalte fișiere nelegate au rămas neatinse și nu vor fi incluse în commit.
- Pentru continuarea Grupei 5 rămâne necesar modul `ULTRA`.

### Grupa 5 — implementare locală finalizată — 3 septembrie 2026

**Rezultat:** recomandările G5-D01–G5-D16 au fost aprobate de utilizator și implementate local în NL și EN. Pagina de întreținere prezintă trei forme negociabile de colaborare, fără pachete standard, abonamente publice, capacitate rezervată, program fix, SLA sau promisiuni de intervenție. Nu s-a publicat nimic.

**Pagini implementate sau rescrise**

- `/onderhoud` și `/en/maintenance`: intervenție punctuală, întreținere planificată B2B și acord B2B pentru mai multe locații;
- `/onderhoud/schilderherstel` și `/en/maintenance/painting-repair`: conținut propriu pentru refacerea zonei directe după lucrări tehnice;
- `/onderhoud/tegelherstel` și `/en/maintenance/tile-repair`: conținut propriu pentru reparații locale delimitate;
- `/spoed` și `/en/emergency`: telefonul este traseul principal pentru evaluare, fără acceptare, sosire, remediere sau disponibilitate garantată.

**Structură comercială aplicată**

- Intervenția punctuală poate fi solicitată de B2C sau B2B; planificarea recurentă și multi-location sunt prezentate inițial numai pentru B2B.
- Sunt separate explicit scopul, excluderile, ferestrele de planificare, lucrările din afara ferestrei, materialele, accesul, autorizarea suplimentelor, raportarea și facturarea.
- Durata se stabilește individual, cu o dată finală clară; continuarea este prezentată numai printr-un acord scris nou, nu prin reînnoire automată.
- Pentru mai multe locații sunt descrise registrul locațiilor, persoanele autorizate, comenzile identificabile și referințele de raportare/facturare, fără a promite acoperire implicită sau exclusivitate.
- Aria publică rămâne Woerden/regiunea Utrecht; orice solicitare din afara ariei este evaluată individual.
- Lista de servicii este limitată la capabilitățile confirmate. Afvoer/ontstopping nu a fost adăugat ca afirmație nouă în pagina principală de întreținere.

**Siguranță juridică și contractuală**

- Formularul rămâne o cerere neobligatorie și nu încheie online un contract.
- Condițiile aplicabile, oferta, scopul, locațiile, durata, prețul și încetarea trebuie furnizate și convenite înainte de acceptare.
- Nu este introdusă nicio abatere B2C de la art. 7:758(4) BW și nicio abatere B2B ascunsă numai în condițiile generale.
- `AZGS-MAINTENANCE-DECISION.md` versiunea 1.0 consemnează aprobarea, structura, sursele oficiale și limitele.
- Înaintea folosirii contractuale rămân pentru juristul neerlandez: calificarea activităților mixte `opdracht`/`aanneming`, încetarea și remunerația, orice viitor model B2C periodic, retragerea la distanță și art. 6:230oa BW, ierarhia documentelor, limita de răspundere B2B, alinierea cu orice acoperire reală și clauzele Wkb.

**Curățarea afirmațiilor neverificate**

- Au fost eliminate din suprafața publică afirmațiile pozitive neverificate despre `24/7`, sosire aproximativ într-o oră, program fix, `35+ jaar` și `VCA`.
- JSON-LD nu mai publică ore, interval de preț, tipul `Electrician` sau serviciu de urgență permanentă neverificate.
- Textele despre urgență, încălzire, homepage, about, private, blog și `public/llms.txt` au fost aliniate cu evaluarea individuală și scope-ul confirmat.
- `scripts/extract-pages.mjs` și `scripts/extract-blog.mjs` sunt blocate implicit deoarece sursele `legacy/` conțin încă afirmații vechi; rularea cere acum opțiunea deliberată `AZGS_ALLOW_LEGACY_EXTRACT=1` după o revizuire a sursei.

**Fișiere principale modificate/create în Grupa 5**

- `content/pages/maintenance.nl.html`, `content/pages/maintenance.en.html`;
- `components/MaintenanceRepairPage.tsx` și cele patru rute painting/tile repair NL/EN;
- `content/pages/emergency.nl.html`, `content/pages/emergency.en.html`;
- `components/AudienceLanding.tsx`, `components/AdaptiveContactSection.tsx`;
- `lib/audience-services.ts`, `lib/seo.ts`, `content/pages/meta.json`, `app/globals.css`;
- textele publice conexe din `content/pages/about.*`, `home.*`, `private.*`, `heating.*`, blog și `public/llms.txt`;
- `DEPLOYMENT-README-FINAL.md`, `scripts/extract-pages.mjs`, `scripts/extract-blog.mjs`;
- `AZGS-MAINTENANCE-DECISION.md`, `AZGS-ROADMAP.md`.

**Verificări efectuate**

- `npm run lint`: trecut.
- `npx tsc --noEmit --incremental false`: trecut.
- `npm run build`: trecut; 113 pagini statice generate, 109 pagini publice exportate și CSP strict regenerat cu 1242 hash-uri unice.
- `npm run audit:export`: trecut; metadata, H1 și linkurile interne sunt valide pe toate cele 109 pagini exportate.
- Cele opt pagini principale verificate țintit au câte un H1, canonical propriu, trei alternates `nl`/`en`/`x-default` și nicio afirmație pozitivă din lista de risc.
- Sitemapul conține perechile corecte pentru pagina principală și cele patru rute dedicate de repair.
- Browser local la 375 × 812 și 1280 × 800: structură lizibilă, zero overflow orizontal, zero imagini lipsă și zero erori de consolă.
- CTA-urile painting și tiling deschid formularul cu `type=maintenance` și serviciul corect preselectat. Nu există câmp de upload și nu a fost trimis niciun formular.
- Fără consimțământ nu a fost încărcat niciun script Google Analytics; testarea nu a trimis cereri către Google sau Formspree.
- Ambele scripturi de import legacy au fost testate și se opresc implicit înainte de orice scriere.
- `git diff --check`: trecut; apar numai avertismentele Git existente despre conversia LF/CRLF.

**Planuri plătite**

- Nu este necesar niciun plan plătit pentru funcționarea acestei implementări, pentru build, SEO sau formularul fără upload.
- Un plan Formspree se reevaluează numai când devin necesare upload-uri, o cotă mai mare, retenție sau fluxuri operaționale avansate. GA4 Standard rămâne suficient; pagina de întreținere nu introduce alt serviciu plătit.

**Stare Git/publicare**

- Nu s-a creat commit, nu s-a făcut push și nu s-a făcut deploy.
- `HEAD`, `origin/main` și `live/main` rămân la `1c63315`; remote-urile sunt `origin = bojinmihai/azgs.1` și `live = bojinmihai/azgs`.
- ZIP-urile, `tmp/` și fișierele nelegate au rămas neatinse și nu vor fi incluse într-un commit viitor.
- Următoarea grupă: Grupa 6 — necesită modul `MEDIU` înainte de implementarea paginii `Werkwijze / How we work`.

### Checkpoint corectiv de domeniu B2B, mentenanță și urgențe — 3 septembrie 2026

**Acest checkpoint înlocuiește orice presupunere anterioară din Grupele 4–5 despre servicii sau arii de lucru care nu corespunde delimitării de mai jos.** Corecțiile sunt implementate și verificate local; nu s-a făcut commit, push sau deploy.

**Delimitare comercială confirmată**

- B2B: numai instalații sanitare și conducte, instalații termice/de încălzire, încălzire în pardoseală ca parte a instalațiilor termice și instalații de ventilație.
- Nu fac parte din oferta de proiect B2B: gips-carton, finisaje, lucrări electrice și lucrări la pompe de căldură.
- Aria proiectelor B2B pornește din Woerden și folosește ca repere confirmate: Breda, Tilburg și Eindhoven spre sud; Purmerend și Beverwijk spre nord; Den Haag, Rotterdam și Leiden spre vest; Lelystad și Zwolle spre est. Alte locații se analizează individual în funcție de proiect.
- Mentenanță: maximum 50 km **sau** aproximativ o oră de deplasare din Woerden, evaluat după rută și trafic.
- Urgențe: maximum 50 km **sau** aproximativ 40 de minute de condus din Woerden. Acestea sunt criterii de arie, nu SLA și nu promit timp de sosire.
- Urgențele B2B sunt evaluate numai pentru un proiect sau o instalație executată anterior de AZGS și numai pentru instalații sanitare, termice ori de ventilație.
- Denumirile de localități neclare din mesajul inițial nu au fost ghicite și nu au fost publicate în conținut.

**Implementare corectivă**

- Formularul adaptiv este acum versiunea `adaptive-contact-v4`. Selectorul B2B oferă exclusiv cele patru variante confirmate; parametrii URL incompatibili sunt eliminați și schimbarea tipului șterge serviciul și erorile vechi. Pentru cererile B2C, B2B și mentenanță, v4 adaugă confirmarea obligatorie a citirii versiunii indicate a condițiilor și o referință explicită în email; fluxul de urgență rămâne neblocat de această cerință.
- Fluxul `Spoed/Urgent request` cere contextul solicitantului. Pentru `Business / B2B — existing AZGS project` sunt disponibile numai sanitar/conducte/apă, încălzire și ventilație; telefonul rămâne acțiunea principală, fără acceptare sau răspuns garantat.
- Rutele dinamice pentru servicii și sectoare B2B au fost reunite fără conflict. Sunt generate patru servicii și șase sectoare în fiecare limbă; rutele B2B excluse, inclusiv gips-carton, răspund 404 și nu apar în sitemap.
- Textele comerciale, metadata, datele structurate, navigarea, formularul, blogul relevant și `llms.txt` separă acum explicit ariile B2B, mentenanță și urgențe.
- Condițiile B2B v1.1, articolele 1, 4 și 5, reflectă delimitarea operațională și restricția pentru urgențe. Textele și PDF-urile rămân drafturi care necesită verificarea unui jurist neerlandez înainte de utilizare contractuală.
- PDF-urile B2B NL și EN au fost regenerate, verificate structural și inspectate vizual pagină cu pagină; linkurile de descărcare răspund local cu HTTP 200 și `application/pdf`.

**Verificări finale ale checkpointului**

- `npm run lint`: trecut.
- `npx tsc --noEmit --incremental false`: trecut.
- `git diff --check`: trecut; rămân numai avertismentele Git existente privind conversia LF/CRLF.
- `npm run build`: trecut; 111 pagini statice generate, 107 pagini publice exportate și CSP strict regenerat cu 1224 hash-uri unice.
- `npm run audit:export`: trecut; metadata, structura H1 și linkurile interne sunt valide pe toate cele 107 pagini exportate.
- Verificare browser la 375 × 812: selectorul urgent B2B are numai cele trei domenii permise, eticheta scurtă este lizibilă și nu există overflow orizontal (`clientWidth = scrollWidth = 360`).
- Nu a fost trimis niciun formular real și nu a fost inițiat niciun trafic nedorit către Formspree.

**Stare și puncte rămase**

- `HEAD`, `origin/main` și `live/main` sunt toate la `1c63315`; `origin` indică `bojinmihai/azgs.1`, iar `live` indică `bojinmihai/azgs`.
- Nu s-a folosit Wrangler și nu s-a publicat nimic. ZIP-urile, restul din `tmp/` și fișierele nelegate nu sunt incluse în lucrare.
- Nu este necesar momentan niciun plan plătit. Un plan Formspree se reanalizează numai dacă vor fi cerute upload-uri, cote mai mari sau automatizări operaționale.
- Risc vizual amânat conform instrucțiunii de a nu lucra acum la fotografii: cardul B2B de ventilație folosește încă un asset al cărui nume indică o pompă de căldură. Textul și alt-ul sunt corecte, dar fotografia trebuie înlocuită într-o etapă dedicată înainte de publicarea finală.
- Următoarea grupă: Grupa 6 — selectează modul `MEDIU` înainte de implementarea paginii `Werkwijze / How we work`.

### Grupa 6 — Werkwijze / How we work — 3 septembrie 2026

**Rezultat:** pagina de proces este implementată local în neerlandeză și engleză. Procesul general are unsprezece pași, iar fiecare pas diferențiază explicit traseul Particulier/B2C, Zakelijk/B2B și Gebouwonderhoud. Nu s-a făcut commit, push sau deploy.

**Pagini create**

- `/werkwijze` — versiunea neerlandeză principală;
- `/en/how-we-work` — traducerea engleză.

**Structură și decizii aplicate**

1. Aanvraag / Request;
2. controlul informațiilor;
3. vizită tehnică numai dacă este necesară;
4. delimitarea lucrărilor, excluderilor și responsabilităților;
5. ofertă și condiții înainte de contractare;
6. planificare în funcție de acceptare, acces și dependențe;
7. execuție și coordonare în limitele scope-ului convenit;
8. controlul punctelor care aparțin lucrării atribuite;
9. recepție conform regimului contractual și legal aplicabil;
10. facturare conform bazei de preț și modificărilor convenite;
11. garanție și întreținere numai unde rezultă din lege, condițiile aplicabile sau acordul concret.

- B2B rămâne limitat strict la instalații sanitare și conducte, instalații termice inclusiv încălzirea în pardoseală și ventilație.
- Pentru mentenanță este păstrat criteriul de maximum 50 km sau circa o oră din Woerden, fără SLA.
- Secțiunea de urgență păstrează telefonul ca acțiune principală, limita de maximum 50 km sau circa 40 de minute de condus și restricția B2B la proiecte sanitare, termice sau de ventilație executate anterior de AZGS. Timpul este criteriu de arie, nu promisiune de sosire.
- Formulările evită promisiuni absolute privind acceptarea, planificarea, testele, documentația, garanția, timpii de răspuns și continuarea mentenanței.
- Fiecare rută are CTA propriu către formularul adaptiv cu `type=private`, `type=business` sau `type=maintenance`.
- Pagina include informațiile de bază utile pentru pregătirea fiecărui tip de cerere și avertizarea de a nu trimite date sensibile ori coduri de acces.
- Homepage-ul NL/EN și footerul global trimit către pagina corespunzătoare. Schimbarea limbii păstrează perechea corectă.
- Canonical, hreflang `nl`/`en`/`x-default`, metadata, breadcrumb JSON-LD și sitemap sunt configurate prin infrastructura existentă.
- Nu au fost modificate fotografiile sau pagina de proiecte.

**Fișiere modificate/create în Grupa 6**

- `components/HowWeWorkPage.tsx`;
- `app/(nl)/werkwijze/page.tsx`;
- `app/(en)/en/how-we-work/page.tsx`;
- `lib/site.ts`, `content/pages/meta.json`;
- `components/Footer.tsx`, `messages/nl.json`, `messages/en.json`;
- `content/pages/home.nl.html`, `content/pages/home.en.html`;
- `app/globals.css`;
- `AZGS-ROADMAP.md`.

**Verificări efectuate**

- `npm run lint`: trecut.
- `npx tsc --noEmit --incremental false`: trecut.
- `git diff --check`: trecut; numai avertismentele Git existente despre conversia LF/CRLF.
- `npm run build`: trecut; 113 pagini statice generate, 109 pagini publice exportate și CSP strict regenerat cu 1278 hash-uri unice.
- `npm run audit:export`: trecut; metadata, structura H1 și toate legăturile interne sunt valide pe cele 109 pagini exportate.
- Exportul conține exact 11 pași în fiecare limbă, câte un H1, canonical propriu, pereche hreflang și ambele URL-uri în sitemap.
- Browser local la 1280 × 800 și 375 × 812: rutele răspund 200, conținutul și CTA-urile sunt lizibile, legătura de limbă este corectă și nu există overflow orizontal.
- Pagina folosește elemente native pentru legături și structură semantică `ol`, `li`, `dl`, `dt`, `dd`; nu adaugă controale personalizate sau capcane de tastatură.
- Nu a fost trimis niciun formular și nu a fost generat trafic real către companie.

**Planuri plătite și publicare**

- Nu este necesar niciun plan plătit pentru această pagină, pentru build, SEO sau funcționarea CTA-urilor existente.
- Nu s-a folosit Wrangler și nu s-a publicat nimic.
- `HEAD`, `origin/main` și `live/main` rămân la `1c63315`; ZIP-urile, `tmp/` și fișierele nelegate rămân în afara oricărui commit viitor.
- Următoarea grupă: Grupa 7 — necesită modul `RIDICAT` pentru capabilities statement B2B NL/EN și PDF-urile verificate vizual.

### Grupa 7 — Capabilities statement B2B — 3 septembrie 2026

**Rezultat:** au fost create local două documente profesionale de câte două pagini, în neerlandeză și engleză, pregătite pentru trimitere prin e-mail și pentru descărcare de pe pagina Business. Nu s-a făcut commit, push sau deploy.

**Documente create**

- `output/pdf/azgs-capabilities-statement-b2b-nl-v1-0-2026-09-03.pdf` — versiunea neerlandeză principală, versiunea 1.0, 3 septembrie 2026;
- `output/pdf/azgs-b2b-capabilities-statement-en-v1-0-2026-09-03.pdf` — traducerea engleză informativă, versiunea 1.0, 3 septembrie 2026;
- copii identice pentru publicarea statică în `public/downloads/business/`.

**Conținut și decizii aplicate**

- Identitatea juridică și datele de contact sunt: AZ Grand Solutions vof, handelsnaam A-Z Grand Solutions, KvK 42064891, vestigingsnummer 000053925335, Alpenstraat 12, 3446 DN Woerden, `aanvragen@azgs.nl`, `info@azgs.nl` și +31 6 13636925.
- Capabilitățile B2B sunt limitate la instalații sanitare și conducte, instalații termice inclusiv încălzirea în pardoseală și ventilație.
- Tipurile de clienți prezentate sunt cele susținute de paginile sectoriale existente: aannemers/bouwbedrijven, vastgoedbeheerders, horeca/hotels, kantoren/winkels, VvE și installatie-/ventilatiebedrijven.
- Aria B2B este descrisă prin reperele confirmate din jurul Woerden; localitățile enumerate nu reprezintă o garanție de acceptare ori acoperire completă, iar alte locații sunt analizate individual.
- Documentele explică modul de colaborare, informațiile necesare pentru ofertare, delimitarea rolurilor și legătura către condițiile B2B.
- Certificarea, asigurarea, garanția, retenția, testarea, inspecția și documentația nu sunt prezentate drept capabilități confirmate; cerințele se verifică per proiect. Nu este promis niciun SLA public.
- O cerere urgentă B2B poate fi evaluată numai pentru o instalație sanitară, termică sau de ventilație executată anterior de AZGS.
- Ambele pagini Business includ acum butoane pentru ambele limbi, marcate pentru evenimentul anonim `b2b_document_download`; specificația analytics a fost actualizată de la „infrastructură viitoare” la document activ.

**Fișiere create/modificate în Grupa 7**

- `scripts/generate-b2b-capabilities.py`;
- `scripts/verify-b2b-capabilities.py`;
- `output/pdf/azgs-capabilities-statement-b2b-nl-v1-0-2026-09-03.pdf`;
- `output/pdf/azgs-b2b-capabilities-statement-en-v1-0-2026-09-03.pdf`;
- `public/downloads/business/azgs-capabilities-statement-b2b-nl-v1-0-2026-09-03.pdf`;
- `public/downloads/business/azgs-b2b-capabilities-statement-en-v1-0-2026-09-03.pdf`;
- `content/pages/business.nl.html`;
- `content/pages/business.en.html`;
- `AZGS-ANALYTICS-SPEC.md`;
- `AZGS-ROADMAP.md`.

**Verificări efectuate**

- Verificator PDF dedicat: trecut pentru ambele documente — exact 2 pagini, A4, aproximativ 48 KB fiecare, fonturi încorporate, metadata și limbă corecte, text extractibil și câte 4 legături active.
- Render la 144 DPI și inspecție vizuală individuală a tuturor celor 4 pagini: trecut; nu există tăieri, suprapuneri sau elemente ieșite din pagină. Directorul temporar folosit exclusiv pentru QA a fost șters după inspecție.
- `npm run lint`: trecut.
- `npx tsc --noEmit`: trecut.
- `git diff --check`: trecut; numai avertismentele Git existente despre conversia LF/CRLF.
- `npm run build`: trecut; 113 pagini statice generate, 109 pagini publice exportate și CSP strict regenerat cu 1278 hash-uri unice.
- `npm run audit:export`: trecut; metadata, structura H1 și legăturile interne sunt valide pe toate cele 109 pagini exportate.
- Ambele PDF-uri sunt copiate în exportul final și răspund local cu HTTP 200, `application/pdf` și dimensiunile corecte.
- Browser desktop: ambele pagini afișează secțiunea și atributele de tracking corecte, fără overflow orizontal.
- Browser mobil la 390 × 844: butoanele se așază vertical, au câte 52 px înălțime și nu există overflow orizontal (`clientWidth = scrollWidth = 375`).

**Planuri plătite, publicare și puncte rămase**

- Nu este necesar niciun plan plătit pentru generarea, găzduirea statică, descărcarea sau măsurarea cu consimțământ a acestor PDF-uri.
- Nu s-a folosit Wrangler și nu s-a publicat nimic. Serverul folosit pentru test a fost exclusiv local și a fost oprit.
- `HEAD`, `origin/main` și `live/main` rămân la `1c63315`; ZIP-urile, restul din `tmp/` și fișierele nelegate rămân în afara oricărui commit viitor.
- Nu există o confirmare obligatorie restantă pentru conținutul acestui statement; cerințele concrete de certificare, asigurare, garanție, testare sau documentație trebuie însă stabilite înaintea fiecărui proiect și nu sunt confirmate prin acest document.
- Următoarea grupă: Grupa 8 — necesită modul `RIDICAT` pentru verificarea surselor reale de recenzii și construirea infrastructurii fără publicarea unor recenzii neverificate.

### Grupa 8 — Recenzii reale și reputație — 3 septembrie 2026

**Rezultat:** sursele și regulile actuale au fost auditate, iar infrastructura locală pentru recenzii a fost creată cu publicarea dezactivată. Nu a fost copiat, inventat sau afișat niciun text de recenzie și nu s-a adăugat niciun rating în datele structurate.

**Audit factual**

- Repository-ul nu conținea recenzii, testimoniale, ratinguri ori dovezi de permisiune pentru publicarea unor reacții ale clienților.
- A fost identificat profilul public Werkspot `A-Z Grand Solutions in Woerden`: `https://www.werkspot.nl/profiel/a-z-grand-solutions?profileTabSelected=reviews`.
- La verificarea din 3 septembrie 2026, profilul indica 4,5/5 din 6 recenzii. Aceasta este doar o fotografie de audit, nu o valoare publicată sau garantată permanent.
- Site-ul nu are o integrare/API cu Werkspot, iar în repository nu există consimțământ separat pentru republicarea textelor, numelor ori localităților de pe platformă.
- Nu a fost identificat un link confirmat către formularul de recenzie al unui profil Google Business deținut de AZGS.
- Regulile Google actuale permit solicitarea neutră a unor recenzii reale, dar interzic stimulentele, selectarea exclusivă a clienților pozitivi și influențarea notei ori conținutului.
- Recenziile despre propria firmă controlate sau selectate de firmă sunt self-serving; `Review` și `AggregateRating` nu au fost și nu trebuie adăugate la schema `LocalBusiness`/`Organization` AZGS pentru obținerea stelelor în rezultate.
- Publicarea numelui/inițialelor, localității și textului pe site necesită o bază legală și, pentru fluxul propus, consimțământ specific, informat, documentabil și retragibil.

**Infrastructură implementată, dar nepublicată**

- `content/reviews/reviews.json`: registru unic, gol, cu `publicationEnabled=false`; păstrează numai dovada de audit a sursei, fără datele individuale ale recenzenților.
- `lib/reviews.ts`: tipurile obligatorii și filtrul care returnează zero rezultate cât timp publicarea este dezactivată.
- `components/VerifiedReviewsSection.tsx`: componentă NL/EN pregătită pentru text, nume/inițiale, localitate, tipul lucrării, dată și sursă; nu este importată în nicio pagină publică și returnează `null` fără intrări aprobate.
- `scripts/audit-reviews.mjs`: validator pentru sursă HTTPS, câmpuri complete, permisiune de publicare, verificare, aprobare, contact de retragere și absența ratingului din schema LocalBusiness.
- `package.json`: `npm run audit:reviews` și un `prebuild` care rulează automat validatorul înaintea fiecărui build.
- `AZGS-REVIEWS-WORKFLOW.md`: procesul complet, textele neutre NL/EN pentru solicitarea unei recenzii și formularul separat de consimțământ pentru republicare pe `azgs.nl`.
- `DEPLOYMENT-README-FINAL.md`: recomandările de tip „obține 5 recenzii de la clienți mulțumiți” au fost înlocuite cu un flux fără cote, stimulente sau review gating.

**Verificări efectuate**

- `npm run audit:reviews`: trecut — 0 recenzii publicabile, 1 sursă auditată, publicare dezactivată.
- `npm run lint`: trecut.
- `npx tsc --noEmit`: trecut.
- `git diff --check`: trecut; numai avertismentele Git existente privind conversia LF/CRLF.
- `npm run build`: trecut, inclusiv noul prebuild; 113 pagini statice generate, 109 pagini publice exportate și CSP strict cu 1278 hash-uri unice.
- `npm run audit:export`: trecut pentru toate cele 109 pagini exportate.
- Control direct al exportului: nu apar textele componentei, `Review`, `AggregateRating`, `reviewRating` sau `aggregateRating`.
- Paginile existente de proiecte nu au fost modificate; rămân `noindex, nofollow` și excluse din sitemap.

**Decizii necesare înainte de orice publicare a recenziilor**

1. confirmarea că profilul Werkspot aparține și este administrat de AZGS;
2. decizia dacă pe site se afișează doar o legătură spre profil sau și fragmente individuale;
3. permisiune separată și documentată de la fiecare persoană pentru textul și câmpurile exacte afișate pe `azgs.nl`;
4. verificarea termenilor platformei pentru republicarea conținutului Werkspot;
5. furnizarea linkului unic Google Business Profile, dacă profilul există și urmează să fie folosit;
6. actualizarea politicii de confidențialitate și verificarea juridică AVG înainte de activarea unei colectări directe pe site.

**Planuri plătite și publicare**

- Nu este necesar niciun plan plătit. Solicitarea prin e-mail, funcțiile native Werkspot și linkul/QR-ul oferit de Google Business Profile pot funcționa fără o platformă comercială suplimentară.
- Un serviciu plătit ar merita analizat numai dacă volumul viitor impune automatizări, sincronizare multi-platformă, moderare sau management centralizat al consimțămintelor.
- Nu s-a făcut commit, push sau deploy și nu s-a folosit Wrangler. Site-ul live rămâne neschimbat.
- `HEAD`, `origin/main` și `live/main` rămân la `1c63315`; ZIP-urile, restul din `tmp/` și fișierele nelegate rămân în afara oricărui commit viitor.
- Următoarea grupă: Grupa 9 — necesită modul `MAXIM` pentru auditul tehnic complet, inventarul exact al modificărilor, pregătirea pre-deploy și publicarea prin GitHub numai după prezentarea conținutului ce urmează să fie publicat.

### Grupa 9 — manifestul release-candidat și auditul final — 3 septembrie 2026

**Rezultat local:** release-candidatul care reunește Grupele 0–9 este pregătit pentru commit și publicare prin GitHub. Acest manifest este înghețat înaintea commitului; SHA-ul rezultat și verificarea HTTP post-deploy se consemnează în handofful final al sesiunii. Nu se folosește Wrangler.

**Conținutul release-candidatului**

- pachetul juridic B2C și B2B NL/EN, cu versiuni, date, formulări pentru ofertă, avertismente privind revizuirea juridică și patru PDF-uri descărcabile;
- formularul adaptiv `adaptive-contact-v4` pentru Particulier, Zakelijk/B2B, Gebouwonderhoud și Spoed, fără upload și cu test local care nu contactează Formspree; cererile de ofertă includ confirmarea citirii condițiilor și versiunea consultată;
- analytics GA4 condiționat de consimțământ, evenimente allowlist și atribuție redusă la categorii fără PII;
- pagina Business și cele șase pagini sectoriale bilingve, cu B2B limitat exclusiv la instalații sanitare/conducte, termice inclusiv încălzire în pardoseală și ventilație;
- delimitarea separată a proiectelor B2B, mentenanței și urgențelor, inclusiv ariile confirmate și lipsa unui SLA public;
- pagina de mentenanță, cele patru rute de repair NL/EN și documentul de decizii comerciale;
- paginile `Werkwijze` / `How we work`;
- capability statement B2B NL/EN și cele două PDF-uri descărcabile;
- infrastructura pentru recenzii reale, cu registru gol, `publicationEnabled=false` și fără `Review`/`AggregateRating`;
- auditul final integrat în build, CSP per pagină și fallback 404, headere de securitate, redirecturi limitate la originea canonică și documentație de release actualizată.

**Întăriri și corecții finale**

- Next.js și configurația aferentă au fost actualizate la ramura corectată `15.5.25`; dependențele tranzitive vulnerabile au fost actualizate, iar auditul npm raportează zero vulnerabilități.
- Footerul generic nu mai amestecă o listă de servicii B2C cu traseul B2B; trimite acum separat către Particulier, B2B, Gebouwonderhoud și Spoed. Footerul Business păstrează numai cele patru categorii B2B aprobate.
- `scripts/audit-final.mjs` verifică exportul complet: limbă, metadata, H1, canonical, hreflang reciproc, Open Graph, sitemap, robots, linkuri și assets locale, formulare, absența scripturilor externe pre-consimțământ, JSON-LD, PDF-uri, redirecturi, headere și CSP.
- Middleware-ul generat aplică politica CSP a paginii 404 și răspunsurilor 404 pentru rute necunoscute; simularea locală confirmă CSP și `nosniff` atât pentru o rută 200, cât și pentru un răspuns 404.
- Redirectul wildcard `/nl/*` are destinație absolută sub `https://azgs.nl/`, iar auditul respinge viitoare wildcarduri care nu rămân pe originea canonică.
- `.gitignore` exclude explicit arhivele `*.zip` și `tmp/`, pe lângă `.next/`, `out/` și middleware-ul generat.
- Politicile de cookies/confidențialitate precizează corect că Google Maps se poate încărca numai pe pagina Contact, după acțiune explicită.

**Verificări ale release-candidatului**

- `npm run lint`: trecut.
- `npx tsc --noEmit --incremental false`: trecut.
- `npm audit`: trecut, `0 vulnerabilities`.
- `npm run build`: trecut cu Next.js `15.5.25`; 113 pagini statice generate, 109 pagini publice exportate, 103 kB JavaScript partajat și 1279 hash-uri CSP unice.
- auditul final integrat: trecut pentru 109 pagini, 104 URL-uri sitemap, 196 blocuri JSON-LD, 4373 legături interne, 2478 referințe la assets locale și 6 PDF-uri publice; zero avertismente.
- `npm run audit:export`: trecut pentru toate cele 109 pagini.
- verificatorul juridic: trecut pentru 4 PDF-uri și copiile publice, 7/7/8/8 pagini.
- verificatorul capability statement: trecut pentru 2 PDF-uri și copiile publice, 2 pagini și 4 linkuri fiecare.
- `git diff --check`: trecut; apar numai notificările Windows existente despre conversia LF/CRLF.
- browser desktop și mobil: fără overflow orizontal, navigare mobilă închisă cu `Escape` și focus returnat, servicii B2B corecte, formular validat fără solicitare reală, zero scripturi GA înainte de consimțământ.
- scanarea standard de securitate a închis 52 de suprafețe de review, cu acoperire completă și zero constatări raportabile. Întăririle 404 și wildcard au fost validate separat după scanare.

**Remote-uri și excluderi confirmate înainte de commit**

- ramura este `main`;
- `origin = https://github.com/bojinmihai/azgs.1.git`;
- `live = https://github.com/bojinmihai/azgs.git`;
- după `git fetch`, `HEAD`, `origin/main` și `live/main` sunt toate la `1c63315` înaintea noului commit; ambele remote-uri trebuie sincronizate cu același release;
- nu intră în commit `azgs-production-20260831.zip`, `out.zip`, `tmp/`, `.next/`, `out/`, middleware-ul generat sau alte artefacte locale fără legătură;
- intră numai sursele, documentația, scripturile de audit/generare/verificare și cele 12 copii intenționate ale celor șase PDF-uri din `output/pdf/` și `public/downloads/`.

**Puncte externe care rămân după publicare**

- documentele juridice sunt drafturi profesionale, nu sunt prezentate drept aprobate; revizuirea de către un jurist neerlandez rămâne necesară înainte de utilizarea contractuală;
- trebuie confirmate în dashboard setările Formspree pentru destinatari, domeniu, spam, cotă și retenție și setările GA4 pentru Enhanced Measurement, Signals, legături publicitare, redacție, partajare și retenție;
- nu este necesar acum un plan plătit. Formspree plătit se reevaluează numai dacă limita reală, uploadurile sau automatizările devin necesare; GA4 Standard și găzduirea statică actuală sunt suficiente pentru implementarea verificată;
- fotografiile și pagina de proiecte rămân în afara acestei lucrări, conform instrucțiunii explicite; asseturile existente nu au fost înlocuite în acest release.

### Grupa 9 — checkpoint final publicat — 3 septembrie 2026

**Status:** Grupele 0–9 sunt finalizate și publicate exclusiv prin GitHub. Nu s-a folosit Wrangler.

**Commituri de producție**

- `7e1f19f96383ff2d45a0d7824fc565f888be6dc6` — release-ul bilingv complet, documentele juridice și comerciale, formularul adaptiv, analytics, paginile B2B/mentenanță/werkwijze, infrastructura pentru recenzii și auditul final;
- `668e20f2ec5f7875ee273eeb27ed63b94178fe96` — corecția post-deploy de accesibilitate: paletă separată pentru text portocaliu, stări hover conforme și benzi CTA comerciale cu contrast ridicat și layout responsive;
- commitul care conține acest checkpoint modifică numai `AZGS-ROADMAP.md`; SHA-ul său poate fi citit cu `git log -1 --format=%H` la reluarea lucrării.

Ambele commituri de producție sunt sincronizate identic pe:

- `origin/main` — `https://github.com/bojinmihai/azgs.1.git`;
- `live/main` — `https://github.com/bojinmihai/azgs.git`.

Arhivele ZIP, `tmp/`, `.next/`, `out/`, middleware-ul generat și fișierele locale fără legătură au rămas în afara commiturilor.

**Verificări finale locale**

- `npm run lint`: trecut;
- `npx tsc --noEmit --incremental false`: trecut;
- `npm audit`: trecut, zero vulnerabilități;
- `npm run build`: trecut cu Next.js `15.5.25`, 113 pagini statice generate și 109 pagini publice exportate;
- audit final integrat: 104 URL-uri în sitemap, 196 blocuri JSON-LD, 4373 legături interne, 2478 referințe la assets locale, 6 PDF-uri publice și zero avertismente;
- `npm run audit:export`: trecut pe toate cele 109 pagini;
- verificator PDF juridic: trecut pentru cele patru documente și copiile publice, 7/7/8/8 pagini;
- verificator capability statement: trecut pentru ambele documente și copiile publice, câte două pagini și patru linkuri active;
- scanare standard de securitate `4147c9b8-e212-4d5d-a75e-1bd045cee5e6`: acoperire completă, 52 suprafețe închise și zero constatări raportabile;
- verificarea de contrast după patch a trecut fără abateri pe paginile reprezentative Business, Services, How we work, B2C terms, Blog, Maintenance și Emergency.

**Verificări post-deploy**

- paginile NL/EN principale, juridice, sectoriale, Business, Maintenance, Emergency și How we work au răspuns `200`, au câte un H1, canonical propriu, perechi hreflang reciproce și fără overflow orizontal în controalele desktop/mobil;
- serviciile formularului B2B sunt limitate la instalații sanitare și conducte, instalații termice, încălzire în pardoseală ca instalație termică și ventilație; validarea formularului a fost testată fără trimiterea unei solicitări reale;
- toate cele șase PDF-uri publice răspund `200 application/pdf`, cu dimensiunile locale așteptate;
- sitemap-ul și robots.txt răspund `200`; o rută inexistentă răspunde `404` și păstrează CSP plus `X-Content-Type-Options: nosniff`;
- paginile HTML păstrează HSTS, CSP strict pe pagină, `script-src-attr 'none'`, `object-src 'none'`, COOP, CORP, Permissions Policy, Referrer Policy și protecția anti-framing;
- analytics rămâne neîncărcat înainte de consimțământ, iar retragerea consimțământului elimină încărcarea GA la reîmprospătare;
- controlul live de contrast a trecut fără abateri detectate pe zece pagini NL/EN reprezentative după activarea bundle-ului CSS din commitul `668e20f`.

**PageSpeed Insights — măsurători de laborator din 3 septembrie 2026**

- homepage mobil: performanță 95, accesibilitate 100, bune practici 100, SEO 100; FCP 1,1 s, LCP 3,0 s, TBT 0 ms, CLS 0, Speed Index 1,1 s;
- homepage desktop: 100/100/100/100; FCP 0,3 s, LCP 0,6 s, TBT 0 ms, CLS 0, Speed Index 0,3 s;
- Business mobil după corecția de contrast: 98/100/100/100; FCP 1,1 s, LCP 2,3 s, TBT 50 ms, CLS 0, Speed Index 2,6 s — raport `https://pagespeed.web.dev/analysis/https-azgs-nl-zakelijk/5q1ckaz4tn?form_factor=mobile`.

Nu există încă suficiente date reale de utilizator (CrUX); scorurile de mai sus sunt rezultate Lighthouse de laborator și pot varia. Oportunitățile rămase sunt mici: aproximativ 41 KiB la livrarea imaginilor, 12 KiB CSS nefolosit și 11 KiB JavaScript vechi în auditul Business. Nu justifică un plan plătit și nu blochează lansarea.

**Confirmări externe care rămân necesare**

1. revizuirea documentelor juridice de către un jurist neerlandez înainte de utilizarea contractuală; documentele nu sunt prezentate drept aprobate juridic;
2. verificarea în dashboardul Formspree a destinatarilor, domeniului, protecției spam, cotei și retenției înainte de promovarea intensă a formularului;
3. verificarea în GA4 a Enhanced Measurement, Google Signals, legăturilor publicitare, redacției datelor, partajării și retenției;
4. confirmarea sursei, drepturilor și consimțământului înainte de publicarea oricărei recenzii; infrastructura rămâne dezactivată și fără date inventate;
5. deciziile comerciale documentate pentru contractele de mentenanță și orice SLA; nu există timpi publici garantați;
6. fotografiile și pagina de proiecte rămân intenționat pentru o etapă separată.

**Planuri plătite**

Nu este necesar acum niciun plan plătit pentru funcționarea implementării publicate. Un plan Formspree plătit devine justificat numai dacă volumul real depășește cota gratuită ori sunt aprobate uploaduri/automatizări; alte servicii plătite se evaluează numai după apariția unei nevoi măsurabile. Grupa 9 este ultima grupă din acest roadmap, deci nu există un mod de gândire următor obligatoriu.

### Vizibilitate organică, SEO local și GA4 — checkpoint local pre-publicare — 3 septembrie 2026

**Status:** auditul extern și release-candidatul local sunt finalizate. Modificările de mai jos nu sunt încă în commit și nu sunt publicate. Site-ul live, `HEAD`, `origin/main` și `live/main` rămân la `2002b9ee4256b16409b2d42ee0315749ab4795cd` înaintea publicării acestei etape. Google Ads este exclus și contul vechi nu a fost modificat ori șters.

**Rezultat și decizii asumate**

- GA4 are acum pageviews manuale pentru navigarea Next.js, `send_page_view=false`, atribuire first-touch sigură, origine CTA și categorie separată pentru Google Business Profile. Scriptul se poate încărca numai pe `azgs.nl`/`www.azgs.nl` și numai după acceptare.
- Formularul include câmpurile tehnice de atribuire numai cu consimțământ analytics activ. Nicio valoare liberă introdusă de utilizator și niciun URL cu query nu este trimis către GA4.
- Redirectul automat bazat pe limba browserului a fost eliminat; selectorul explicit și hreflang rămân.
- Cele șase pagini duplicate de finisare `/particulier/...` și `/en/private/...` au fost consolidate prin 301 către URL-urile scurte deja indexate. Linkurile interne și sitemapul folosesc numai destinațiile canonice.
- Entitatea `LocalBusiness` folosește handelsnaam `A-Z Grand Solutions`, păstrează identitatea juridică și elimină două proprietăți Schema.org neaplicabile tipului. Serviciile continuă să fie descrise în nodurile `Service` dedicate.
- Footerul afișează NAP compact `A-Z Grand Solutions · Woerden`, fără a afirma că adresa este un punct public de lucru. Titlurile blog NL/EN sunt distincte, iar dimensiunile Open Graph nu mai sunt declarate fals pentru imaginile 4:3.
- Sitemapul are `lastmod` pentru conținutul modificat. Release-candidatul conține 98 URL-uri canonice, față de 104 înainte de eliminarea duplicatelor.
- Raza B2C istorică de aproximativ 60 km a fost lăsată neschimbată. Este separată de mentenanță — maximum 50 km sau circa 1 oră — și de urgențe — maximum 50 km sau circa 40 de minute. B2B rămâne limitat la sanitar/conducte, instalații termice inclusiv încălzire în pardoseală și ventilație, cu urgență numai pentru instalații executate de AZGS.
- Specificațiile analytics/formular, politicile de cookies/confidențialitate NL/EN și documentul separat `AZGS-VISIBILITY-ROADMAP.md` reflectă implementarea și acțiunile externe rămase.

**Verificări**

- `npm run lint`: trecut;
- `npx tsc --noEmit --incremental false`: trecut;
- `npm audit`: zero vulnerabilități;
- `npm run build`: trecut — 103 pagini publice, 98 URL-uri sitemap, 184 blocuri JSON-LD, 4.205 legături interne, 2.322 referințe la assets locale, 6 PDF-uri și zero avertismente;
- `npm run audit:export`: trecut pentru toate cele 103 pagini;
- `git diff --check`: trecut; numai notificările Windows LF/CRLF;
- test local browser: accept/refuz analytics, pageview inițial și SPA, eliminarea query-ului, formular cu/fără câmpuri de atribuire și rutele NL/EN; nicio trimitere Formspree și niciun request GA4 real.

**Fișierele release-candidatului**

- analytics și formular: `lib/analytics.ts`, `components/AnalyticsTracker.tsx`, `components/CookieConsent.tsx`, `components/AdaptiveContactSection.tsx`;
- SEO și navigare: `app/sitemap.ts`, `lib/seo.ts`, `lib/site.ts`, `components/Header.tsx`, `components/Footer.tsx`, `app/(nl)/page.tsx`, `components/LanguageSwitcher.tsx`, eliminarea `components/LanguageDetect.tsx`, paginile blog NL/EN și `public/_redirects`;
- sunt eliminate numai cele șase surse duplicate de pagină pentru schilderwerk/painting, parket/parquet și tegelwerk/tiling sub prefixele Particulier/Private;
- documentație și transparență: `AZGS-ANALYTICS-SPEC.md`, `AZGS-FORM-SPEC.md`, `AZGS-VISIBILITY-ROADMAP.md`, acest checkpoint și politicile cookies/privacy NL/EN.

**Poarta înainte de publicare și modificări externe**

1. se prezintă și se aprobă exact acest release, apoi se verifică prin fetch dacă `origin/main` și `live/main` sunt încă sincronizate;
2. publicarea se face prin commit pe `main` și push către ambele remote-uri GitHub, fără Wrangler și fără ZIP, `tmp/`, `out/`, `.next/` ori alte fișiere nelegate;
3. după deploy se verifică răspunsurile HTTP, conținutul, redirecturile și sitemapul live;
4. apoi se actualizează controlat Search Console, GA4 și Google Business Profile; Bing/Apple se configurează numai după autentificarea potrivită;
5. înainte de schimbarea adresei în Google Business Profile trebuie confirmat dacă la Alpenstraat 12 există prezență și semnalizare permanentă și dacă sunt primiți clienți în programul publicat.

Nu este necesar un plan plătit pentru această etapă. Modul `ULTRA` selectat este suficient și pentru poarta de publicare/configurare; Google Ads va fi evaluat separat, pe baza datelor organice și a nevoii reale.

### Vizibilitate organică, SEO local și GA4 — checkpoint post-publicare și configurare externă — 3 septembrie 2026

**Status:** release-ul din commitul `c88ea5d360937a271ed2503b47eb5e367745800c` este publicat și verificat live. Înaintea acestui patch documentar, `HEAD`, `origin/main` și `live/main` indicau toate același commit, iar worktree-ul Codex era curat și detașat exact la acel commit. Publicarea s-a făcut exclusiv prin GitHub; nu s-a folosit Wrangler. Google Ads și orice cheltuială publicitară rămân în afara acestei etape.

**Verificări live ale release-ului**

- Homepage-urile `/` și `/en` răspund `200`.
- Sitemapul conține 98 de elemente `loc` și 98 de elemente `lastmod`: 88 de pagini statice au data `2026-09-03`, iar cele 10 articole își păstrează datele proprii.
- Cele șase surse duplicate răspund `301` spre destinațiile canonice: `/particulier/schilderwerk` spre `/schilderwerk`, `/particulier/parket` spre `/parket`, `/particulier/tegelwerk` spre `/tegelwerk`, `/en/private/painting` spre `/en/painting`, `/en/private/parquet` spre `/en/parquet` și `/en/private/tiling` spre `/en/tiling`.
- Titlurile blog sunt `Installatie- en renovatieblog | AZ Grand Solutions` și `Installation and renovation blog | AZ Grand Solutions`.
- Canonical, hreflang, footerul `A-Z Grand Solutions · Woerden`, CSP și headerele de securitate au conținutul așteptat.
- Înainte de consimțământ nu există request sau script GA4.

**Search Console și IndexNow**

- `https://azgs.nl/sitemap.xml` a fost retrimis la 3 septembrie 2026. Ultima citire este din aceeași zi, starea este `Succes`, iar raportul afișează 98 de pagini și 0 videoclipuri descoperite.
- Recrawl-ul a fost solicitat cu dialog de succes pentru zece URL-uri prioritare: `/`, `/en`, `/blog`, `/en/blog`, `/schilderwerk`, `/parket`, `/tegelwerk`, `/en/painting`, `/en/parquet` și `/en/tiling`.
- La inspecție, nouă URL-uri erau indexate. `/en` era neindexat ca duplicat, cu canonical declarat `/en` și canonical ales de Google `/`; situația trebuie monitorizată după recrawl fără schimbarea pripită a canonicalului declarat.
- Nu s-au folosit Removals și nu s-a pornit Validate Fix pentru redirecturi sau canonical.
- IndexNow a primit două submituri: 98 de URL-uri canonice și, separat, cele șase surse 301. Ambele au răspuns HTTP `200`, pentru 104 URL-uri transmise în total. Răspunsul confirmă acceptarea solicitărilor, nu crawlarea sau indexarea.

**GA4 — configurare confirmată și limitele testului**

- Fluxul web `azgs.nl` are ID `12841759030` și meetcode `G-DK6FZHQRCB`.
- Enhanced Measurement master este activ. Au rămas active numai `Page loads` și `Scrolls`; `Browser history events`, `Outbound clicks`, `Site search`, `Form interactions`, `Video engagement` și `File downloads` sunt dezactivate.
- Redacția adreselor de e-mail și redacția parametrilor URL sunt active. Query redaction folosește exact 19 chei: `name`, `email`, `email_address`, `phone`, `contact_method`, `company`, `organization`, `contact_role`, `kvk`, `project_location`, `postcode`, `postal_code`, `address`, `planning_notes`, `message`, `first_name`, `last_name`, `firstname` și `lastname`.
- Google Signals este dezactivat. Personalizarea publicitară este dezactivată global pentru toate cele 307 regiuni, iar codul păstrează parametrii `ad_*` refuzați.
- Există două asocieri Google Ads legacy preexistente, una afișată cu personalizare activă la nivelul legăturii și una cu personalizare dezactivată. Au rămas neatinse conform domeniului aprobat și nu s-a creat nicio asociere Ads nouă.
- Au fost create exact 12 dimensiuni custom event-scoped: `content_language`, `audience_context`, `service_context`, `request_type`, `business_sector`, `contact_location`, `document_type`, `document_audience`, `traffic_source`, `traffic_medium`, `entry_page` și `cta_origin`.
- Asocierea Search Console a fost creată la 3 septembrie 2026 între proprietatea Domain `azgs.nl` și fluxul web `azgs.nl`, ID `12841759030`.
- Testul Realtime/DebugView nu este finalizat. Browserul public păstra consimțământul în starea `rejected`, site-ul nu oferă o interfață pentru redeschiderea bannerului, iar browsere separate Chrome/Edge nu au fost disponibile. Realtime a rămas la 0 și nu s-a transmis nimic.
- `generate_lead` nu a fost observat și nu a fost marcat drept key event. Data sharing, transferurile, rolurile contractuale și data-processing terms rămân pentru un audit read-only ulterior.

**Google Business Profile**

- Categoria principală `Instalator`, adresa Alpenstraat 12 și programul luni–vineri 08:00–17:00, cu weekendul închis, au rămas neatinse.
- Descrierea aprobată, de 643 de caractere și fără afirmația „24/7”, este publicată integral și a fost confirmată prin readback. URL-ul `https://azgs.nl/?utm_source=google_business_profile&utm_medium=organic&utm_campaign=local_profile` este valoarea curentă publicată în profil.
- Ariile generale Țările de Jos și Noord-Brabant au fost eliminate. Profilul afișează exact 14 localități normalizate: Lopik, Utrecht, Woerden, Zegveld, Montfoort, Oudewater, Bodegraven, Nieuwegein, IJsselstein, Kamerik, Reeuwijk, Harmelen, Nieuwkoop și Breukelen.
- Serviciul neconfirmat `Instalare încălzitoare de apă` a fost eliminat. Au rămas `Detectare scurgeri instalații`, `Instalare robineți`, `Instalare toalete`, `Montaj sisteme de duș`, `Reparare țevi`, `Reparații robinete` și `Reparații toalete`.
- Adresa nu a fost modificată sau ascunsă. Decizia rămâne deschisă până la răspunsul factual privind primirea clienților, semnalizarea permanentă și prezența în programul publicat.

**Bing și Apple**

- Bing Webmaster Tools a rămas neautentificat; nu s-a făcut importul din Search Console și nu s-a modificat sitemapul în cont. Bing Places nu a fost început.
- Din 14 aprilie 2026, Apple Business Connect, Apple Business Manager și Apple Business Essentials sunt consolidate în `Apple Business`, la `https://business.apple.com/`. Apple Business nu a fost început.
- O organizație și un brand de tip `Single brand` pot fi create înainte de decizia adresei. O locație Apple Maps se creează sau se revendică numai după confirmarea unei locații fizice reale unde sunt serviți clienții; regulile Google despre service areas ori ascunderea adresei nu sunt transpuse în lipsa unui echivalent documentat de Apple.

**Decizii și verificări rămase**

1. monitorizarea alegerii canonical pentru `/en` după recrawl;
2. un test GA4 controlat în Realtime/DebugView, fără PII și fără lead nedorit, urmat de marcarea `generate_lead` numai după observarea și verificarea unui eveniment real;
3. auditul read-only GA4 pentru Data sharing, transferuri, roluri și termenii de prelucrare;
4. răspunsul factual despre condițiile fizice ale adresei Google Business Profile; readback-ul celorlalte câmpuri aprobate este finalizat;
5. autentificarea potrivită pentru Bing Webmaster Tools/Bing Places și un cont Apple destinat companiei înaintea configurării lor;
6. asocierile Google Ads legacy rămân neatinse până la evaluarea separată; nu se creează campanii, iar fotografiile și pagina de proiecte rămân în afara acestei etape.

Nu este necesar acum niciun plan plătit. GA4 Standard și instrumentele organice folosite sunt suficiente pentru starea verificată.

### Follow-up cookies, Google Business Profile, Google Ads și Apple Business — 3 septembrie 2026

**Status:** răspunsurile factuale ale utilizatorului au fost aplicate în profilul Google și într-un release-candidat local. Auditul Google Ads a fost urmat, cu aprobarea explicită a utilizatorului, de migrarea plătitorului către VOF. Nu s-a activat nicio campanie, nu s-a introdus buget și nu s-a produs nicio cheltuială publicitară.

**Publicare și verificare:** release-ul funcțional din commitul `2ad089c` a fost împins pe `origin/main` și `live/main`, apoi confirmat pe `azgs.nl`. Refuzul cookies păstrează navigarea și GA4 oprit, setările se redeschid din footer, paginile Contact NL/EN afișează explicit că sediul nu primește clienți, iar integrarea Google Maps nu mai este prezentă.

**Cookies și analytics**

- `Refuz` păstrează site-ul complet utilizabil și nu încarcă GA4. Acceptarea și refuzul rămân opțiuni egale.
- Footerul oferă permanent `Cookie-instellingen` / `Cookie settings`; redeschiderea nu schimbă automat alegerea existentă, iar utilizatorul poate închide setările păstrând-o.
- Starea curentă este expusă accesibil, focusul este administrat pentru tastatură, iar bannerul rămâne utilizabil la zoom mare sau pe viewport scund.
- Textele cookies și privacy NL/EN descriu comportamentul real. Testul local nu trimite trafic către GA4 și nu trimite formularul.

**Google Business Profile**

- Utilizatorul a confirmat că AZGS nu primește clienți la sediu. Afișarea adresei Alpenstraat 12 a fost dezactivată în cont, iar readback-ul editorului confirmă `Fără locație. Doar livrări și servicii la domiciliu`.
- Paginile Contact și Despre noi, precum și cardul de contact NL/EN, identifică Alpenstraat exclusiv drept adresă de înregistrare și precizează că nu este o locație pentru vizite ale clienților. Harta și CTA-ul de localizare au fost eliminate pentru a nu transmite un semnal contradictoriu de storefront; politicile cookies/privacy au fost aliniate la eliminarea integrării Google Maps.
- Cele 14 zone de servicii au rămas neschimbate. Verificarea ulterioară în rezultatul public Google confirmă că strada nu mai este afișată și că profilul prezintă numai zona deservită.
- Programul luni–vineri 08:00–17:00 a rămas neschimbat și este confirmat de utilizator drept intervalul obișnuit de disponibilitate telefonică pentru clienți. Acesta poate susține programul unui service-area business, dar nu justifică afișarea adresei ca storefront.
- Semnalizarea permanentă ar fi însemnat numele firmei afișat fizic pe un panou fix. Clarificarea nu mai este necesară pentru decizia actuală, deoarece lipsa primirii clienților impune oricum ascunderea adresei.

**Google Ads — decizie de cont și migrare a plătitorului**

- La începutul auditului, contul existent era activ și afișa verificarea advertiserului finalizată pentru vechea entitate; moneda și fusul orar sunt potrivite pentru AZGS, iar istoricul este util. Toate campaniile sunt oprite sau eliminate, iar auditul și migrarea plătitorului nu au produs cheltuieli.
- Google Ads raportează 0 leaduri pentru perioada auditată, dar conversiile nu sunt validate; acest rezultat nu dovedește că firma nu a primit leaduri reale.
- Decizia este reutilizarea candidatului vechi auditat, nu crearea imediată a unuia nou. Istoricul contului rămâne consultabil, însă campaniile nou-create sau copiate nu moștenesc metricile și învățarea vechilor strategii de licitare.
- Profilul de plăți, verificarea și metoda bancară existente la începutul auditului aparțineau ZZP-ului închis. Soldul vechi a fost confirmat la zero, iar utilizatorul a aprobat finalizarea `Change who pays` în contul Ads existent, astfel încât istoricul să fie păstrat.
- Google confirmă acum un profil nou `Organization` pentru `AZ Grand Solutions vof`, cu țara, denumirea juridică și adresa corecte. Utilizatorul a introdus direct BTW/VAT ID și datele contului bancar al VOF; documentația nu păstrează identificatori fiscali, bancari sau de profil.
- Contul bancar nou este metoda principală, dar verificarea manuală este încă în așteptare. După apariția microtranzacției Google, suma exactă trebuie confirmată în metodele de plată. Google a confirmat schimbarea plătitorului și va trimite prin e-mail pașii pentru reverificarea advertiserului cu documentele VOF și ale reprezentantului autorizat.
- Auditul a acoperit contul autentificat accesibil, nu ambele asocieri legacy observate în GA4. Orice relansare rămâne blocată până la verificarea tuturor accesărilor, confirmarea legăturii GA4 exacte și a setărilor sale de personalizare, testarea reală a `generate_lead` și aprobarea separată a structurii, zonelor, cuvintelor-cheie, negative keywords, bugetului și limitei de cost per lead.

**Apple Business și pașii rămași**

- AZGS nu are încă un cont Apple Business. Înscrierea începe la `business.apple.com` cu o adresă de e-mail de business controlată de companie; fluxul creează administratorul inițial, apoi urmează verificarea organizației și brandul `Single brand`.
- Alpenstraat 12 nu va fi publicată drept locație Apple Maps unde sunt primiți clienți. Nu presupunem că Apple oferă un echivalent al profilului Google de tip service-area business.
- Programul telefonic obișnuit este confirmat. Pentru Google Ads rămân confirmarea contului bancar, reverificarea advertiserului, verificarea tuturor accesărilor și validarea conversiilor; transferul plătitorului către VOF este finalizat. Comportamentul cookie și ascunderea publică a adresei au fost verificate live.
- Fotografiile și pagina de proiecte rămân intenționat pentru ultima etapă, cu verificarea atentă a sursei, drepturilor și conținutului înainte de publicare.

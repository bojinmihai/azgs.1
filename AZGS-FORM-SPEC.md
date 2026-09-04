# AZ Grand Solutions — specificație formular adaptiv

Ultima actualizare: 4 septembrie 2026
Stare: implementat local în Grupa 2; fără trimitere reală și fără publicare

## Scop și reguli

- Formularul folosește endpointul centralizat din `lib/site.ts`: `https://formspree.io/f/xjgjryzn`.
- Sunt disponibile patru rute: `private`, `business`, `maintenance`, `emergency`.
- Câmpurile unei rute inactive nu sunt randate și nu intră în validare sau în payload.
- Valorile tehnice sunt identice în NL și EN; numai etichetele sunt traduse.
- Formularul nu stochează drafturi în browser și nu pune date personale în URL.
- Trimiterea formularului nu reprezintă acceptarea condițiilor generale și nu încheie o convenție.
- Formularul nu este prezentat ca un canal de urgență monitorizat. Telefonul este acțiunea principală pentru `emergency`.

## Matrice de câmpuri

### Comun

- `request_type`: obligatoriu; `private`, `business`, `maintenance` sau `emergency`.
- `name`: obligatoriu.
- `email`: obligatoriu pentru private/business/maintenance; pentru emergency este suficient email sau telefon.
- `phone`: opțional; împreună cu email formează contactul minim pentru emergency.
- `message`: obligatoriu, maximum 3.000 caractere.
- `subject`, `form_version`, `language`: câmpuri tehnice controlate de aplicație, fără PII.
- versiunea curentă a structurii este `adaptive-contact-v4`.
- `terms_read_confirmation`: checkbox obligatoriu pentru `private`, `business` și `maintenance`; valoarea descriptivă confirmă în notificarea Formspree că solicitantul a bifat citirea condițiilor. Nu este randat pentru formularul secundar `emergency`.
- `terms_documents`: referință tehnică fără PII către documentul și versiunea afișate: B2C v1.0, B2B v1.1 sau ambele pentru mentenanță.
- `origin_page`, `entry_page`, `cta_origin`: numai căi interne sigure, fără query sau fragment; sunt incluse numai dacă utilizatorul a acceptat analytics.
- `traffic_source`, `traffic_medium`, `campaign_present`, `referrer_type`: categorii fixe, fără valori UTM libere sau URL extern complet; sunt incluse numai cu consimțământ analytics activ, iar specificația este în `AZGS-ANALYTICS-SPEC.md`.
- `business_sector`: apare numai pentru CTA-urile B2B sectoriale și numai pentru una dintre cele șase valori fixe din allowlist; valori query necunoscute sunt ignorate.
- `_gotcha`: honeypot Formspree.

### Particulier/B2C

- locul sau codul poștal, opțional și fără adresă completă;
- serviciul principal, obligatoriu;
- perioada dorită, opțională;
- descrierea situației.

### Zakelijk/B2B

- companie, obligatoriu;
- persoană de contact, obligatoriu; rol și KvK opționale;
- locul/codul poștal al proiectului, tipul clădirii și lucrările, obligatorii;
- faza proiectului și perioada dorită, obligatorii;
- planning/randvoorwaarden, opțional;
- existența desenelor/documentelor, obligatorie ca informație, fără upload;
- colaborare punctuală, recurentă sau de discutat.
- selectorul de servicii este limitat strict la patru categorii confirmate: instalații sanitare și conducte (`plumbing`), instalații termice (`heating`), încălzire în pardoseală ca instalație termică (`underfloor-heating`) și ventilație (`ventilation-climate`);
- B2B nu oferă în formular electricitate, gips-carton/metalstud, zugrăveli, placări ceramice, parchet, combinații generale de lucrări sau alte capabilități neconfirmate.
- formularul afișează aria B2B separată, cu reperele confirmate Breda, Tilburg, Eindhoven, Purmerend, Beverwijk, Den Haag, Rotterdam, Leiden, Lelystad și Zwolle; fiecare locație și orice alt oraș rămân supuse evaluării proiectului.

### Gebouwonderhoud

- organizație/beheerder, opțional;
- hoedanigheid, tip clădire, loc/cod poștal și intervalul numărului de locații, obligatorii;
- serviciu, urgență, acces și tipul întreținerii, obligatorii;
- perioada dorită, opțională;
- limita afișată este maximum 50 km sau aproximativ o oră de deplasare din Woerden, evaluată per rută și trafic; nu este timp de reacție ori sosire;
- nu se solicită coduri de alarmă, chei sau alte informații de securitate.

### Spoed

- butonul de telefon apare înaintea câmpurilor;
- formular secundar scurt: nume, minimum email sau telefon, hoedanigheid (`private`, `maintenance` sau `business-existing`), tip problemă, loc aproximativ și mesaj;
- pentru `business-existing`, formularul afișează numai sanitare/leidingwerk, instalația termică și ventilația și precizează că proiectul sau instalația trebuie să fi fost executată anterior de AZGS;
- opțiunile `electrical` și `other` rămân disponibile numai pentru cereri particulare sau de mentenanță, nu pentru urgențe B2B;
- limita afișată este maximum 50 km sau aproximativ 40 de minute de condus din Woerden și reprezintă numai aria posibilă, nu un SLA;
- pentru B2B, se evaluează numai urgențe legate de un proiect sau o instalație executată anterior de AZGS;
- sunt afișate avertismente pentru 112/serviciul competent atunci când există pericol imediat;
- nu se promite program 24/7, timp de intervenție sau monitorizare imediată.

## Query parameters acceptate

Parametrii sunt citiți numai prin allowlist:

- tip: `requester_type` sau aliasul existent `type`;
- serviciu: `service` sau aliasul existent `dienst`;
- tipuri compatibile: `private|particulier|b2c`, `business|zakelijk|b2b`, `maintenance|onderhoud`, `emergency|spoed`;
- serviciile istorice NL/EN sunt mapate la valori canonice comune.

Valorile necunoscute sunt ignorate și nu sunt copiate în formular.

Compatibilitatea dintre tip și serviciu este verificată înainte de preselectare. De exemplu, `type=business&dienst=painting` deschide ruta B2B fără să selecteze `painting`. Dacă utilizatorul a ales un serviciu disponibil pentru B2C sau mentenanță și schimbă apoi tipul în B2B, selecția incompatibilă este resetată. Aceeași allowlist B2B este verificată din nou la validare înainte de trimitere.

## Formspree — limite oficiale verificate

Verificare efectuată la 3 septembrie 2026:

- planul Free începe la 50 de submissions pe lună, două adrese de notificare și istoric de 30 de zile;
- limita globală este 20 POST-uri pe minut pentru un formular;
- uploadurile sunt disponibile numai pe Personal, Professional și Business;
- pentru upload: maximum 10 fișiere/submission, 25 MB/fișier, 100 MB/cerere și timeout de 30 de secunde;
- cota de stocare depinde de plan și trebuie verificată în dashboard;
- Formspree recomandă să nu se facă load testing pe endpointul public.

Surse oficiale:

- https://help.formspree.io/articles/account-management/account-limits
- https://help.formspree.io/articles/form-and-project-settings/system-limits
- https://help.formspree.io/articles/building-your-form/file-uploads/
- https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax
- https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering
- https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain/

## Decizia privind uploadul

Nu a fost adăugat `<input type="file">`. Repository-ul nu poate confirma planul și cota contului Formspree, iar documentele pot conține mai multe date decât sunt necesare pentru o primă evaluare. Formularul întreabă doar ce documente există; transmiterea se stabilește ulterior printr-un canal adecvat.

## Trimitere și erori

- Browserul validează prin reguli controlate de aplicație și afișează erori NL/EN lângă câmp și într-un rezumat focalizabil.
- Trimiterea folosește `fetch` cu `Accept: application/json` și `FormData`.
- Butonul este dezactivat în timpul cererii, prevenind trimiterea dublă.
- O trimitere `private`, `business` sau `maintenance` nu trece de validarea locală fără `terms_read_confirmation`; payloadul valid include confirmarea și `terms_documents`, astfel încât notificarea Formspree să arate bifa și versiunea consultată.
- Sunt tratate distinct validarea locală, răspunsul 429, eroarea HTTP generală și eroarea de rețea.
- Un succes emite evenimentul local `azgs:form-success`, conectat în Grupa 3 la evenimentul GA4 recomandat `generate_lead`; detail-ul conține numai `requestType` și `service`, fără date personale.
- Pe `localhost`, `127.0.0.1`, `[::1]` și `file:` orice submit valid este oprit local și este afișat mesajul că nimic nu a fost trimis.

## Configurări Formspree de confirmat înainte de publicare

1. Planul activ și cota lunară reală.
2. Destinația reală a endpointului și adresele de notificare.
3. Starea reCAPTCHA/hCaptcha/Turnstile și compatibilitatea cu trimiterea AJAX.
4. `Restrict to Domain` configurat pentru `azgs.nl`; headerul actual `strict-origin-when-cross-origin` este compatibil.
5. Workflow validations care reproduc câmpurile obligatorii și limitele relevante de lungime.
6. Păstrarea submissions și acordurile/transferurile de date declarate în politica de confidențialitate.
7. O singură trimitere end-to-end controlată, convenită în prealabil; aceasta va fi o solicitare reală de test, deoarece Formspree nu oferă un mod dry-run general.

## Testare fără solicitări reale

- NL și EN, pentru toate cele patru rute;
- precompletare prin parametri allowlist și ignorarea valorilor necunoscute;
- ignorarea unei combinații incompatibile precum `type=business&dienst=painting` și resetarea unui serviciu incompatibil la schimbarea rutei în B2B;
- NL și EN: selectorul B2B conține numai sanitare/leidingwerk, termice, încălzire în pardoseală și ventilație;
- payload cu numai câmpurile rutei active;
- erori obligatorii, email invalid, regula email-sau-telefon pentru emergency și allowlist separată pentru o urgență `business-existing`;
- checkboxul condițiilor: absent la `emergency`, obligatoriu și cu eroare localizată la celelalte trei rute; payloadul local conține confirmarea și referința corectă B2C/B2B;
- tastatură, focus, live regions și linkul telefonic pentru Spoed;
- 320 px, 375 px, tabletă și desktop;
- nicio cerere către `formspree.io` în testele locale.

## Confidențialitate

Politicile NL/EN descriu acum categoriile de câmpuri adaptative, scopurile, minimizarea, lipsa uploadului în prima etapă, confirmarea citirii condițiilor și datele tehnice primite de Formspree. Nu există checkbox generic de „consimțământ” pentru politica de confidențialitate: informarea nu este reutilizată ca temei fictiv și rămâne vizibilă lângă submit. Checkboxul separat privește exclusiv citirea versiunilor indicate ale condițiilor și nu reprezintă acceptarea unei oferte sau încheierea contractului.

Principiul de minimizare este documentat de Autoriteit Persoonsgegevens:
https://autoriteitpersoonsgegevens.nl/nl/onderwerpen/algemene-informatie-avg/verantwoordingsplicht

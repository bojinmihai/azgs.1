# AZ Grand Solutions — analytics și conversii

Ultima actualizare: 3 septembrie 2026
Stare: corecția de vizibilitate și măsurare SPA din commitul `c88ea5d` este publicată și verificată HTTP pe `azgs.nl`; configurarea post-deploy confirmată și verificările rămase sunt consemnate mai jos

## Principii

- Se folosește GA4 Standard cu meetcode `G-DK6FZHQRCB`; pentru această implementare nu este necesar GA4 360 sau alt plan plătit.
- Implementarea folosește basic consent mode: înainte de acceptare nu se încarcă tagul Google și nu se transmite nici măcar un ping fără cookie.
- Refuzul și lipsa unei alegeri sunt stările implicite sigure.
- Acceptarea și refuzul sunt prezentate la același nivel și cu aceeași vizibilitate.
- Retragerea este disponibilă printr-o acțiune permanentă în footer și prin pagina Cookiebeleid/Cookie Policy.
- La refuz sau retragere sunt oprite evenimentele noi, scriptul GA4 este eliminat, starea de colectare este dezactivată, iar cookie-urile proprii `_ga`/`_ga_*` sunt șterse în măsura permisă browserului.
- Niciun eveniment nu conține valori introduse de utilizator în formular.
- Scriptul Google poate fi încărcat exclusiv pe `azgs.nl` și `www.azgs.nl`. Pe localhost, `127.0.0.1`, `[::1]`, `file:` și orice hostname de preview comenzile rămân locale; nu se transmite trafic către proprietatea reală.
- Parametrul tehnic `form_variant` folosește aceeași versiune ca formularul curent: `adaptive-contact-v3`.
- `page_view` este controlat manual pentru navigarea Next.js și configurația folosește `send_page_view=false`. Enhanced Measurement master este activ, dar pageviews generate din browser history sunt dezactivate pentru a evita dublarea; numai măsurările automate `Page loads` și `Scrolls` au rămas active.

## Evenimente

| Eveniment GA4 | Declanșare | Parametri specifici | Observații |
|---|---|---|---|
| `page_view` | prima pagină după consimțământ și fiecare schimbare reală de rută Next.js | `page_location`, `page_referrer`, `content_language`, `entry_page`, context și atribuire sigură | locația și referința nu conțin query sau fragment; aceeași locație nu este trimisă de două ori |
| `audience_select` | alegerea Particulier, B2B sau Onderhoud din selectorul de audiență | `audience_type`, `destination_path` | destinația nu conține query sau fragment |
| `request_type_select` | selectarea unui tip în formular | `request_type`, `service_context` | include și `emergency`; nu include eticheta sau datele persoanei |
| `service_select` | alegerea serviciului principal din formular | `request_type`, `service_context`, `business_sector` unde există | serviciul și sectorul provin exclusiv din liste fixe |
| `contact_form_start` | prima interacțiune relevantă cu formularul după consimțământ | `request_type`, `service_context`, `business_sector`, `form_variant` | se trimite cel mult o dată pe încărcarea formularului |
| `contact_form_abandon` | plecare din pagină după un `contact_form_start`, fără submit reușit sau conversie prin contact direct | `request_type`, `service_context`, `business_sector`, `form_variant`, `transport_type=beacon` | fără număr de câmpuri, valori, text sau durată exactă |
| `generate_lead` | numai după răspuns Formspree reușit | `request_type`, `service_context`, `business_sector`, `form_variant` | eveniment GA4 recomandat pentru generarea unui lead; nu măsoară tentativa eșuată |
| `phone_click` | clic pe orice link `tel:` | `contact_location` | nu se trimite numărul de telefon |
| `whatsapp_click` | clic spre `wa.me`/WhatsApp | `contact_location` | nu se trimite numărul, URL-ul sau mesajul |
| `email_click` | clic pe orice link `mailto:` | `contact_location`, `email_kind` | `email_kind` este doar `general`, `requests` sau `other`; adresa nu se trimite |
| `legal_document_download` | descărcarea PDF-urilor B2C/B2B | `document_type`, `document_audience`, `document_language`, `document_version` | nu se trimite URL-ul complet |
| `b2b_document_download` | descărcarea capabilities statement-ului B2B NL/EN | aceiași parametri de document | se emite numai de pe linkurile PDF marcate cu `document_type=capabilities`; nu se trimite URL-ul complet |

## Parametri comuni

Fiecare eveniment primește automat numai următoarele valori controlate:

- `content_language`: `nl` sau `en`; nu suprascrie parametrul standard GA4 `language`, care descrie preferința browserului;
- `origin_page`: cale internă sigură, fără query sau fragment;
- `entry_page`: prima cale internă sigură din sesiunea curentă;
- `cta_origin`: pagina internă de pe care s-a deschis formularul, sau `none`;
- `audience_context`: `general`, `private`, `business` sau `maintenance`;
- `service_context`: serviciu dintr-o listă fixă sau `none`;
- `traffic_source`: categorie fixă, de exemplu `google`, `google_business_profile`, `bing`, `facebook`, `email`, `referral`, `direct` sau `other`;
- `traffic_medium`: categorie fixă, de exemplu `organic`, `cpc`, `social`, `email`, `referral`, `direct` sau `other`;
- `campaign_present`: numai `yes` sau `no`;
- `referrer_type`: `direct`, `same_site`, `search`, `social` sau `referral`.

Valorile sunt validate din nou înainte de apelul `gtag`. Parametrii necunoscuți și valorile din afara listelor sunt eliminați.

## Atribuire fără PII

- Nu se păstrează `utm_campaign`, `utm_term`, `utm_content` sau alte valori libere.
- `utm_source` și `utm_medium` sunt mapate exclusiv la categorii cunoscute; orice valoare necunoscută devine `other`.
- Pentru campanie se păstrează numai faptul că parametrul a existat.
- Referrerul extern este clasificat, nu stocat ca URL sau hostname liber.
- Pagina măsurată nu conține query sau hash; segmentele suspecte din cale sunt înlocuite cu `redacted`.
- Contextul first-touch este capturat temporar în memorie pentru ca sursa să nu se piardă înaintea alegerii privind cookies.
- Atribuirea, pagina de intrare și originea CTA se scriu în `sessionStorage` numai după consimțământ și sunt șterse la refuz/retragere. Formularul primește aceleași categorii sigure ca hidden fields numai cât timp consimțământul analytics este activ; fără consimțământ, aceste câmpuri nu sunt incluse în trimitere.
- Linkul pentru Google Business Profile este `https://azgs.nl/?utm_source=google_business_profile&utm_medium=organic&utm_campaign=local_profile`. Este publicat în profil și a fost confirmat prin readback la 3 septembrie 2026. În GA4 se reconstruiesc numai valorile fixe `google_business_profile`, `organic` și `local_profile`; query-ul nu apare în `page_location`.

## Date interzise în GA4

Nu se trimit: nume, e-mail, telefon, adresă, postcode, KvK, companie, rol, mesaj, planning, documente disponibile, informații despre acces, valori libere din URL, identificatori de client sau conținutul formularului.

## Starea contului GA4 și configurarea post-deploy

Auditul inițial din 3 septembrie 2026 a confirmat meetcode-ul `G-DK6FZHQRCB`, Google Signals dezactivat, redacția automată a adreselor de e-mail activă și retenția event/user la 14 luni. Proprietatea afișa atunci „No data received”; aceasta rămâne o observație istorică, nu o descriere confirmată a stării de după deploy.

### Setări confirmate la 3 septembrie 2026

1. Fluxul web `azgs.nl` are ID `12841759030` și meetcode `G-DK6FZHQRCB`.
2. Enhanced Measurement master este activ. `Page loads` și `Scrolls` sunt active; `Browser history events`, `Outbound clicks`, `Site search`, `Form interactions`, `Video engagement` și `File downloads` sunt dezactivate. Astfel, pageviews SPA, clickurile, formularele și descărcările controlate de cod nu sunt dublate de opțiunile automate corespondente.
3. Redacția adreselor de e-mail și redacția parametrilor URL sunt active. Lista explicită pentru query redaction conține 19 chei: `name`, `email`, `email_address`, `phone`, `contact_method`, `company`, `organization`, `contact_role`, `kvk`, `project_location`, `postcode`, `postal_code`, `address`, `planning_notes`, `message`, `first_name`, `last_name`, `firstname` și `lastname`. Acest strat nu înlocuiește eliminarea query-ului din cod.
4. Google Signals este dezactivat. Advertising personalization este dezactivată global pentru toate cele 307 regiuni, iar implementarea păstrează parametrii `ad_*` refuzați.
5. Există două asocieri Google Ads legacy preexistente: una afișează personalizarea activată la nivelul legăturii, iar cealaltă dezactivată. Ambele au rămas neatinse conform domeniului aprobat; nu s-a creat nicio asociere Ads nouă.
6. Au fost create exact 12 dimensiuni custom event-scoped: `content_language`, `audience_context`, `service_context`, `request_type`, `business_sector`, `contact_location`, `document_type`, `document_audience`, `traffic_source`, `traffic_medium`, `entry_page` și `cta_origin`.
7. Asocierea Search Console a fost creată la 3 septembrie 2026 între proprietatea Domain `azgs.nl` și fluxul web `azgs.nl`, ID `12841759030`.

### Verificări rămase deschise

- Proba Realtime/DebugView nu este finalizată. Browserul public păstra consimțământul în starea `rejected`, site-ul nu oferă o interfață pentru redeschiderea bannerului, iar browsere separate Chrome/Edge nu au fost disponibile. Realtime a rămas la 0 și nu s-a transmis niciun eveniment în această probă.
- `generate_lead` nu a fost observat și nu a fost marcat drept key event. Se marchează numai după recepția și verificarea unui eveniment real; clickurile de contact rămân intenții, nu leaduri confirmate.
- Auditul read-only pentru Data sharing, transferuri, rolurile contractuale Google și data-processing terms rămâne pentru o etapă ulterioară. Politica de confidențialitate trebuie menținută conform stării confirmate atunci.
- Un test ulterior trebuie să acopere refuz, accept, schimbare de rută, selectare de serviciu și clickuri, fără PII și fără trimiterea unui lead nedorit firmei.

## Planuri plătite

- GA4 Standard este suficient pentru evenimentele, key events și parametrii acestei etape.
- GA4 360 ar avea sens numai la volume și cerințe enterprise, retenție mai mare, cote/raportare avansată sau exporturi care depășesc limitele Standard; nu există acum o nevoie AZGS verificată.
- Pentru formular rămâne valabilă decizia Grupei 2: un plan Formspree plătit se evaluează numai dacă sunt necesare uploaduri, cote mai mari, retenție/workflows sau alte funcții care nu sunt disponibile în planul real al contului.

## Surse oficiale verificate

- Autoriteit Persoonsgegevens — cookiebanners și retragerea consimțământului: https://autoriteitpersoonsgegevens.nl/actueel/ap-pakt-misleidende-cookiebanners-aan
- Autoriteit Persoonsgegevens — normuitleg intrekken toestemming: https://www.autoriteitpersoonsgegevens.nl/uploads/2024-03/Normuitleg%20AP%20intrekken%20toestemming%20cookiebanners.pdf
- ACM — cookies plaatsen: https://www.acm.nl/nl/verkoop-aan-consumenten/reclame-en-verleiden/online-beinvloeden/cookies-plaatsen
- Google — basic versus advanced consent mode: https://developers.google.com/tag-platform/security/concepts/consent-mode
- Google — PII in Analytics: https://support.google.com/analytics/answer/6366371
- Google — recommended event `generate_lead`: https://developers.google.com/analytics/devguides/collection/ga4/reference/events
- Google — enhanced measurement events: https://support.google.com/analytics/answer/9216061
- Google — manual pageviews și evitarea dublării: https://developers.google.com/analytics/devguides/collection/ga4/views
- Google — configurația `gtag`, inclusiv parametrii de campanie și `language`: https://developers.google.com/analytics/devguides/collection/ga4/reference/config
- Google — conectarea Search Console la GA4: https://support.google.com/analytics/answer/10737381
- Google — data retention: https://support.google.com/analytics/answer/7667196

# AZ Grand Solutions — analytics și conversii

Ultima actualizare: 3 septembrie 2026
Stare: implementat local în Grupa 3; fără evenimente reale GA4 și fără publicare

## Principii

- Se folosește GA4 Standard cu meetcode `G-DK6FZHQRCB`; pentru această implementare nu este necesar GA4 360 sau alt plan plătit.
- Implementarea folosește basic consent mode: înainte de acceptare nu se încarcă tagul Google și nu se transmite nici măcar un ping fără cookie.
- Refuzul și lipsa unei alegeri sunt stările implicite sigure.
- Acceptarea și refuzul sunt prezentate la același nivel și cu aceeași vizibilitate.
- Retragerea este disponibilă printr-o acțiune permanentă în footer și prin pagina Cookiebeleid/Cookie Policy.
- La refuz sau retragere sunt oprite evenimentele noi, scriptul GA4 este eliminat, starea de colectare este dezactivată, iar cookie-urile proprii `_ga`/`_ga_*` sunt șterse în măsura permisă browserului.
- Niciun eveniment nu conține valori introduse de utilizator în formular.
- Pe localhost, `127.0.0.1`, `[::1]` și `file:` comenzile sunt scrise numai în `dataLayer`; scriptul Google nu este încărcat și nu se transmit evenimente reale.
- Parametrul tehnic `form_variant` folosește aceeași versiune ca formularul curent: `adaptive-contact-v3`.

## Evenimente

| Eveniment GA4 | Declanșare | Parametri specifici | Observații |
|---|---|---|---|
| `audience_select` | alegerea Particulier, B2B sau Onderhoud din selectorul de audiență | `audience_type`, `destination_path` | destinația nu conține query sau fragment |
| `request_type_select` | selectarea unui tip în formular | `request_type`, `service_context` | include și `emergency`; nu include eticheta sau datele persoanei |
| `contact_form_start` | prima interacțiune relevantă cu formularul după consimțământ | `request_type`, `service_context`, `form_variant` | se trimite cel mult o dată pe încărcarea formularului |
| `contact_form_abandon` | plecare din pagină după un `contact_form_start`, fără submit reușit sau conversie prin contact direct | `request_type`, `service_context`, `form_variant`, `transport_type=beacon` | fără număr de câmpuri, valori, text sau durată exactă |
| `generate_lead` | numai după răspuns Formspree reușit | `request_type`, `service_context`, `form_variant` | eveniment GA4 recomandat pentru generarea unui lead; nu măsoară tentativa eșuată |
| `phone_click` | clic pe orice link `tel:` | `contact_location` | nu se trimite numărul de telefon |
| `whatsapp_click` | clic spre `wa.me`/WhatsApp | `contact_location` | nu se trimite numărul, URL-ul sau mesajul |
| `email_click` | clic pe orice link `mailto:` | `contact_location`, `email_kind` | `email_kind` este doar `general`, `requests` sau `other`; adresa nu se trimite |
| `legal_document_download` | descărcarea PDF-urilor B2C/B2B | `document_type`, `document_audience`, `document_language`, `document_version` | nu se trimite URL-ul complet |
| `b2b_document_download` | descărcarea capabilities statement-ului B2B NL/EN | aceiași parametri de document | se emite numai de pe linkurile PDF marcate cu `document_type=capabilities`; nu se trimite URL-ul complet |

## Parametri comuni

Fiecare eveniment primește automat numai următoarele valori controlate:

- `language`: `nl` sau `en`;
- `origin_page`: cale internă sigură, fără query sau fragment;
- `audience_context`: `general`, `private`, `business` sau `maintenance`;
- `service_context`: serviciu dintr-o listă fixă sau `none`;
- `traffic_source`: categorie fixă, de exemplu `google`, `bing`, `facebook`, `email`, `referral`, `direct` sau `other`;
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
- Atribuirea sesiunii se scrie în `sessionStorage` numai după consimțământ. Formularul primește aceleași categorii sigure ca hidden fields fără a păstra valorile UTM brute.

## Date interzise în GA4

Nu se trimit: nume, e-mail, telefon, adresă, postcode, KvK, companie, rol, mesaj, planning, documente disponibile, informații despre acces, valori libere din URL, identificatori de client sau conținutul formularului.

## Setări GA4 de confirmat înainte de publicare

1. Meetcode-ul și proprietatea GA4 aparțin contului corect AZGS.
2. Google Signals, advertising personalization și legăturile Google Ads sunt dezactivate și în dashboard, nu doar în cod.
3. Enhanced Measurement → Form interactions este dezactivat pentru a evita evenimente automate la simpla tentativă și dublarea `contact_form_start`/`form_submit`.
4. Enhanced Measurement → File downloads este fie documentat ca eveniment automat suplimentar, fie dezactivat dacă se dorește numai schema semantică AZGS.
5. `generate_lead` este marcat ca key event după prima verificare controlată.
6. Parametrii necesari rapoartelor sunt înregistrați ca event-scoped custom dimensions; nu se înregistrează dimensiuni cu PII sau cardinalitate mare.
7. Data retention este confirmată. Recomandare inițială: 2 luni pentru date user/event în explorări, dacă nu există o nevoie justificată de 14 luni; rapoartele standard agregate nu depind de această setare în același mod.
8. Data sharing, transferurile, rolurile contractuale Google și data-processing terms sunt verificate și reflectate exact în politica de confidențialitate.
9. Data redaction pentru e-mail și parametri URL este activată în web data stream ca strat suplimentar, fără a înlocui protecțiile din cod.
10. Realtime/DebugView este folosit pentru o probă controlată după publicarea aprobată.

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
- Google — data retention: https://support.google.com/analytics/answer/7667196

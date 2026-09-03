# AZGS reviews and reputation workflow

Status: infrastructure only, publication disabled. Last audit: 3 September 2026.

## 1. Evidence audit

- The repository contains no real review text, rating feed, testimonial or publication-consent record.
- A public [Werkspot profile for A-Z Grand Solutions in Woerden](https://www.werkspot.nl/profiel/a-z-grand-solutions?profileTabSelected=reviews) was identified and checked on 3 September 2026. At that moment it showed an aggregate of 4.5/5 from 6 reviews.
- The Werkspot profile is not connected to the website through an API or maintained feed. Its current aggregate must not be hard-coded into public pages.
- No confirmed Google Business Profile review link was found. Obtain the unique link from the owned Business Profile before using a Google request template.
- No individual Werkspot text, author name, locality or rating has been copied into the repository. Separate permission for republication on `azgs.nl` is not documented.

## 2. Publication decision

`content/reviews/reviews.json` is the only registry. It remains empty and `publicationEnabled` remains `false` until every proposed entry passes all checks below. `VerifiedReviewsSection` is intentionally not imported by any public page.

Do not add `Review`, `AggregateRating`, `reviewRating` or another rating property to AZGS `LocalBusiness`/`Organization` structured data. Google's current review-snippet rules make self-serving reviews about a business ineligible, including reviews embedded through a third-party widget.

## 3. Required record for each review

Each record must contain:

1. exact approved review text;
2. the approved display name or initials;
3. locality at the granularity approved by the reviewer;
4. type of work;
5. original review date;
6. source name, HTTPS source URL and latest source-check date;
7. verification status and date;
8. specific consent for publication on `azgs.nl`, confirmation date and internal evidence reference;
9. `info@azgs.nl` as the withdrawal contact;
10. explicit publication approval.

Never store an exact residential address, telephone number, email address, private message, invoice number or other unnecessary personal data in the public registry.

## 4. Neutral request flow

1. Mark the assignment complete and confirm which platform originated it.
2. Invite all eligible completed clients on the same neutral basis. Do not select only clients expected to be positive.
3. For a Werkspot-originated assignment, use Werkspot's own review-request flow.
4. For another assignment, use the unique Google Business Profile review link only after the owner has retrieved and verified it from the profile.
5. Offer no discount, payment, gift, free work or other benefit. Do not ask for a particular rating or wording.
6. Send no more than one polite reminder, normally after 7-14 days, and stop after that.
7. If AZGS wants to reproduce a review on its own website, send a separate permission request with an exact publication preview.
8. Record the response and source check outside the public repository. Add only the approved public fields to the registry.
9. Run `npm run audit:reviews`. Publication must remain disabled until the complete entry and permission evidence have been reviewed.
10. If consent is withdrawn, remove the public entry and any personal fields for which no other valid retention basis exists.

## 5. Review-request template — Dutch

**Onderwerp:** Wilt u uw ervaring met AZ Grand Solutions delen?

Bedankt voor de samenwerking aan [korte omschrijving van de opdracht]. Als u dat wilt, kunt u vrijwillig een eerlijke review achterlaten via [geverifieerde reviewlink]. Positieve én kritische feedback is welkom. Wij vragen niet om een bepaalde score of formulering en er staat geen vergoeding, korting of ander voordeel tegenover. Uw keuze heeft geen invloed op service of toekomstige aanvragen.

Met vriendelijke groet,

AZ Grand Solutions

## 6. Review-request template — English

**Subject:** Would you like to share your experience with AZ Grand Solutions?

Thank you for working with us on [short description of the assignment]. If you wish, you may voluntarily leave an honest review through [verified review link]. Positive and critical feedback are both welcome. We do not ask for a particular rating or wording, and no payment, discount or other benefit is offered. Your choice will not affect service or future requests.

Kind regards,

AZ Grand Solutions

## 7. Separate website-publication permission — Dutch

Stuur eerst exact de voorgestelde kaart terug, inclusief reviewtekst, naam of initialen, plaats/regio, type werk, datum en bronlink.

**Toestemmingsvraag:** Mag AZ Grand Solutions de hierboven getoonde reviewkaart publiceren op `azgs.nl` in de Nederlandse en, indien apart aangegeven, Engelse versie? Publicatie is vrijwillig. U kunt uw toestemming altijd intrekken via `info@azgs.nl`; AZGS verwijdert de kaart dan uit de eigen publicatie. Antwoord alleen met **AKKOORD WEBSITE NL** en eventueel **AKKOORD WEBSITE EN** wanneer de preview correct is.

## 8. Separate website-publication permission — English

First return the exact proposed card, including review text, name or initials, locality/region, work type, date and source link.

**Permission request:** May AZ Grand Solutions publish the review card shown above on `azgs.nl` in Dutch and, only if separately indicated, in English? Publication is voluntary. You may withdraw permission at any time through `info@azgs.nl`; AZGS will then remove the card from its own publication. Reply only with **WEBSITE NL AGREED** and, where applicable, **WEBSITE EN AGREED** if the preview is correct.

## 9. Official rules used

- [Google: create a review link or QR code](https://support.google.com/business/answer/16816815?hl=en)
- [Google Maps: prohibited and restricted content](https://support.google.com/contributionpolicy/answer/7400114?hl=en-GB)
- [Google Search Central: review snippet structured data](https://developers.google.com/search/docs/appearance/structured-data/review-snippet?hl=en)
- [Google Search Central: self-serving reviews](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful)
- [Autoriteit Persoonsgegevens: personal data on the internet](https://autoriteitpersoonsgegevens.nl/en/themes/internet-and-smart-devices/personal-data-on-the-internet)

Before enabling direct website collection, update the privacy policy for this specific purpose and have the consent wording and retention process checked for Dutch GDPR compliance.

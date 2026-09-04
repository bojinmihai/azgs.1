'use client';

import type { FormEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { COMPANY, SITE_URL, type Locale } from '@/lib/site';
import {
  ANALYTICS_CONSENT_EVENT,
  CONTACT_FORM_VARIANT,
  getAnalyticsConsent,
  getSafeAttribution,
  getSafeCtaOrigin,
  getSafeEntryPage,
  primeSafeAnalyticsContext,
  safePagePath,
  type SafeAttribution,
} from '@/lib/analytics';
import type { BusinessSectorKey } from '@/lib/business-sectors';
import { MailIcon, PhoneIcon, WhatsAppIcon } from './icons';

type RequestType = '' | 'private' | 'business' | 'maintenance' | 'emergency';
type FormErrors = Record<string, string>;
type SubmitStatus =
  | { kind: 'idle'; message: '' }
  | { kind: 'submitting'; message: string }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string };

type Option = { value: string; label: string };

const DEFAULT_ATTRIBUTION: SafeAttribution = {
  traffic_source: 'direct',
  traffic_medium: 'direct',
  campaign_present: 'no',
  referrer_type: 'direct',
};

const REQUEST_TYPE_ALIASES: Record<string, Exclude<RequestType, ''>> = {
  private: 'private',
  particulier: 'private',
  b2c: 'private',
  business: 'business',
  zakelijk: 'business',
  b2b: 'business',
  maintenance: 'maintenance',
  onderhoud: 'maintenance',
  emergency: 'emergency',
  spoed: 'emergency',
};

const BUSINESS_SECTORS = new Set<BusinessSectorKey>([
  'contractors',
  'property-managers',
  'hospitality-hotels',
  'offices-retail',
  'owners-associations',
  'installation-ventilation',
]);

const SERVICE_ALIASES: Record<string, string> = {
  plumbing: 'plumbing',
  pipework: 'plumbing',
  sanitary: 'plumbing',
  sanitair: 'plumbing',
  heating: 'heating',
  thermal: 'heating',
  verwarming: 'heating',
  underfloor: 'underfloor-heating',
  'underfloor-heating': 'underfloor-heating',
  vloerverwarming: 'underfloor-heating',
  climate: 'ventilation-climate',
  ventilation: 'ventilation-climate',
  ventilatie: 'ventilation-climate',
  'ventilation-climate': 'ventilation-climate',
  'ventilatie-warmtepompen': 'ventilation-climate',
  drywall: 'drywall',
  gipsplaten: 'drywall',
  painting: 'painting',
  schilderwerk: 'painting',
  parquet: 'parquet',
  parket: 'parquet',
  tiling: 'tiling',
  tegelwerk: 'tiling',
  electrical: 'electrical',
  elektra: 'electrical',
  other: 'other',
  overig: 'other',
};

const BUSINESS_SERVICE_VALUES = new Set([
  'plumbing',
  'heating',
  'underfloor-heating',
  'ventilation-climate',
]);

const EMERGENCY_CLIENT_VALUES = new Set(['private', 'maintenance', 'business-existing']);
const BUSINESS_URGENT_ISSUE_VALUES = new Set(['leak', 'heating', 'ventilation']);

function isServiceCompatible(requestType: RequestType, service: string) {
  return requestType !== 'business' || !service || BUSINESS_SERVICE_VALUES.has(service);
}

const COPY = {
  nl: {
    cardTitle: 'Vertel ons wat u nodig heeft',
    cardIntro: 'Kies eerst het type aanvraag. U ziet daarna alleen de informatie die nodig is voor een eerste beoordeling.',
    typeLegend: 'Voor wie of waarvoor vraagt u aan?',
    typeHint: 'Verplicht. U kunt uw keuze later wijzigen.',
    types: [
      { value: 'private', title: 'Particulier', text: 'Een aanvraag voor uw woning of als consument.' },
      { value: 'business', title: 'Zakelijk / B2B', text: 'Een project namens een bedrijf of professionele opdrachtgever.' },
      { value: 'maintenance', title: 'Gebouwonderhoud', text: 'Een losse melding of terugkerend onderhoud voor één of meer locaties.' },
      { value: 'emergency', title: 'Spoed', text: 'Een urgente situatie waarbij bellen de snelste route is.' },
    ],
    selected: {
      private: 'Particuliere aanvraag geselecteerd. Het korte B2C-formulier is geopend.',
      business: 'Zakelijke aanvraag geselecteerd. De projectvelden voor B2B zijn geopend.',
      maintenance: 'Gebouwonderhoud geselecteerd. De velden voor locatie, toegang en urgentie zijn geopend.',
      emergency: 'Spoed geselecteerd. Bel AZ Grand Solutions; het korte terugbelveld is alleen een alternatief.',
    },
    contactLegend: 'Contactgegevens',
    projectLegend: 'Aanvraaggegevens',
    privateLegend: 'Uw particuliere aanvraag',
    businessLegend: 'Uw zakelijke project',
    maintenanceLegend: 'Uw onderhoudsmelding',
    emergencyLegend: 'Korte terugbel- of contactaanvraag',
    name: 'Naam contactpersoon',
    email: 'E-mailadres',
    phone: 'Telefoonnummer',
    company: 'Bedrijfsnaam',
    contactRole: 'Rol of functie',
    kvk: 'KvK-nummer',
    organization: 'Organisatie of beheerder',
    location: 'Plaats of postcode van de locatie',
    locationHint: 'Een volledig adres is voor de eerste beoordeling niet nodig.',
    service: 'Hoofdonderwerp van de werkzaamheden',
    buildingType: 'Type gebouw',
    projectPhase: 'Fase van het project',
    desiredPeriod: 'Gewenste periode',
    planning: 'Planning of belangrijke randvoorwaarden',
    documents: 'Welke tekeningen of documenten zijn beschikbaar?',
    documentsHint: 'Stuur nu geen bestanden. Na de eerste beoordeling spreken we een passend kanaal af.',
    collaboration: 'Gewenste samenwerking',
    businessScopeNote: 'B2B is uitsluitend voor sanitair en leidingwerk, thermische installaties — waaronder vloerverwarming — en ventilatie. Projectlocaties worden vanuit Woerden beoordeeld met Breda, Tilburg, Eindhoven, Purmerend, Beverwijk, Den Haag, Rotterdam, Leiden, Lelystad en Zwolle als oriëntatiepunten; andere locaties alleen na projectbeoordeling.',
    maintenanceRole: 'U vraagt aan als',
    locationCount: 'Aantal locaties',
    urgency: 'Urgentie',
    access: 'Toegang tot de locatie',
    accessHint: 'Vul geen alarmcodes, sleutelgegevens of andere beveiligingsinformatie in.',
    maintenanceModel: 'Soort onderhoud',
    maintenanceAreaNote: 'Werkgebied onderhoud: maximaal 50 km of ongeveer één uur reistijd vanaf Woerden, beoordeeld per route en verkeer. Dit is geen reactie- of aankomsttijd.',
    urgentIssue: 'Soort urgente situatie',
    emergencyClientType: 'U vraagt deze spoedbeoordeling aan als',
    emergencyClientHint: 'Zakelijke spoed is alleen mogelijk voor een eigen, eerder door AZGS uitgevoerd sanitair-, verwarmings- of ventilatieproject.',
    emergencyAreaNote: 'Werkgebied spoed: maximaal 50 km of ongeveer 40 minuten rijden vanaf Woerden. Dit is geen SLA. Zakelijke spoed wordt alleen beoordeeld voor een project of installatie die AZGS eerder zelf heeft uitgevoerd.',
    message: 'Korte omschrijving',
    messagePrivate: 'Beschrijf kort de situatie, uw wensen en wat al bekend is.',
    messageBusiness: 'Beschrijf scope, relevante hoeveelheden, afhankelijkheden en wat u van AZGS verwacht.',
    messageMaintenance: 'Beschrijf de melding, gevolgen voor het gebruik en bekende bijzonderheden.',
    messageEmergency: 'Beschrijf alleen wat nodig is om contact met u op te nemen. Bel bij een urgente situatie.',
    optional: 'optioneel',
    required: 'verplicht',
    choose: 'Kies een optie',
    submit: 'Aanvraag versturen',
    submitEmergency: 'Terugbel- of contactaanvraag versturen',
    submitting: 'Bezig met versturen…',
    privacyIntro: 'Wij gebruiken uw gegevens alleen om uw aanvraag te beoordelen, te beantwoorden en zo nodig een offerte voor te bereiden.',
    privacyLink: 'Lees het privacybeleid.',
    dataWarning: 'Vermeld geen BSN, medische gegevens, betaalgegevens, wachtwoorden of andere gevoelige persoonsgegevens.',
    privateTerms: 'Bij een mogelijke consumentenopdracht worden de consumentenvoorwaarden vóór of bij de overeenkomst verstrekt; verzenden van dit formulier is geen aanvaarding van voorwaarden.',
    businessTerms: 'Bij een mogelijke zakelijke opdracht worden de zakelijke voorwaarden vóór of bij de overeenkomst verstrekt; verzenden van dit formulier is geen aanvaarding van voorwaarden.',
    maintenanceTerms: 'Welke voorwaarden van toepassing kunnen zijn, hangt af van de hoedanigheid waarin u handelt. Dit wordt vóór een eventuele overeenkomst vastgesteld.',
    emergencyTerms: 'Het toepasselijke B2C- of B2B-regime wordt pas bij een eventuele opdracht vastgesteld. Dit formulier sluit geen overeenkomst.',
    consumerTermsVersionLabel: 'Consumentenvoorwaarden (versie 1.0, 3 september 2026)',
    businessTermsVersionLabel: 'Zakelijke voorwaarden (versie 1.1, 3 september 2026)',
    termsReadPrivate: 'Ik bevestig dat ik de consumentenvoorwaarden heb kunnen bekijken en heb gelezen.',
    termsReadBusiness: 'Ik bevestig dat ik de zakelijke voorwaarden heb kunnen bekijken en heb gelezen.',
    termsReadMaintenance: 'Ik bevestig dat ik de consumentenvoorwaarden en zakelijke voorwaarden heb kunnen bekijken en heb gelezen. Vóór een eventuele overeenkomst wordt vastgesteld welke voorwaarden gelden.',
    termsNoAgreement: 'Het versturen van deze aanvraag is geen aanvaarding van een offerte en sluit geen overeenkomst.',
    termsEmailConfirmation: 'Ja — het verplichte vak is door de aanvrager aangevinkt',
    emergencyTitle: 'Bel bij spoed',
    emergencyText: 'Het online formulier is geen direct bewaakt noodkanaal en geeft geen garantie op een onmiddellijke reactie. Bel AZ Grand Solutions. Zakelijke spoed wordt alleen beoordeeld voor een project of installatie die AZGS eerder zelf heeft uitgevoerd. Bij direct gevaar voor personen of omgeving belt u 112 of de bevoegde storingsdienst.',
    emergencyCall: `Bel ${COMPANY.phoneDisplay}`,
    contactEither: 'Vul voor een terugbel- of contactaanvraag minimaal een e-mailadres of telefoonnummer in.',
    validationHeading: 'Controleer de volgende velden:',
    errorRequired: 'Dit veld is verplicht.',
    errorEmail: 'Vul een geldig e-mailadres in.',
    errorContact: 'Vul minimaal een e-mailadres of telefoonnummer in.',
    errorTerms: 'Bevestig dat u de toepasselijke algemene voorwaarden heeft gelezen.',
    errorGeneric: 'De aanvraag kon niet worden verstuurd. Probeer het later opnieuw of neem telefonisch of per e-mail contact op.',
    errorRate: 'Er zijn tijdelijk te veel aanvragen. Wacht even en probeer opnieuw, of neem direct contact op.',
    errorNetwork: 'Er kon geen verbinding worden gemaakt. Controleer uw internetverbinding en probeer opnieuw.',
    success: 'Uw aanvraag is ontvangen. Wij nemen contact op zodra de aanvraag is beoordeeld.',
    localSuccess: 'Lokale test geslaagd. Er is niets naar Formspree of AZ Grand Solutions verstuurd.',
    directTitle: 'Of neem direct contact op',
    directIntro: 'Bellen is de directe route bij spoed. Voor offertes en algemene vragen kunt u ook e-mail of WhatsApp gebruiken.',
    phoneLabel: 'Telefoon',
    phoneHint: 'Bel voor directe afstemming',
    quoteEmailLabel: 'E-mail voor aanvragen',
    quoteEmailHint: 'Voor offerte- en projectaanvragen',
    generalEmailLabel: 'Algemeen',
    generalEmailHint: 'Voor overige vragen',
    whatsappLabel: 'WhatsApp',
    whatsappHint: 'U verlaat azgs.nl en gebruikt WhatsApp',
    addressLabel: 'Vestigingsadres',
    addressHint: 'Geen bezoeklocatie; AZGS werkt bij klanten en op projectlocaties',
    sideEmergencyLabel: 'Spoed',
    sideEmergencyText: 'Gebruik bij een urgente situatie de telefoon. Het formulier is geen direct bewaakt noodkanaal.',
    sideEmergencyCall: 'Bel voor spoed',
  },
  en: {
    cardTitle: 'Tell us what you need',
    cardIntro: 'First choose the type of request. You will then see only the information needed for an initial assessment.',
    typeLegend: 'Who or what are you enquiring for?',
    typeHint: 'Required. You can change your choice later.',
    types: [
      { value: 'private', title: 'Private / consumer', text: 'A request for your home or in your capacity as a consumer.' },
      { value: 'business', title: 'Business / B2B', text: 'A project on behalf of a company or professional client.' },
      { value: 'maintenance', title: 'Building maintenance', text: 'A one-off report or recurring maintenance for one or more locations.' },
      { value: 'emergency', title: 'Emergency', text: 'An urgent situation where calling is the quickest route.' },
    ],
    selected: {
      private: 'Private request selected. The short B2C form is open.',
      business: 'Business request selected. The B2B project fields are open.',
      maintenance: 'Building maintenance selected. The location, access, and urgency fields are open.',
      emergency: 'Emergency selected. Call AZ Grand Solutions; the short callback form is only an alternative.',
    },
    contactLegend: 'Contact details',
    projectLegend: 'Request details',
    privateLegend: 'Your private request',
    businessLegend: 'Your business project',
    maintenanceLegend: 'Your maintenance request',
    emergencyLegend: 'Short callback or contact request',
    name: 'Contact name',
    email: 'Email address',
    phone: 'Phone number',
    company: 'Company name',
    contactRole: 'Role or position',
    kvk: 'Dutch Chamber of Commerce number',
    organization: 'Organisation or property manager',
    location: 'City or postcode of the location',
    locationHint: 'A full address is not needed for the initial assessment.',
    service: 'Main type of work',
    buildingType: 'Building type',
    projectPhase: 'Project phase',
    desiredPeriod: 'Preferred period',
    planning: 'Planning or important constraints',
    documents: 'What drawings or documents are available?',
    documentsHint: 'Do not send files now. After the initial assessment, we will agree a suitable channel.',
    collaboration: 'Preferred collaboration',
    businessScopeNote: 'B2B is exclusively for plumbing and pipework, thermal systems — including underfloor heating — and ventilation. Project locations are assessed from Woerden using Breda, Tilburg, Eindhoven, Purmerend, Beverwijk, The Hague, Rotterdam, Leiden, Lelystad and Zwolle as orientation points; other locations only after project assessment.',
    maintenanceRole: 'You are enquiring as',
    locationCount: 'Number of locations',
    urgency: 'Urgency',
    access: 'Access to the location',
    accessHint: 'Do not enter alarm codes, key details, or other security information.',
    maintenanceModel: 'Type of maintenance',
    maintenanceAreaNote: 'Maintenance area: up to 50 km or about one hour of travel from Woerden, assessed by route and traffic. This is not a response or arrival time.',
    urgentIssue: 'Type of urgent issue',
    emergencyClientType: 'You are requesting this urgent assessment as',
    emergencyClientHint: 'Business emergencies are possible only for a sanitary, heating or ventilation project previously carried out by AZGS itself.',
    emergencyAreaNote: 'Urgent-request area: up to 50 km or about 40 minutes\' drive from Woerden. This is not an SLA. Business emergencies are assessed only for a project or installation previously carried out by AZGS.',
    message: 'Short description',
    messagePrivate: 'Briefly describe the situation, your goals, and what is already known.',
    messageBusiness: 'Describe the scope, relevant quantities, dependencies, and what you expect from AZGS.',
    messageMaintenance: 'Describe the issue, impact on use, and any known particulars.',
    messageEmergency: 'Only describe what is needed to contact you. Call in an urgent situation.',
    optional: 'optional',
    required: 'required',
    choose: 'Select an option',
    submit: 'Send request',
    submitEmergency: 'Send callback or contact request',
    submitting: 'Sending…',
    privacyIntro: 'We use your data only to assess and answer your request and, where relevant, prepare a quotation.',
    privacyLink: 'Read the privacy policy.',
    dataWarning: 'Do not include national identification numbers, medical or payment data, passwords, or other sensitive personal data.',
    privateTerms: 'For a potential consumer engagement, the consumer terms will be supplied before or when the agreement is concluded; sending this form is not acceptance of terms.',
    businessTerms: 'For a potential business engagement, the business terms will be supplied before or when the agreement is concluded; sending this form is not acceptance of terms.',
    maintenanceTerms: 'Which terms may apply depends on the capacity in which you act. This will be determined before any agreement is concluded.',
    emergencyTerms: 'The applicable B2C or B2B regime is determined only if an engagement follows. This form does not conclude an agreement.',
    consumerTermsVersionLabel: 'Consumer terms (version 1.0, 3 September 2026)',
    businessTermsVersionLabel: 'Business terms (version 1.1, 3 September 2026)',
    termsReadPrivate: 'I confirm that I have been able to view and have read the consumer terms.',
    termsReadBusiness: 'I confirm that I have been able to view and have read the business terms.',
    termsReadMaintenance: 'I confirm that I have been able to view and have read the consumer and business terms. Which terms apply will be determined before any agreement.',
    termsNoAgreement: 'Sending this request does not accept a quotation or conclude an agreement.',
    termsEmailConfirmation: 'Yes — the required checkbox was selected by the requester',
    emergencyTitle: 'Call in an emergency',
    emergencyText: 'The online form is not an immediately monitored emergency channel and does not guarantee an immediate response. Call AZ Grand Solutions. Business emergencies are assessed only for a project or installation previously carried out by AZGS. If people or the surroundings are in immediate danger, call 112 or the responsible emergency utility.',
    emergencyCall: `Call ${COMPANY.phoneDisplay}`,
    contactEither: 'For a callback or contact request, enter at least an email address or phone number.',
    validationHeading: 'Check the following fields:',
    errorRequired: 'This field is required.',
    errorEmail: 'Enter a valid email address.',
    errorContact: 'Enter at least an email address or phone number.',
    errorTerms: 'Confirm that you have read the applicable terms and conditions.',
    errorGeneric: 'The request could not be sent. Please try again later or contact us by phone or email.',
    errorRate: 'There are temporarily too many requests. Wait and try again, or contact us directly.',
    errorNetwork: 'A connection could not be made. Check your internet connection and try again.',
    success: 'Your request has been received. We will contact you after it has been assessed.',
    localSuccess: 'Local test passed. Nothing was sent to Formspree or AZ Grand Solutions.',
    directTitle: 'Or contact us directly',
    directIntro: 'Calling is the direct route for emergencies. You can also use email or WhatsApp for quotations and general enquiries.',
    phoneLabel: 'Phone',
    phoneHint: 'Call to discuss directly',
    quoteEmailLabel: 'Email for requests',
    quoteEmailHint: 'For quotation and project requests',
    generalEmailLabel: 'General',
    generalEmailHint: 'For other questions',
    whatsappLabel: 'WhatsApp',
    whatsappHint: 'You leave azgs.nl and use WhatsApp',
    addressLabel: 'Registered office',
    addressHint: 'No customer visits; AZGS works at customer and project locations',
    sideEmergencyLabel: 'Emergency',
    sideEmergencyText: 'Use the phone for an urgent situation. The form is not an immediately monitored emergency channel.',
    sideEmergencyCall: 'Call for emergency',
  },
} as const;

const OPTIONS = {
  businessServices: {
    nl: [
      { value: 'plumbing', label: 'Sanitaire installaties en leidingwerk' },
      { value: 'heating', label: 'Thermische installaties (verwarming)' },
      { value: 'underfloor-heating', label: 'Vloerverwarming (thermische installatie)' },
      { value: 'ventilation-climate', label: 'Ventilatie-installaties' },
    ],
    en: [
      { value: 'plumbing', label: 'Sanitary installations and pipework' },
      { value: 'heating', label: 'Thermal systems (heating)' },
      { value: 'underfloor-heating', label: 'Underfloor heating (thermal installation)' },
      { value: 'ventilation-climate', label: 'Ventilation systems' },
    ],
  },
  services: {
    nl: [
      { value: 'plumbing', label: 'Sanitair en leidingwerk' },
      { value: 'heating', label: 'Verwarming' },
      { value: 'underfloor-heating', label: 'Vloerverwarming' },
      { value: 'ventilation-climate', label: 'Ventilatie en klimaattechniek' },
      { value: 'electrical', label: 'Elektra' },
      { value: 'drywall', label: 'Gipsplaten en metalstud' },
      { value: 'painting', label: 'Schilderwerk of herstelafwerking' },
      { value: 'tiling', label: 'Tegelwerk of tegelherstel' },
      { value: 'parquet', label: 'Parket of houten vloer' },
      { value: 'multiple', label: 'Meerdere werkzaamheden' },
      { value: 'other', label: 'Anders / nog te bepalen' },
    ],
    en: [
      { value: 'plumbing', label: 'Plumbing and pipework' },
      { value: 'heating', label: 'Heating' },
      { value: 'underfloor-heating', label: 'Underfloor heating' },
      { value: 'ventilation-climate', label: 'Ventilation and climate systems' },
      { value: 'electrical', label: 'Electrical work' },
      { value: 'drywall', label: 'Drywall and metal stud' },
      { value: 'painting', label: 'Painting or finishing repair' },
      { value: 'tiling', label: 'Tiling or tile repair' },
      { value: 'parquet', label: 'Parquet or wooden flooring' },
      { value: 'multiple', label: 'Multiple types of work' },
      { value: 'other', label: 'Other / to be determined' },
    ],
  },
  buildingTypes: {
    nl: [
      { value: 'home', label: 'Woning' },
      { value: 'apartment-building', label: 'Appartementengebouw / VvE' },
      { value: 'office', label: 'Kantoor' },
      { value: 'retail', label: 'Winkel / retail' },
      { value: 'hospitality', label: 'Horeca / hotel' },
      { value: 'commercial', label: 'Bedrijfsruimte' },
      { value: 'other', label: 'Anders / gemengd gebruik' },
    ],
    en: [
      { value: 'home', label: 'Home' },
      { value: 'apartment-building', label: 'Apartment building / owners association' },
      { value: 'office', label: 'Office' },
      { value: 'retail', label: 'Shop / retail' },
      { value: 'hospitality', label: 'Hospitality / hotel' },
      { value: 'commercial', label: 'Commercial premises' },
      { value: 'other', label: 'Other / mixed use' },
    ],
  },
  phases: {
    nl: [
      { value: 'orientation', label: 'Oriëntatie / haalbaarheid' },
      { value: 'design', label: 'Ontwerp of werkvoorbereiding' },
      { value: 'quotation', label: 'Offerte- of inkoopfase' },
      { value: 'scheduled', label: 'Gepland project' },
      { value: 'execution', label: 'Project in uitvoering' },
    ],
    en: [
      { value: 'orientation', label: 'Orientation / feasibility' },
      { value: 'design', label: 'Design or work preparation' },
      { value: 'quotation', label: 'Quotation or procurement phase' },
      { value: 'scheduled', label: 'Scheduled project' },
      { value: 'execution', label: 'Project in progress' },
    ],
  },
  periods: {
    nl: [
      { value: 'as-soon-as-possible', label: 'Zo spoedig als praktisch mogelijk' },
      { value: 'within-1-month', label: 'Binnen één maand' },
      { value: 'within-1-3-months', label: 'Binnen één tot drie maanden' },
      { value: 'later', label: 'Later / datum nog niet vast' },
      { value: 'discuss', label: 'In overleg' },
    ],
    en: [
      { value: 'as-soon-as-possible', label: 'As soon as practically possible' },
      { value: 'within-1-month', label: 'Within one month' },
      { value: 'within-1-3-months', label: 'Within one to three months' },
      { value: 'later', label: 'Later / date not fixed' },
      { value: 'discuss', label: 'To be discussed' },
    ],
  },
  documents: {
    nl: [
      { value: 'none', label: 'Nog geen documenten' },
      { value: 'drawings', label: 'Tekeningen' },
      { value: 'specification', label: 'Bestek, scope of werkomschrijving' },
      { value: 'photos', label: 'Foto’s' },
      { value: 'multiple', label: 'Meerdere soorten documenten' },
      { value: 'unknown', label: 'Nog te controleren' },
    ],
    en: [
      { value: 'none', label: 'No documents yet' },
      { value: 'drawings', label: 'Drawings' },
      { value: 'specification', label: 'Specification, scope, or work description' },
      { value: 'photos', label: 'Photos' },
      { value: 'multiple', label: 'Several document types' },
      { value: 'unknown', label: 'To be checked' },
    ],
  },
  collaboration: {
    nl: [
      { value: 'one-off', label: 'Eenmalig project' },
      { value: 'recurring', label: 'Terugkerende samenwerking' },
      { value: 'either', label: 'Beide mogelijk / in overleg' },
    ],
    en: [
      { value: 'one-off', label: 'One-off project' },
      { value: 'recurring', label: 'Recurring collaboration' },
      { value: 'either', label: 'Either / to be discussed' },
    ],
  },
  maintenanceRoles: {
    nl: [
      { value: 'property-manager', label: 'Vastgoedbeheerder' },
      { value: 'owners-association', label: 'VvE / beheerder van een VvE' },
      { value: 'business-owner-user', label: 'Eigenaar of gebruiker van bedrijfspand' },
      { value: 'private-owner', label: 'Particuliere eigenaar' },
      { value: 'other', label: 'Anders' },
    ],
    en: [
      { value: 'property-manager', label: 'Property manager' },
      { value: 'owners-association', label: 'Owners association / its manager' },
      { value: 'business-owner-user', label: 'Owner or occupier of commercial premises' },
      { value: 'private-owner', label: 'Private owner' },
      { value: 'other', label: 'Other' },
    ],
  },
  locationCounts: {
    nl: [
      { value: '1', label: '1 locatie' },
      { value: '2-5', label: '2–5 locaties' },
      { value: '6-20', label: '6–20 locaties' },
      { value: '21-plus', label: 'Meer dan 20 locaties' },
    ],
    en: [
      { value: '1', label: '1 location' },
      { value: '2-5', label: '2–5 locations' },
      { value: '6-20', label: '6–20 locations' },
      { value: '21-plus', label: 'More than 20 locations' },
    ],
  },
  urgency: {
    nl: [
      { value: 'urgent-call', label: 'Urgent — ik bel AZGS' },
      { value: 'soon', label: 'Gewenst: beoordeling binnen enkele werkdagen' },
      { value: 'planned', label: 'Planbaar onderhoud' },
      { value: 'unknown', label: 'Nog te bepalen' },
    ],
    en: [
      { value: 'urgent-call', label: 'Urgent — I will call AZGS' },
      { value: 'soon', label: 'Preferred: assessment within a few working days' },
      { value: 'planned', label: 'Plannable maintenance' },
      { value: 'unknown', label: 'To be determined' },
    ],
  },
  access: {
    nl: [
      { value: 'normal-hours', label: 'Toegang tijdens normale gebruiksuren' },
      { value: 'appointment', label: 'Toegang alleen op afspraak' },
      { value: 'occupied', label: 'Gebouw blijft in gebruik' },
      { value: 'restricted', label: 'Beperkte toegang of werkvenster' },
      { value: 'unknown', label: 'Nog af te stemmen' },
    ],
    en: [
      { value: 'normal-hours', label: 'Access during normal operating hours' },
      { value: 'appointment', label: 'Access by appointment only' },
      { value: 'occupied', label: 'Building remains in use' },
      { value: 'restricted', label: 'Restricted access or work window' },
      { value: 'unknown', label: 'To be agreed' },
    ],
  },
  maintenanceModels: {
    nl: [
      { value: 'one-off', label: 'Eenmalige interventie' },
      { value: 'periodic', label: 'Periodiek onderhoud' },
      { value: 'multiple-locations', label: 'Onderhoud voor meerdere locaties' },
      { value: 'discuss', label: 'Nog te bespreken' },
    ],
    en: [
      { value: 'one-off', label: 'One-off intervention' },
      { value: 'periodic', label: 'Periodic maintenance' },
      { value: 'multiple-locations', label: 'Maintenance for multiple locations' },
      { value: 'discuss', label: 'To be discussed' },
    ],
  },
  urgentIssues: {
    nl: [
      { value: 'leak', label: 'Lekkage of waterprobleem' },
      { value: 'heating', label: 'Verwarming of warmwaterprobleem' },
      { value: 'electrical', label: 'Elektrische storing' },
      { value: 'other', label: 'Andere urgente situatie' },
    ],
    en: [
      { value: 'leak', label: 'Leak or water issue' },
      { value: 'heating', label: 'Heating or hot-water issue' },
      { value: 'electrical', label: 'Electrical fault' },
      { value: 'other', label: 'Other urgent situation' },
    ],
  },
  businessUrgentIssues: {
    nl: [
      { value: 'leak', label: 'Sanitair, leidingwerk of waterprobleem' },
      { value: 'heating', label: 'Verwarmingsinstallatie' },
      { value: 'ventilation', label: 'Ventilatie-installatie' },
    ],
    en: [
      { value: 'leak', label: 'Sanitary installation, pipework or water issue' },
      { value: 'heating', label: 'Heating installation' },
      { value: 'ventilation', label: 'Ventilation installation' },
    ],
  },
  emergencyClientTypes: {
    nl: [
      { value: 'private', label: 'Particulier / consument' },
      { value: 'maintenance', label: 'Gebouwonderhoud' },
      { value: 'business-existing', label: 'Zakelijk / B2B — bestaand AZGS-project' },
    ],
    en: [
      { value: 'private', label: 'Private / consumer' },
      { value: 'maintenance', label: 'Building maintenance' },
      { value: 'business-existing', label: 'Business / B2B — existing AZGS project' },
    ],
  },
} as const;

const ERROR_LABELS = {
  nl: {
    request_type: 'Type aanvraag', name: 'Naam contactpersoon', email: 'E-mailadres', contact_method: 'E-mailadres of telefoonnummer',
    company: 'Bedrijfsnaam', project_location: 'Projectlocatie', service: 'Werkzaamheden', building_type: 'Type gebouw',
    project_phase: 'Projectfase', desired_period: 'Gewenste periode', documents_available: 'Beschikbare documenten',
    collaboration_type: 'Gewenste samenwerking', maintenance_role: 'Hoedanigheid', location_count: 'Aantal locaties',
    urgency: 'Urgentie', access: 'Toegang', maintenance_model: 'Soort onderhoud', emergency_client_type: 'Hoedanigheid spoedaanvraag', urgent_issue: 'Urgente situatie', message: 'Omschrijving',
    terms_read_confirmation: 'Algemene voorwaarden gelezen',
  },
  en: {
    request_type: 'Request type', name: 'Contact name', email: 'Email address', contact_method: 'Email address or phone number',
    company: 'Company name', project_location: 'Project location', service: 'Type of work', building_type: 'Building type',
    project_phase: 'Project phase', desired_period: 'Preferred period', documents_available: 'Available documents',
    collaboration_type: 'Preferred collaboration', maintenance_role: 'Capacity', location_count: 'Number of locations',
    urgency: 'Urgency', access: 'Access', maintenance_model: 'Maintenance type', emergency_client_type: 'Emergency client type', urgent_issue: 'Urgent issue', message: 'Description',
    terms_read_confirmation: 'Terms and conditions read',
  },
} as const;

function describedBy(name: string, hint?: string, error?: string) {
  return [hint ? `${name}-hint` : '', error ? `${name}-error` : ''].filter(Boolean).join(' ') || undefined;
}

function FieldError({ name, error }: { name: string; error?: string }) {
  if (!error) return null;
  return <p className="form-field-error" id={`${name}-error`}>{error}</p>;
}

function TextField({
  name,
  label,
  required = false,
  optionalLabel,
  type = 'text',
  autoComplete,
  inputMode,
  maxLength = 160,
  placeholder,
  hint,
  error,
}: {
  name: string;
  label: string;
  required?: boolean;
  optionalLabel: string;
  type?: 'text' | 'email' | 'tel';
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'numeric';
  maxLength?: number;
  placeholder?: string;
  hint?: string;
  error?: string;
}) {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {label} {required ? <span className="required" aria-hidden="true">*</span> : <span className="optional">{optionalLabel}</span>}
      </label>
      {hint ? <p className="form-field-hint" id={`${name}-hint`}>{hint}</p> : null}
      <input
        className="form-input"
        type={type}
        id={name}
        name={name}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(name, hint, error)}
      />
      <FieldError name={name} error={error} />
    </div>
  );
}

function SelectField({
  name,
  label,
  options,
  choose,
  required = false,
  optionalLabel,
  hint,
  error,
  value,
  onValueChange,
}: {
  name: string;
  label: string;
  options: readonly Option[];
  choose: string;
  required?: boolean;
  optionalLabel: string;
  hint?: string;
  error?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  const control = value === undefined
    ? { defaultValue: '' }
    : { value, onChange: (event: React.ChangeEvent<HTMLSelectElement>) => onValueChange?.(event.target.value) };
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {label} {required ? <span className="required" aria-hidden="true">*</span> : <span className="optional">{optionalLabel}</span>}
      </label>
      {hint ? <p className="form-field-hint" id={`${name}-hint`}>{hint}</p> : null}
      <select
        className="form-select"
        id={name}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(name, hint, error)}
        {...control}
      >
        <option value="" disabled>{choose}</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <FieldError name={name} error={error} />
    </div>
  );
}

function isLocalPreview() {
  if (typeof window === 'undefined') return false;
  return window.location.protocol === 'file:' || ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
}

function subjectFor(type: RequestType, locale: Locale) {
  const subjects = {
    nl: {
      private: 'Nieuwe particuliere aanvraag via azgs.nl',
      business: 'Nieuwe zakelijke aanvraag via azgs.nl',
      maintenance: 'Nieuwe onderhoudsaanvraag via azgs.nl',
      emergency: 'Nieuwe terugbel- of spoedcontactaanvraag via azgs.nl',
    },
    en: {
      private: 'New private request via azgs.nl',
      business: 'New business request via azgs.nl',
      maintenance: 'New maintenance request via azgs.nl',
      emergency: 'New emergency callback or contact request via azgs.nl',
    },
  } as const;
  return type ? subjects[locale][type] : (locale === 'nl' ? 'Nieuwe aanvraag via azgs.nl' : 'New request via azgs.nl');
}

export function AdaptiveContactSection({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const [requestType, setRequestType] = useState<RequestType>('');
  const [service, setService] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>({ kind: 'idle', message: '' });
  const [attribution, setAttribution] = useState<SafeAttribution>(DEFAULT_ATTRIBUTION);
  const [originPage, setOriginPage] = useState(locale === 'nl' ? '/contact' : '/en/contact');
  const [entryPage, setEntryPage] = useState(locale === 'nl' ? '/' : '/en');
  const [ctaOrigin, setCtaOrigin] = useState('none');
  const [includeAnalyticsContext, setIncludeAnalyticsContext] = useState(false);
  const [businessSector, setBusinessSector] = useState<BusinessSectorKey | ''>('');
  const [emergencyClientType, setEmergencyClientType] = useState('');
  const [urgentIssue, setUrgentIssue] = useState('');
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const services = requestType === 'business' ? OPTIONS.businessServices[locale] : OPTIONS.services[locale];
  const urgentIssues = emergencyClientType === 'business-existing'
    ? OPTIONS.businessUrgentIssues[locale]
    : emergencyClientType
      ? OPTIONS.urgentIssues[locale]
      : [];
  const buildingTypes = OPTIONS.buildingTypes[locale];
  const periods = OPTIONS.periods[locale];

  useEffect(() => {
    primeSafeAnalyticsContext();
    const params = new URLSearchParams(window.location.search);
    const requestedType = (params.get('requester_type') || params.get('type') || '').toLowerCase();
    const requestedService = (params.get('service') || params.get('dienst') || '').toLowerCase();
    const requestedSector = (params.get('sector') || '').toLowerCase();
    const initialRequestType = REQUEST_TYPE_ALIASES[requestedType] || '';
    const initialService = SERVICE_ALIASES[requestedService] || '';
    if (initialRequestType) setRequestType(initialRequestType);
    if (initialService && isServiceCompatible(initialRequestType, initialService)) setService(initialService);
    if (BUSINESS_SECTORS.has(requestedSector as BusinessSectorKey)) setBusinessSector(requestedSector as BusinessSectorKey);
    setOriginPage(safePagePath());
    const updateAnalyticsContext = () => {
      const accepted = getAnalyticsConsent() === 'accepted';
      setIncludeAnalyticsContext(accepted);
      if (!accepted) return;
      setAttribution(getSafeAttribution(true));
      setEntryPage(getSafeEntryPage(true));
      setCtaOrigin(getSafeCtaOrigin());
    };
    updateAnalyticsContext();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, updateAnalyticsContext);
    return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, updateAnalyticsContext);
  }, []);

  const selectionAnnouncement = requestType ? t.selected[requestType] : '';
  const labels = ERROR_LABELS[locale] as Record<string, string>;

  const clearFieldError = (name: string) => {
    if (!name) return;
    setErrors((current) => {
      if (!current[name] && !(name === 'email' || name === 'phone') && !current.contact_method) return current;
      const next = { ...current };
      delete next[name];
      if (name === 'email' || name === 'phone') delete next.contact_method;
      return next;
    });
    if (status.kind !== 'idle' && status.kind !== 'submitting') setStatus({ kind: 'idle', message: '' });
  };

  const validate = (form: HTMLFormElement) => {
    const next: FormErrors = {};
    const controls = Array.from(form.elements).filter(
      (element): element is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
        element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement,
    );

    for (const control of controls) {
      if (!control.name || control.disabled || control.type === 'hidden') continue;
      if (control.validity.valueMissing) {
        next[control.name] = control.name === 'terms_read_confirmation' ? t.errorTerms : t.errorRequired;
      }
      else if (control.validity.typeMismatch) next[control.name] = t.errorEmail;
    }

    if (requestType === 'emergency') {
      const data = new FormData(form);
      const email = String(data.get('email') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      if (!email && !phone) next.contact_method = t.errorContact;
    }

    if (requestType === 'business') {
      const selectedService = String(new FormData(form).get('service') || '');
      if (!BUSINESS_SERVICE_VALUES.has(selectedService)) next.service = t.errorRequired;
    }

    if (requestType === 'emergency') {
      const data = new FormData(form);
      const selectedClientType = String(data.get('emergency_client_type') || '');
      const selectedUrgentIssue = String(data.get('urgent_issue') || '');
      if (!EMERGENCY_CLIENT_VALUES.has(selectedClientType)) next.emergency_client_type = t.errorRequired;
      if (selectedClientType === 'business-existing' && !BUSINESS_URGENT_ISSUE_VALUES.has(selectedUrgentIssue)) {
        next.urgent_issue = t.errorRequired;
      }
    }

    return next;
  };

  const focusFirstError = (form: HTMLFormElement, next: FormErrors) => {
    const first = Object.keys(next)[0];
    if (!first) return;
    const targetName = first === 'contact_method' ? 'email' : first;
    requestAnimationFrame(() => {
      const target = form.querySelector<HTMLElement>(`[name="${targetName}"]`);
      errorSummaryRef.current?.focus();
      if (!errorSummaryRef.current) target?.focus();
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.kind === 'submitting') return;

    const form = event.currentTarget;
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus({ kind: 'idle', message: '' });
      focusFirstError(form, nextErrors);
      return;
    }

    if (isLocalPreview()) {
      setStatus({ kind: 'success', message: t.localSuccess });
      window.dispatchEvent(new CustomEvent('azgs:form-success', {
        detail: { requestType, service: requestType === 'emergency' ? 'emergency' : service, businessSector },
      }));
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    setStatus({ kind: 'submitting', message: t.submitting });
    try {
      const response = await fetch(COMPANY.formspree, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        setStatus({ kind: 'error', message: response.status === 429 ? t.errorRate : t.errorGeneric });
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }

      window.dispatchEvent(new CustomEvent('azgs:form-success', {
        detail: { requestType, service: requestType === 'emergency' ? 'emergency' : service, businessSector },
      }));
      form.reset();
      setRequestType('');
      setService('');
      setBusinessSector('');
      setEmergencyClientType('');
      setUrgentIssue('');
      setStatus({ kind: 'success', message: t.success });
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setStatus({ kind: 'error', message: t.errorNetwork });
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  };

  const termsBlock = useMemo(() => {
    if (!requestType) return null;
    const consumerHref = locale === 'nl' ? '/algemene-voorwaarden' : '/en/terms-and-conditions';
    const businessHref = locale === 'nl' ? '/algemene-voorwaarden-zakelijk' : '/en/business-terms-and-conditions';
    const showConsumerTerms = requestType !== 'business';
    const showBusinessTerms = requestType !== 'private';
    const requiresTermsConfirmation = requestType !== 'emergency';
    const termsReference = requestType === 'private'
      ? `B2C v1.0 (2026-09-03) — ${SITE_URL}${consumerHref}`
      : requestType === 'business'
        ? `B2B v1.1 (2026-09-03) — ${SITE_URL}${businessHref}`
        : `B2C v1.0 (2026-09-03) — ${SITE_URL}${consumerHref}; B2B v1.1 (2026-09-03) — ${SITE_URL}${businessHref}`;
    const termsReadConfirmation = requestType === 'private'
      ? t.termsReadPrivate
      : requestType === 'business'
        ? t.termsReadBusiness
        : t.termsReadMaintenance;
    const text = requestType === 'private'
      ? t.privateTerms
      : requestType === 'business'
        ? t.businessTerms
        : requestType === 'maintenance'
          ? t.maintenanceTerms
          : t.emergencyTerms;
    return (
      <div className="form-legal-note">
        <p>{t.privacyIntro} <a href={locale === 'nl' ? '/privacybeleid' : '/en/privacy-policy'}>{t.privacyLink}</a></p>
        <p>{text}</p>
        <p className="form-legal-links">
          {showConsumerTerms ? <a href={consumerHref} target="_blank" rel="noopener noreferrer">{t.consumerTermsVersionLabel}</a> : null}
          {showBusinessTerms ? <a href={businessHref} target="_blank" rel="noopener noreferrer">{t.businessTermsVersionLabel}</a> : null}
        </p>
        {requiresTermsConfirmation ? (
          <div className="form-terms-confirmation" key={`terms-${requestType}`}>
            <div className={`form-checkbox-row${errors.terms_read_confirmation ? ' form-checkbox-row--error' : ''}`}>
              <input
                className="form-checkbox"
                id="terms_read_confirmation"
                name="terms_read_confirmation"
                type="checkbox"
                value={t.termsEmailConfirmation}
                required
                aria-invalid={Boolean(errors.terms_read_confirmation)}
                aria-describedby={errors.terms_read_confirmation ? 'terms_read_confirmation-error' : undefined}
              />
              <label htmlFor="terms_read_confirmation">
                {termsReadConfirmation} {t.termsNoAgreement} <span className="required" aria-hidden="true">*</span>
              </label>
            </div>
            <FieldError name="terms_read_confirmation" error={errors.terms_read_confirmation} />
            <input type="hidden" name="terms_documents" value={termsReference} />
          </div>
        ) : null}
        <p className="form-data-warning">{t.dataWarning}</p>
      </div>
    );
  }, [errors.terms_read_confirmation, locale, requestType, t]);

  return (
    <section className="contact-main" aria-labelledby="contact-form-heading">
      <div className="container contact-grid">
        <div className="form-card">
          <div className="form-card-header">
            <h2 id="contact-form-heading">{t.cardTitle}</h2>
            <p>{t.cardIntro}</p>
          </div>

          <form
            action={COMPANY.formspree}
            method="POST"
            id="contact-form"
            aria-labelledby="contact-form-heading"
            noValidate
            onSubmit={handleSubmit}
            onInput={(event) => clearFieldError((event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).name)}
          >
            <input type="hidden" name="subject" value={subjectFor(requestType, locale)} />
            <input type="hidden" name="form_version" value={CONTACT_FORM_VARIANT} />
            <input type="hidden" name="language" value={locale} />
            {includeAnalyticsContext ? (
              <>
                <input type="hidden" name="origin_page" value={originPage} />
                <input type="hidden" name="entry_page" value={entryPage} />
                <input type="hidden" name="cta_origin" value={ctaOrigin} />
                <input type="hidden" name="traffic_source" value={attribution.traffic_source} />
                <input type="hidden" name="traffic_medium" value={attribution.traffic_medium} />
                <input type="hidden" name="campaign_present" value={attribution.campaign_present} />
                <input type="hidden" name="referrer_type" value={attribution.referrer_type} />
              </>
            ) : null}
            {requestType === 'business' && businessSector ? <input type="hidden" name="business_sector" value={businessSector} /> : null}
            <div className="form-honeypot" aria-hidden="true">
              <label htmlFor={`contact-website-${locale}`}>Website</label>
              <input id={`contact-website-${locale}`} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
            </div>

            {Object.keys(errors).length ? (
              <div className="form-error-summary" role="alert" tabIndex={-1} ref={errorSummaryRef}>
                <strong>{t.validationHeading}</strong>
                <ul>
                  {Object.entries(errors).map(([name, message]) => {
                    const target = name === 'contact_method' ? 'email' : name;
                    return <li key={name}><a href={`#${target}`}>{labels[name] || name}: {message}</a></li>;
                  })}
                </ul>
              </div>
            ) : null}

            <fieldset
              className="form-section request-type-fieldset"
              aria-describedby={`request-type-hint request-type-announcement${errors.request_type ? ' request_type-error' : ''}`}
            >
              <legend>{t.typeLegend} <span className="required" aria-hidden="true">*</span></legend>
              <p className="form-field-hint" id="request-type-hint">{t.typeHint}</p>
              <div className="request-type-grid">
                {t.types.map((type) => (
                  <label className="request-type-card" key={type.value} data-selected={requestType === type.value}>
                    <input
                      type="radio"
                      name="request_type"
                      value={type.value}
                      checked={requestType === type.value}
                      required
                      onChange={() => {
                        const nextRequestType = type.value as Exclude<RequestType, ''>;
                        setRequestType(nextRequestType);
                        setService((current) => isServiceCompatible(nextRequestType, current) ? current : '');
                        setEmergencyClientType('');
                        setUrgentIssue('');
                        setErrors({});
                        setStatus({ kind: 'idle', message: '' });
                      }}
                    />
                    <span><strong>{type.title}</strong><small>{type.text}</small></span>
                  </label>
                ))}
              </div>
              <p className="visually-hidden" id="request-type-announcement" aria-live="polite">{selectionAnnouncement}</p>
              <FieldError name="request_type" error={errors.request_type} />
            </fieldset>

            {requestType === 'emergency' ? (
              <div className="form-emergency-call" role="note">
                <div>
                  <strong>{t.emergencyTitle}</strong>
                  <p>{t.emergencyText}</p>
                </div>
                <a className="btn btn-orange btn-large" href={`tel:${COMPANY.phone}`}><PhoneIcon />{t.emergencyCall}</a>
              </div>
            ) : null}

            {requestType ? (
              <>
                <fieldset className="form-section">
                  <legend>{t.contactLegend}</legend>
                  <div className="form-grid">
                    {requestType === 'business' ? (
                      <TextField name="company" label={t.company} required optionalLabel={t.optional} autoComplete="organization" error={errors.company} />
                    ) : null}
                    {requestType === 'maintenance' ? (
                      <TextField name="organization" label={t.organization} optionalLabel={t.optional} autoComplete="organization" error={errors.organization} />
                    ) : null}
                    <TextField name="name" label={t.name} required optionalLabel={t.optional} autoComplete="name" error={errors.name} />
                    {requestType === 'business' ? (
                      <TextField name="contact_role" label={t.contactRole} optionalLabel={t.optional} autoComplete="organization-title" error={errors.contact_role} />
                    ) : null}
                    <TextField
                      name="email"
                      label={t.email}
                      required={requestType !== 'emergency'}
                      optionalLabel={t.optional}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      maxLength={254}
                      error={errors.email || errors.contact_method}
                    />
                    <TextField
                      name="phone"
                      label={t.phone}
                      optionalLabel={t.optional}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={40}
                      error={errors.phone}
                    />
                    {requestType === 'business' ? (
                      <TextField name="kvk" label={t.kvk} optionalLabel={t.optional} inputMode="numeric" maxLength={40} error={errors.kvk} />
                    ) : null}
                  </div>
                  {requestType === 'emergency' ? <p className="form-field-hint form-grid-note">{t.contactEither}</p> : null}
                </fieldset>

                {requestType === 'private' ? (
                  <fieldset className="form-section">
                    <legend>{t.privateLegend}</legend>
                    <div className="form-grid">
                      <TextField name="project_location" label={t.location} optionalLabel={t.optional} autoComplete="address-level2" hint={t.locationHint} error={errors.project_location} />
                      <SelectField name="service" label={t.service} options={services} choose={t.choose} required optionalLabel={t.optional} value={service} onValueChange={setService} error={errors.service} />
                      <SelectField name="desired_period" label={t.desiredPeriod} options={periods} choose={t.choose} optionalLabel={t.optional} error={errors.desired_period} />
                    </div>
                  </fieldset>
                ) : null}

                {requestType === 'business' ? (
                  <fieldset className="form-section">
                    <legend>{t.businessLegend}</legend>
                    <p className="form-field-hint form-grid-note">{t.businessScopeNote}</p>
                    <div className="form-grid">
                      <TextField name="project_location" label={t.location} required optionalLabel={t.optional} autoComplete="address-level2" hint={t.locationHint} error={errors.project_location} />
                      <SelectField name="building_type" label={t.buildingType} options={buildingTypes} choose={t.choose} required optionalLabel={t.optional} error={errors.building_type} />
                      <SelectField name="service" label={t.service} options={services} choose={t.choose} required optionalLabel={t.optional} value={service} onValueChange={setService} error={errors.service} />
                      <SelectField name="project_phase" label={t.projectPhase} options={OPTIONS.phases[locale]} choose={t.choose} required optionalLabel={t.optional} error={errors.project_phase} />
                      <SelectField name="desired_period" label={t.desiredPeriod} options={periods} choose={t.choose} required optionalLabel={t.optional} error={errors.desired_period} />
                      <SelectField name="documents_available" label={t.documents} options={OPTIONS.documents[locale]} choose={t.choose} required optionalLabel={t.optional} hint={t.documentsHint} error={errors.documents_available} />
                      <SelectField name="collaboration_type" label={t.collaboration} options={OPTIONS.collaboration[locale]} choose={t.choose} required optionalLabel={t.optional} error={errors.collaboration_type} />
                      <div className="form-row full">
                        <label className="form-label" htmlFor="planning_notes">{t.planning} <span className="optional">{t.optional}</span></label>
                        <textarea className="form-textarea form-textarea-short" id="planning_notes" name="planning_notes" maxLength={1200} aria-invalid={Boolean(errors.planning_notes)} aria-describedby={errors.planning_notes ? 'planning_notes-error' : undefined} />
                        <FieldError name="planning_notes" error={errors.planning_notes} />
                      </div>
                    </div>
                  </fieldset>
                ) : null}

                {requestType === 'maintenance' ? (
                  <fieldset className="form-section">
                    <legend>{t.maintenanceLegend}</legend>
                    <p className="form-field-hint form-grid-note">{t.maintenanceAreaNote}</p>
                    <div className="form-grid">
                      <SelectField name="maintenance_role" label={t.maintenanceRole} options={OPTIONS.maintenanceRoles[locale]} choose={t.choose} required optionalLabel={t.optional} error={errors.maintenance_role} />
                      <TextField name="project_location" label={t.location} required optionalLabel={t.optional} autoComplete="address-level2" hint={t.locationHint} error={errors.project_location} />
                      <SelectField name="building_type" label={t.buildingType} options={buildingTypes} choose={t.choose} required optionalLabel={t.optional} error={errors.building_type} />
                      <SelectField name="location_count" label={t.locationCount} options={OPTIONS.locationCounts[locale]} choose={t.choose} required optionalLabel={t.optional} error={errors.location_count} />
                      <SelectField name="service" label={t.service} options={services} choose={t.choose} required optionalLabel={t.optional} value={service} onValueChange={setService} error={errors.service} />
                      <SelectField name="urgency" label={t.urgency} options={OPTIONS.urgency[locale]} choose={t.choose} required optionalLabel={t.optional} error={errors.urgency} />
                      <SelectField name="access" label={t.access} options={OPTIONS.access[locale]} choose={t.choose} required optionalLabel={t.optional} hint={t.accessHint} error={errors.access} />
                      <SelectField name="maintenance_model" label={t.maintenanceModel} options={OPTIONS.maintenanceModels[locale]} choose={t.choose} required optionalLabel={t.optional} error={errors.maintenance_model} />
                      <SelectField name="desired_period" label={t.desiredPeriod} options={periods} choose={t.choose} optionalLabel={t.optional} error={errors.desired_period} />
                    </div>
                  </fieldset>
                ) : null}

                {requestType === 'emergency' ? (
                  <fieldset className="form-section">
                    <legend>{t.emergencyLegend}</legend>
                    <p className="form-field-hint form-grid-note">{t.emergencyAreaNote}</p>
                    <div className="form-grid">
                      <SelectField
                        name="emergency_client_type"
                        label={t.emergencyClientType}
                        options={OPTIONS.emergencyClientTypes[locale]}
                        choose={t.choose}
                        required
                        optionalLabel={t.optional}
                        hint={t.emergencyClientHint}
                        value={emergencyClientType}
                        onValueChange={(value) => {
                          setEmergencyClientType(value);
                          setUrgentIssue((current) => value === 'business-existing' && !BUSINESS_URGENT_ISSUE_VALUES.has(current) ? '' : current);
                          clearFieldError('emergency_client_type');
                          clearFieldError('urgent_issue');
                        }}
                        error={errors.emergency_client_type}
                      />
                      <SelectField
                        name="urgent_issue"
                        label={t.urgentIssue}
                        options={urgentIssues}
                        choose={t.choose}
                        required
                        optionalLabel={t.optional}
                        value={urgentIssue}
                        onValueChange={(value) => {
                          setUrgentIssue(value);
                          clearFieldError('urgent_issue');
                        }}
                        error={errors.urgent_issue}
                      />
                      <TextField name="project_location" label={t.location} optionalLabel={t.optional} autoComplete="address-level2" hint={t.locationHint} error={errors.project_location} />
                    </div>
                  </fieldset>
                ) : null}

                <fieldset className="form-section">
                  <legend>{t.projectLegend}</legend>
                  <div className="form-row">
                    <label className="form-label" htmlFor="message">{t.message} <span className="required" aria-hidden="true">*</span></label>
                    <textarea
                      className="form-textarea"
                      id="message"
                      name="message"
                      required
                      maxLength={3000}
                      placeholder={requestType === 'private' ? t.messagePrivate : requestType === 'business' ? t.messageBusiness : requestType === 'maintenance' ? t.messageMaintenance : t.messageEmergency}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    <FieldError name="message" error={errors.message} />
                  </div>
                </fieldset>

                {termsBlock}

                <div className="form-submit">
                  <small><span className="required" aria-hidden="true">*</span> {t.required}</small>
                  <button type="submit" className="btn btn-primary btn-large" disabled={status.kind === 'submitting'}>
                    {status.kind === 'submitting' ? t.submitting : requestType === 'emergency' ? t.submitEmergency : t.submit}
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </>
            ) : null}

            <div
              className={`form-status form-status--${status.kind}`}
              role={status.kind === 'error' ? 'alert' : 'status'}
              aria-live={status.kind === 'error' ? 'assertive' : 'polite'}
              tabIndex={status.kind === 'success' || status.kind === 'error' ? -1 : undefined}
              ref={statusRef}
            >
              {status.message}
            </div>
          </form>
        </div>

        <aside className="contact-info" aria-label={t.directTitle}>
          <h3>{t.directTitle}</h3>
          <p className="contact-info-intro">{t.directIntro}</p>

          <a href={`tel:${COMPANY.phone}`} className="contact-card">
            <span className="contact-card-icon"><PhoneIcon size={22} /></span>
            <span className="contact-card-body">
              <span className="contact-card-label">{t.phoneLabel}</span>
              <span className="contact-card-value">{COMPANY.phoneDisplay}</span>
              <span className="contact-card-hint">{t.phoneHint}</span>
            </span>
          </a>

          <a href={`mailto:${COMPANY.emailRequest}`} className="contact-card">
            <span className="contact-card-icon"><MailIcon /></span>
            <span className="contact-card-body">
              <span className="contact-card-label">{t.quoteEmailLabel}</span>
              <span className="contact-card-value">{COMPANY.emailRequest}</span>
              <span className="contact-card-hint">{t.quoteEmailHint}</span>
            </span>
          </a>

          <a href={`mailto:${COMPANY.email}`} className="contact-card">
            <span className="contact-card-icon"><MailIcon /></span>
            <span className="contact-card-body">
              <span className="contact-card-label">{t.generalEmailLabel}</span>
              <span className="contact-card-value">{COMPANY.email}</span>
              <span className="contact-card-hint">{t.generalEmailHint}</span>
            </span>
          </a>

          <a href={`https://wa.me/${COMPANY.whatsapp}`} className="contact-card" target="_blank" rel="noopener noreferrer">
            <span className="contact-card-icon"><WhatsAppIcon size={22} /></span>
            <span className="contact-card-body">
              <span className="contact-card-label">{t.whatsappLabel}</span>
              <span className="contact-card-value">{COMPANY.phoneDisplay}</span>
              <span className="contact-card-hint">{t.whatsappHint}</span>
            </span>
          </a>

          <div className="contact-card">
            <span className="contact-card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <span className="contact-card-body">
              <span className="contact-card-label">{t.addressLabel}</span>
              <span className="contact-card-value">{COMPANY.address.street}<br />{COMPANY.address.postalCode} {COMPANY.address.city}</span>
              <span className="contact-card-hint">{t.addressHint}</span>
            </span>
          </div>

          <div className="emergency-notice">
            <span className="emergency-notice-badge">{t.sideEmergencyLabel}</span>
            <p>{t.sideEmergencyText}</p>
            <a href={`tel:${COMPANY.phone}`} className="btn btn-orange"><PhoneIcon />{t.sideEmergencyCall}</a>
          </div>
        </aside>
      </div>
    </section>
  );
}

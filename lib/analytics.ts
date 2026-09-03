'use client';

import { COMPANY, type AudienceScope, type Locale } from './site';

export const ANALYTICS_CONSENT_STORAGE_KEY = 'azgs-consent-v1';
export const ANALYTICS_ATTRIBUTION_SESSION_KEY = 'azgs-attribution-v1';
export const ANALYTICS_CONSENT_EVENT = 'azgs:analytics-consent';

export type AnalyticsConsentStatus = 'accepted' | 'rejected' | null;
export type RequestType = 'private' | 'business' | 'maintenance' | 'emergency';
export type ServiceContext =
  | 'plumbing'
  | 'heating'
  | 'underfloor-heating'
  | 'ventilation-climate'
  | 'electrical'
  | 'drywall'
  | 'painting'
  | 'tiling'
  | 'parquet'
  | 'multiple'
  | 'other'
  | 'emergency'
  | 'none';

export type SafeAttribution = {
  traffic_source: 'direct' | 'google' | 'bing' | 'duckduckgo' | 'facebook' | 'instagram' | 'linkedin' | 'whatsapp' | 'email' | 'referral' | 'internal' | 'other';
  traffic_medium: 'direct' | 'organic' | 'cpc' | 'paid_social' | 'social' | 'email' | 'referral' | 'internal' | 'other';
  campaign_present: 'yes' | 'no';
  referrer_type: 'direct' | 'same_site' | 'search' | 'social' | 'referral';
};

export type AnalyticsEventName =
  | 'audience_select'
  | 'request_type_select'
  | 'contact_form_start'
  | 'contact_form_abandon'
  | 'generate_lead'
  | 'phone_click'
  | 'whatsapp_click'
  | 'email_click'
  | 'legal_document_download'
  | 'b2b_document_download';

type AnalyticsEventParameters = Partial<{
  audience_type: Exclude<AudienceScope, 'general'>;
  audience_context: AudienceScope;
  request_type: RequestType;
  service_context: ServiceContext;
  destination_path: string;
  origin_page: string;
  contact_location: 'header' | 'footer' | 'floating' | 'contact_sidebar' | 'emergency_form' | 'hero' | 'content';
  email_kind: 'general' | 'requests' | 'other';
  document_type: 'terms' | 'capabilities' | 'other';
  document_audience: 'b2c' | 'b2b';
  document_language: Locale;
  document_version: string;
  form_variant: 'adaptive-contact-v3';
  transport_type: 'beacon';
}>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    azgsConsent?: {
      accept: () => void;
      reject: () => void;
      reset: () => void;
      status: () => AnalyticsConsentStatus;
    };
  }
}

const SOURCE_ALIASES: Record<string, SafeAttribution['traffic_source']> = {
  google: 'google',
  bing: 'bing',
  duckduckgo: 'duckduckgo',
  facebook: 'facebook',
  fb: 'facebook',
  instagram: 'instagram',
  ig: 'instagram',
  linkedin: 'linkedin',
  whatsapp: 'whatsapp',
  newsletter: 'email',
  email: 'email',
};

const MEDIUM_ALIASES: Record<string, SafeAttribution['traffic_medium']> = {
  organic: 'organic',
  cpc: 'cpc',
  ppc: 'cpc',
  paid_search: 'cpc',
  paid_social: 'paid_social',
  social: 'social',
  email: 'email',
  newsletter: 'email',
  referral: 'referral',
};

const SERVICE_ALIASES: Record<string, ServiceContext> = {
  sanitair: 'plumbing',
  plumbing: 'plumbing',
  verwarming: 'heating',
  heating: 'heating',
  vloerverwarming: 'underfloor-heating',
  underfloor: 'underfloor-heating',
  'underfloor-heating': 'underfloor-heating',
  'ventilatie-warmtepompen': 'ventilation-climate',
  'ventilation-heat-pumps': 'ventilation-climate',
  'ventilation-climate': 'ventilation-climate',
  climate: 'ventilation-climate',
  elektra: 'electrical',
  electrical: 'electrical',
  gipsplaten: 'drywall',
  drywall: 'drywall',
  schilderwerk: 'painting',
  schilderherstel: 'painting',
  painting: 'painting',
  'painting-repair': 'painting',
  tegelwerk: 'tiling',
  tegelherstel: 'tiling',
  tiling: 'tiling',
  'tile-repair': 'tiling',
  parket: 'parquet',
  parquet: 'parquet',
  multiple: 'multiple',
  other: 'other',
  overig: 'other',
};

const EVENT_PARAMETER_KEYS: Record<AnalyticsEventName, ReadonlySet<keyof AnalyticsEventParameters>> = {
  audience_select: new Set(['audience_type', 'destination_path']),
  request_type_select: new Set(['request_type', 'service_context']),
  contact_form_start: new Set(['request_type', 'service_context', 'form_variant']),
  contact_form_abandon: new Set(['request_type', 'service_context', 'form_variant', 'transport_type']),
  generate_lead: new Set(['request_type', 'service_context', 'form_variant']),
  phone_click: new Set(['contact_location']),
  whatsapp_click: new Set(['contact_location']),
  email_click: new Set(['contact_location', 'email_kind']),
  legal_document_download: new Set(['document_type', 'document_audience', 'document_language', 'document_version']),
  b2b_document_download: new Set(['document_type', 'document_audience', 'document_language', 'document_version']),
};

function safeStorageGet(storage: Storage, key: string) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(storage: Storage, key: string, value: string) {
  try {
    storage.setItem(key, value);
  } catch {
    // Measurement must never block navigation or form use.
  }
}

export function getAnalyticsConsent(): AnalyticsConsentStatus {
  if (typeof window === 'undefined') return null;
  const value = safeStorageGet(window.localStorage, ANALYTICS_CONSENT_STORAGE_KEY);
  return value === 'accepted' || value === 'rejected' ? value : null;
}

export function isLocalAnalyticsPreview() {
  if (typeof window === 'undefined') return false;
  return window.location.protocol === 'file:' || ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
}

function classifyKnownHost(hostname: string): SafeAttribution['traffic_source'] | null {
  const host = hostname.toLowerCase().replace(/^www\./, '');
  if (host === 'google.com' || host.endsWith('.google.com') || /^google\.[a-z.]+$/.test(host)) return 'google';
  if (host === 'bing.com' || host.endsWith('.bing.com')) return 'bing';
  if (host === 'duckduckgo.com' || host.endsWith('.duckduckgo.com')) return 'duckduckgo';
  if (host === 'facebook.com' || host.endsWith('.facebook.com')) return 'facebook';
  if (host === 'instagram.com' || host.endsWith('.instagram.com')) return 'instagram';
  if (host === 'linkedin.com' || host.endsWith('.linkedin.com')) return 'linkedin';
  if (host === 'wa.me' || host === 'whatsapp.com' || host.endsWith('.whatsapp.com')) return 'whatsapp';
  return null;
}

function sourceMediumFromKnownSource(source: SafeAttribution['traffic_source']): SafeAttribution['traffic_medium'] {
  if (source === 'google' || source === 'bing' || source === 'duckduckgo') return 'organic';
  if (source === 'facebook' || source === 'instagram' || source === 'linkedin' || source === 'whatsapp') return 'social';
  if (source === 'email') return 'email';
  if (source === 'internal') return 'internal';
  if (source === 'direct') return 'direct';
  if (source === 'other') return 'other';
  return 'referral';
}

export function buildSafeAttribution(): SafeAttribution {
  if (typeof window === 'undefined') {
    return { traffic_source: 'direct', traffic_medium: 'direct', campaign_present: 'no', referrer_type: 'direct' };
  }

  const params = new URLSearchParams(window.location.search);
  const rawSource = (params.get('utm_source') || '').trim().toLowerCase();
  const rawMedium = (params.get('utm_medium') || '').trim().toLowerCase();
  const hasUtm = params.has('utm_source') || params.has('utm_medium') || params.has('utm_campaign');
  const campaignPresent: SafeAttribution['campaign_present'] = params.has('utm_campaign') ? 'yes' : 'no';

  let referrerType: SafeAttribution['referrer_type'] = 'direct';
  let referrerSource: SafeAttribution['traffic_source'] = 'direct';
  if (document.referrer) {
    try {
      const referrer = new URL(document.referrer);
      if (referrer.origin === window.location.origin) {
        referrerType = 'same_site';
        referrerSource = 'internal';
      } else {
        const known = classifyKnownHost(referrer.hostname);
        if (known === 'google' || known === 'bing' || known === 'duckduckgo') referrerType = 'search';
        else if (known) referrerType = 'social';
        else referrerType = 'referral';
        referrerSource = known || 'referral';
      }
    } catch {
      referrerType = 'referral';
      referrerSource = 'referral';
    }
  }

  if (!hasUtm) {
    return {
      traffic_source: referrerSource,
      traffic_medium: sourceMediumFromKnownSource(referrerSource),
      campaign_present: 'no',
      referrer_type: referrerType,
    };
  }

  const source = SOURCE_ALIASES[rawSource] || 'other';
  const medium = MEDIUM_ALIASES[rawMedium] || (rawMedium ? 'other' : sourceMediumFromKnownSource(source));
  return { traffic_source: source, traffic_medium: medium, campaign_present: campaignPresent, referrer_type: referrerType };
}

function isSafeAttribution(value: unknown): value is SafeAttribution {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<SafeAttribution>;
  const sources = new Set<SafeAttribution['traffic_source']>(['direct', 'google', 'bing', 'duckduckgo', 'facebook', 'instagram', 'linkedin', 'whatsapp', 'email', 'referral', 'internal', 'other']);
  const media = new Set<SafeAttribution['traffic_medium']>(['direct', 'organic', 'cpc', 'paid_social', 'social', 'email', 'referral', 'internal', 'other']);
  const referrers = new Set<SafeAttribution['referrer_type']>(['direct', 'same_site', 'search', 'social', 'referral']);
  return Boolean(
    candidate.traffic_source && sources.has(candidate.traffic_source) &&
    candidate.traffic_medium && media.has(candidate.traffic_medium) &&
    (candidate.campaign_present === 'yes' || candidate.campaign_present === 'no') &&
    candidate.referrer_type && referrers.has(candidate.referrer_type),
  );
}

export function getSafeAttribution(persistWhenConsented = true): SafeAttribution {
  const current = buildSafeAttribution();
  if (typeof window === 'undefined' || !persistWhenConsented || getAnalyticsConsent() !== 'accepted') return current;

  const stored = safeStorageGet(window.sessionStorage, ANALYTICS_ATTRIBUTION_SESSION_KEY);
  if (stored) {
    try {
      const parsed: unknown = JSON.parse(stored);
      if (isSafeAttribution(parsed)) return parsed;
    } catch {
      // Replace invalid storage with the current safe classification.
    }
  }
  safeStorageSet(window.sessionStorage, ANALYTICS_ATTRIBUTION_SESSION_KEY, JSON.stringify(current));
  return current;
}

export function clearAnalyticsAttribution() {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(ANALYTICS_ATTRIBUTION_SESSION_KEY);
  } catch {
    // Storage access can be unavailable in privacy-restricted browsers.
  }
}

export function safePagePath(value?: string) {
  if (typeof window === 'undefined' && !value) return '/';
  let pathname = value || window.location.pathname;
  try {
    pathname = new URL(pathname, typeof window === 'undefined' ? 'https://azgs.nl' : window.location.origin).pathname;
  } catch {
    return '/';
  }

  const safeSegments = pathname.split('/').map((segment) => {
    if (!segment) return '';
    const decoded = (() => {
      try { return decodeURIComponent(segment); } catch { return segment; }
    })();
    if (decoded.length > 64 || decoded.includes('@') || /\d{7,}/.test(decoded) || !/^[a-z0-9-]+$/i.test(decoded)) return 'redacted';
    return decoded.toLowerCase();
  });
  return safeSegments.join('/') || '/';
}

export function safePageLocation() {
  if (typeof window === 'undefined') return 'https://azgs.nl/';
  return `${window.location.origin}${safePagePath()}`;
}

export function safePageReferrer() {
  if (typeof window === 'undefined' || !document.referrer) return '';
  try {
    const referrer = new URL(document.referrer);
    if (referrer.origin === window.location.origin) return `${referrer.origin}${safePagePath(referrer.pathname)}`;
    return classifyKnownHost(referrer.hostname) ? `${referrer.protocol}//${referrer.hostname}/` : '';
  } catch {
    return '';
  }
}

export function detectAudienceContext(pathname = safePagePath()): AudienceScope {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.some((segment) => segment === 'particulier' || segment === 'private')) return 'private';
  if (segments.some((segment) => segment === 'zakelijk' || segment === 'business' || segment === 'business-terms-and-conditions' || segment === 'algemene-voorwaarden-zakelijk')) return 'business';
  if (segments.some((segment) => segment === 'onderhoud' || segment === 'maintenance')) return 'maintenance';
  return 'general';
}

export function detectServiceContext(): ServiceContext {
  if (typeof window === 'undefined') return 'none';
  const params = new URLSearchParams(window.location.search);
  const queryService = (params.get('service') || params.get('dienst') || '').toLowerCase();
  if (SERVICE_ALIASES[queryService]) return SERVICE_ALIASES[queryService];
  const segments = safePagePath().split('/').filter(Boolean);
  for (let index = segments.length - 1; index >= 0; index -= 1) {
    if (SERVICE_ALIASES[segments[index]]) return SERVICE_ALIASES[segments[index]];
  }
  if (segments.includes('spoed') || segments.includes('emergency')) return 'emergency';
  return 'none';
}

function sanitizeEventParameters(eventName: AnalyticsEventName, parameters: AnalyticsEventParameters) {
  const allowed = EVENT_PARAMETER_KEYS[eventName];
  const output: Record<string, string> = {};
  for (const [key, value] of Object.entries(parameters)) {
    if (!allowed.has(key as keyof AnalyticsEventParameters) || typeof value !== 'string' || !value) continue;
    if (key === 'destination_path' || key === 'origin_page') {
      output[key] = safePagePath(value);
      continue;
    }
    if (key === 'document_version') {
      if (/^[0-9.]{1,10}$/.test(value)) output[key] = value;
      continue;
    }
    if (/^[a-z0-9_-]{1,48}$/i.test(value)) output[key] = value;
  }
  return output;
}

export function trackAnalyticsEvent(eventName: AnalyticsEventName, parameters: AnalyticsEventParameters = {}) {
  if (typeof window === 'undefined' || getAnalyticsConsent() !== 'accepted' || typeof window.gtag !== 'function') return false;
  const attribution = getSafeAttribution(true);
  const locale: Locale = safePagePath().startsWith('/en') ? 'en' : 'nl';
  const context = {
    language: locale,
    origin_page: safePagePath(),
    audience_context: parameters.audience_context || detectAudienceContext(),
    service_context: parameters.service_context || detectServiceContext(),
    ...attribution,
  };
  const payload = {
    ...context,
    ...sanitizeEventParameters(eventName, parameters),
    send_to: COMPANY.ga4,
  };
  window.gtag('event', eventName, payload);
  if (isLocalAnalyticsPreview()) {
    const attribute = 'data-azgs-analytics-debug';
    let history: Array<{ event: AnalyticsEventName; parameters: Record<string, string> }> = [];
    try {
      history = JSON.parse(document.documentElement.getAttribute(attribute) || '[]');
      if (!Array.isArray(history)) history = [];
    } catch {
      history = [];
    }
    history.push({ event: eventName, parameters: payload });
    document.documentElement.setAttribute(attribute, JSON.stringify(history.slice(-20)));
  }
  return true;
}

export function announceAnalyticsConsent(status: AnalyticsConsentStatus) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: { status } }));
}

export function setAnalyticsCollectionDisabled(disabled: boolean) {
  if (typeof window === 'undefined') return;
  (window as unknown as Record<string, unknown>)[`ga-disable-${COMPANY.ga4}`] = disabled;
}

export function deleteAnalyticsCookies() {
  if (typeof document === 'undefined') return;
  const domainCandidates = new Set<string>(['', window.location.hostname, `.${window.location.hostname}`]);
  const rootDomain = window.location.hostname.split('.').slice(-2).join('.');
  if (rootDomain.includes('.')) {
    domainCandidates.add(rootDomain);
    domainCandidates.add(`.${rootDomain}`);
  }

  document.cookie.split(';').forEach((entry) => {
    const name = entry.split('=')[0]?.trim();
    if (!name || (name !== '_ga' && !name.startsWith('_ga_'))) return;
    domainCandidates.forEach((domain) => {
      const domainPart = domain ? `; domain=${domain}` : '';
      document.cookie = `${name}=; Max-Age=0; path=/${domainPart}; SameSite=Lax`;
    });
  });
}
